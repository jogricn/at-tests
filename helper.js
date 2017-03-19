var fs = require('fs');

casper.at = {};

casper.at.VIEWPORT = {width: 2000, height: 2500};
casper.at.VIEWPORT_EXTENDED = {top: 0, left: 0, width: casper.at.VIEWPORT.width, height: casper.at.VIEWPORT.height};

casper.at.ENV_LIVE_URL = "http://www.arzttermine.de";
casper.at.ENV_STAGING_URL = "http://www.test.arzttermine.de";
casper.at.ENV_LOCAL_URL = "http://www.arzttermine.dev";

casper.options.waitTimeout = 20000;
casper.options.logLevel = "error";


casper.test.on("fail", function(failure){
  var ts = casper.cli.get("timestamp");
  var filename = "reports/" + ts + "/failed-" + failure.file + "-" + ts;

  fs.write(filename + ".json", JSON.stringify(failure, null, 2), 'w');
  casper.capture(filename + ".png", casper.at.VIEWPORT_EXTENDED);
});


casper.test.on("success", function(failure){
  var ts = casper.cli.get("timestamp");
  var filename = "reports/" + ts + "/passed-" + failure.file + "-" + ts;
  
  fs.write(filename + ".json", JSON.stringify(failure, null, 2), 'w');
  casper.capture(filename + ".png", casper.at.VIEWPORT_EXTENDED);
});
