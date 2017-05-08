var async = require("async");
var fs = require('fs');
var nodemailer = require("nodemailer");
var transport = nodemailer.createTransport("direct");
//var sys = require('util');
var spawn = require('child_process').spawn;
var parseArgs = require('minimist');

// NOTE: the entry point is at the end of the file.

// PARSING INPUT ARGUMENTS
var argv = parseArgs(process.argv.slice(2));

var recepients = [];
// Report recepients are defined as environment config variables. 
// The format is: "nebojsajogric+attesting@gmail.com|th+testing@arzttermine.de";
if (argv.recepients === 'all') {
  recepients = process.env.REPORT_RECEPIENTS_ALL.split('|');
} else if (argv.recepients === 'dev') {
  recepients = process.env.REPORT_RECEPIENTS_DEV.split('|');
} else if (argv.recepients === 'njogric') {
  recepients = 'nebojsajogric+attesting@gmail.com';
} else if (argv.recepients === 'none') {
  recepients = [];
} 

var testPath = argv.test;

var env = argv.env;
// END - PARSING INPUT ARGUMENTS


// VARS
// tests is an array that contains paths to the tests that will be executed.
// If it's set as a command line param, use it. Otherwise, get the default.
if (testPath) {
  var tests = [testPath];
} else {
  var SMOKE_TESTS_PATH = 'tests/smoke_tests/';
  var REGRESION_TESTS_PATH = 'tests/RegressionTests/';
  // We can do better, e.g. crawling of a specific directory, but this is ok for now.
  var tests = [
    SMOKE_TESTS_PATH + 'homepage.js',
    // SMOKE_TESTS_PATH + 'marketing.js',
    SMOKE_TESTS_PATH + 'filterlinks.js',
    SMOKE_TESTS_PATH + 'searchpager.js',
    // SMOKE_TESTS_PATH + 'telefondienst.js',
    
    REGRESION_TESTS_PATH + 'doctor/DoctorTests.js',
    REGRESION_TESTS_PATH + 'doctor/RegistrationDoctorTests.js',
    // REGRESION_TESTS_PATH + 'patient/UserTests.js',
    REGRESION_TESTS_PATH + 'patient/UserAppointmentsTests.js',
    // REGRESION_TESTS_PATH + 'patient/RegisterUserTest.js',
    REGRESION_TESTS_PATH + 'polyclinic/ClinicsTests.js',
    REGRESION_TESTS_PATH + 'social_networks/SocialNetworksTests.js',
    REGRESION_TESTS_PATH + 'widget/WidgetsTest.js'
  ];
}

var timestamp = new Date().getTime();

var isDev = argv.recepients === 'dev' || argv.recepients === 'njogric';
var sendIfAllPass = argv['force-send'] || isDev;

env = env || 'local';
if (env === 'staging') {
  var baseUrl = "https://www.test.arzttermine.de";
} else if (env === 'live') {
  var baseUrl = "http://www.arzttermine.de";
} else if (env === 'local') {
  var baseUrl = "http://www.arzttermine.dev";
}
// END - VARS

// Runs a CasperJS command in a shell. Can't be called directly because CasperJS works on Phantom, not Node. 
// This is the fastest way how to code this, albeit not most elegant.
var doTest = function(filename, callback) {
  var params = [
    'test', 
    filename, 
    '--ignore-ssl-errors=yes',
    '--verbose --log-level=debug', 
    '--timestamp=' + timestamp,
    '--baseurl=' + baseUrl
  ];

  if (argv.user) {
    params.push('--user=' + argv.user);
  }
  if (argv.pass) {
    params.push('--pass=' + argv.pass);
  }

  var testProcess = spawn('casperjs', params);
  testProcess.stdout.on('data', function (data) {
    console.log('' + data);
  });

  testProcess.stderr.on('data', function (data) {
    // Filtering out the noise from the output.
    // @todo: try updating Casper, Phantom or Node again.
    if ((''+data.stderr).indexOf('CoreText performance note' != -1)) {
      return;
    }
    if ((''+data.stderr).indexOf('Method userSpaceScaleFactor' != -1)) {
      return;
    }
    console.log('[ERROR!]: ' + data);
  });

  testProcess.on('close', function (code) {
    console.log('child process exited with code ' + code);
    callback();
  });
}


// Prepares and sends emails with attached reports that are already generated by the executed CasperJS scripts.
// It assumes that those reports already exist on the file system. If they don't, then there's 
// another failure.
var report = function(filename, isFail, callback) { 
  var ts = timestamp;
  var path = "reports/" + ts;
  var failPath = path + "/failed-tests";
  
  var atts = [];
  var subject = "Test report [" + timestamp + "]";
  var text = "reporting...";

  console.log("Preparing emails. Crawling the reports directory...");

  // if a dev runs the tests or sending is forced, send all reports
  // otherwise, report just in case of a failure
  if (sendIfAllPass) {
    walk(path, function(err, results){
      atts = results.map(function(file) {
        // If there are reports in the failed-tests folder, change the subject line!
        if (file.indexOf('failed-tests') != -1) {
          subject = "Test failure(s)!";
        }
        return {fileName: file, filePath: file};
      });
      sendMail(subject, atts, text);
    });
  } else {
    walk(failPath, function(err, results){
      if (!results) {
        console.log("No fails, no report.");
      } else {
        subject = "Test failure(s)!";
        atts = results.map(function(file) {
          return {fileName: file, filePath: file};
        });
        sendMail(subject, atts, text);
      }
    });
  }
}


// Sends email
var sendMail = function(subject, atts, text) {
  transport.sendMail({
      from: "Testing <testing@arzttermine.com>",
      to: recepients,
      subject: subject, 
      attachments: atts,
      text: text
    }, 
    // sendMail callback
    function(error, response){
      if(error){
        console.log("Email not sent. " + error);
        // callback(error);
      }
      else{
        console.log("Email sent to " + recepients + ".");
        // callback(filename);
      }
    }
  );
}


// Serially and recursively retrieves all files from the directory.
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};


// =====================================================================================================================
// THE ENTRY POINT
// Executes each CasperJS test in parallel and sends report at the end.
async.each(
  tests, 
  function(filename, callback){
    doTest(filename, callback);
  }, 
  function(err){
    // When all tests finish, generate a report.
    // report();

    if (err) {
      console.error("FAILURE: " + err);
    }
    else {
      console.log("Testing finished.")
    }
  });
// END - THE ENTRY POINT
// =====================================================================================================================
