require("./../../../helper.js");
require('./../../helper_methods/patient');

var facebook_loaded = false;

// var FACEBOOK_RESOURCES = "http://www.facebook.com/plugins/like.php?locale=de_DE&href=http%3A%2F%2Fwww.arzttermine.de&width=130&layout=button_count&action=recommend&show_faces=false&share=false&height=21&colorscheme=light";
// var TWITTER_RESOURCES = "http://platform.twitter.com/widgets/tweet_button.html?url=http%3A%2F%2Fwww.arzttermine.de&counturl=http%3A%2F%2Fwww.arzttermine.de&text=Kostenfrei%20Arzttermine%20und%20Zahnarzttermine%20buchen%20%7C%20%20Arzttermine.de&count=horizontal&lang=en&dnt=true";
// var GPLUS_RESOURCES = "https://accounts.google.com/o/oauth2/postmessageRelay?parent=http%3A%2F%2Fwww.arzttermine.de";

var FACEBOOK_RESOURCES = "www.facebook.com";
var TWITTER_RESOURCES = "twitter.com";
var GPLUS_RESOURCES = "accounts.google.com";


casper.on('resource.received', function(resource) {
    var resourceURL = resource.url;
    
    if (resourceURL.indexOf(FACEBOOK_RESOURCES) > -1) {
      //var contains = (resourceURL.indexOf('www.facebook.com') > -1); //true 
      casper.echo(' -- <<<< FACEEBOOK resources are loaded!!!!!!!!!!!!!!!');
      //casper.test.assert(true, '<<<--- Facebook resource is loaded!');
      // for (var i = 0; i < resource.headers.length; i++) {
      //    this.echo(resource.headers[i].name + ': ' + resource.headers[i].value);
      // }  
    } else if (resourceURL.indexOf(TWITTER_RESOURCES) > -1) {
      casper.echo(' -- <<<< Twitter resources are loaded!!!!!!!!!!!!!!!!!!!!!!!!!');
    } else if (resourceURL.indexOf(GPLUS_RESOURCES) > -1) {
      casper.echo(' -- <<<< GPlus resources are loaded!!!!!!!!!!!!!!!!!!!!!!');
    }
});

// casper.on('resource.requested', function(resource) {
//   var resourceURL = resource.url;

//   if (resourceURL.indexOf('www.facebook.com') > -1) {
//         casper.echo('FACEEBOOOOOK jEEEEE TUUUUUU!!!!!!!!!!!!!!!!');
//   };

// })

/*
*
* Activate facebook share link test
*
*/
casper.test.begin("Facebook default functionality test", function suite(test){

  casper.start().viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height).thenOpen("http://arzttermine.de", function(){
    casper.checkFacebookShereEoements();
  });

  casper.then(function() {

    if (this.resourceExists('like.php')) {
      test.assert(false, 'Facebook like.php file exists, but it should not.')
    } else {
      test.assert(true, 'Initial Facebook like.php file does not exist.')
    }

    casper.click('.facebook > a:nth-child(2)');
    casper.wait(2000);
  
    test.assertVisible('.fb_like > iframe:nth-child(1)', 'Facebok activ share button is visible!');

    // casper.capture('facebooktest.png');
    casper.wait(2000, function() {
      if (this.resourceExists('like.php')) {
        test.assert(true, 'Facebook like.php resource file is loaded!!!')
      } else {
        test.assert(false, 'Facebook like.php resource file is NOT loaded, but should be.')
      }
    })   

    test.assertVisible('#socialshareprivacy > ul > li.facebook.help_info.clearfix.info_off > a', 'Switch off button is visible.'); 
  })

  casper.run(function() {
    test.done();
  });
});

/*
*
* Activate twitter share link test
*
*/
casper.test.begin("Twitter default functionality test", function suite(test){

  casper.start().viewport(1200, 1000).thenOpen("http://arzttermine.de", function(){
    casper.checkTwitterShereEoements();
  });

  casper.then(function() {  

    if (this.resourceExists('tweet_button.html')) {
      test.assert(false, 'Twitter button exists, but it should not.')
    } else {
      test.assert(true, 'Initial Twitter button file does not exist.')
    }
    
    casper.click('.twitter > a:nth-child(2)');

    casper.wait(2000);

    casper.wait(2000, function() {
      if (this.resourceExists('tweet_button.html')) {
        test.assert(true, 'Twitter button resources file is loaded!!!')
      } else {
        test.assert(false, 'Twitter button resources file is NOT loaded, but should be.')
      }
    })   

    test.assertVisible('.twitter.help_info.clearfix.info_off > div > iframe', 'Twitter activ share button is visible!');
  })
  
  casper.run(function() {
    test.done();
  });
});


/*
*
* Activate Gplus share link test
*
*/
casper.test.begin("GPlus default functionality test", function suite(test){

  casper.start().viewport(1200, 1000).thenOpen("http://arzttermine.de", function(){
    casper.checkGplusShereEoements();
  });

  casper.then(function() {
    casper.click('.gplus > a:nth-child(2)');
    casper.wait(5000);
    casper.capture('gplustactiv.png');
    //test.assertVisible('iframe', 'GPlus activ share button is visible!');
    //test.assertExists('html body.home footer div.row div#socialshareprivacy ul.social_share_privacy_area li.gplus div.gplusone div > iframe', 'GPlus activ share button exists in source!');
  })
  
  casper.run(function() {
    test.done();
  });
});