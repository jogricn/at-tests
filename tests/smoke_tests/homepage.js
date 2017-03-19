require("./../../helper.js");
require('./../helper_methods/patient');
require("./../helper_methods/HomePageElementsSelectors.js");

var HEADER_TEL_LINK = ".phone-container > span:nth-child(1) > a:nth-child(1)";

var LOGIN_POPUP_FORM = "div.header--wrapper:nth-child(1) > nav:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > section:nth-child(2)";
var LOGIN_MENU_ITEM = "div.header--wrapper:nth-child(1) > nav:nth-child(1) > ul:nth-child(1) > li:nth-child(3)";

var toReturn = null;
var numOfDoctorsLinks = null;

var numberOfResources = 0; // Number of loaded resources

// JS resources files
var COMMON_MIN_RESOURCE = "http://www.arzttermine.de/static/new-js/common.min.js";
var JQUERY_2_1_0_MINI_RESOURCES = "http://www.arzttermine.de/static/new-js/jquery-2.1.0.min.js";
var JQUERY_SOCIALSHAREPRIVACY_MINI_RESOURCES = "http://www.arzttermine.de/static/jquery/plugins/socialshareprivacy/jquery.socialshareprivacy.min.js";
var OWL_CAROUSEL_MIN_RESOURCE = "http://www.arzttermine.de/static/new-js/vendor/owl-carousel/owl.carousel.min.js";

// CSS resources files
var COMMON_MIN_CSS_RESOURCE = "http://www.arzttermine.de/static/new-stylesheets/css/common.min.css?cv=0218-1";
var HOME_MIN_CSS_RESOURCE = "http://www.arzttermine.de/static/new-stylesheets/css/home.min.css?cv=0218-1";
var OWL_CAROUSEL_CSS_RESOURCE = "http://www.arzttermine.de/static/new-js/vendor/owl-carousel/owl.carousel.css";
var OWL_THEME_CSS_RESOURCES = "http://www.arzttermine.de/static/new-js/vendor/owl-carousel/owl.theme.css";
var SOCIAL_SHARE_PRIVACY_CSS_RESOURCE = "http://www.arzttermine.de/static/jquery/plugins/socialshareprivacy/socialshareprivacy/socialshareprivacy.css";

casper.on('resource.received', function(resource) {
    var resourceURL = resource.url;
    if(resourceURL == COMMON_MIN_RESOURCE) {
      casper.test.assert(true, '--- ' + resourceURL + ' resource is loaded!');
      numberOfResources = numberOfResources + 1;
    } else if (resourceURL == JQUERY_2_1_0_MINI_RESOURCES) {
      casper.test.assert(true, '--- ' + resourceURL + ' resource is loaded!');
      numberOfResources = numberOfResources + 1;
    } else if (resourceURL == JQUERY_SOCIALSHAREPRIVACY_MINI_RESOURCES) {
      casper.test.assert(true, '--- ' + resourceURL + ' resource is loaded!');
      numberOfResources = numberOfResources + 1;
    } else if (resourceURL == OWL_CAROUSEL_MIN_RESOURCE) {
      casper.test.assert(true, '--- ' + resourceURL + ' resource is loaded!');
      numberOfResources = numberOfResources + 1;
    }
    else if (resourceURL == COMMON_MIN_CSS_RESOURCE) {
      casper.test.assert(true, '--- ' + resourceURL + ' resource is loaded!');
      numberOfResources = numberOfResources + 1;
    }
    else if (resourceURL == HOME_MIN_CSS_RESOURCE) {
      casper.test.assert(true, '--- ' + resourceURL + ' resource is loaded!');
      numberOfResources = numberOfResources + 1;
    }
    else if (resourceURL == OWL_CAROUSEL_CSS_RESOURCE) {
      casper.test.assert(true, '--- ' + resourceURL + ' resource is loaded!');
      numberOfResources = numberOfResources + 1;
    }
    else if (resourceURL == OWL_THEME_CSS_RESOURCES) {
      casper.test.assert(true, '--- ' + resourceURL + ' resource is loaded!');
      numberOfResources = numberOfResources + 1;
    }
    else if (resourceURL == SOCIAL_SHARE_PRIVACY_CSS_RESOURCE) {
      casper.test.assert(true, '--- ' + resourceURL + ' resource is loaded!');
      numberOfResources = numberOfResources + 1;
    }
});

casper.test.begin("Homepage basic tests", function suite(test){
  casper.start().viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height).thenOpen("http://www.arzttermine.de", function(){
    test.assertTitle("Kostenfrei Arzttermine und Zahnarzttermine buchen | Arzttermine.de", "Homepage title ok");
  });

  // Check Search form elements
  // Check whether there is Search forme and whether the Search elements
  // are visible on the Searh form.
  casper.then(function(){
    test.assertVisible("form[action='/suche']", "Homepage search form visible on the home page.");
    test.assertVisible(casper.INSURANCE_COMBO, "'Insurance' combo box is visible on search form.");
    test.assertVisible(casper.TOWN_OR_POSTCODE_TEXT_INPUT, "'Town or postcode' combo box is visible on search form.");
    test.assertVisible(".placeholder", "'Subject area' combo box is visible on search form.");
    test.assertVisible(casper.SEARCH_BUTTON, '"Termin finden" button visible on search form.');
  });

  //Check HTML elements of the Site Logo
  casper.then(function() {
    casper.checkHeaderLogoElements();
  })

  // Check header telephne number link
  casper.then(function() {
    test.assertVisible(HEADER_TEL_LINK, 'Telephone link is visible on the screan!')
  })

  casper.then(function() {
    test.assertVisible('.owl-carousel', 'Doctors links section is visible on Home page!');
    test.assertVisible('.owl-prev', '  - Previous navigation button in Doctors section on Home page is visible!');    
    test.assertVisible('.owl-next', '  - Next navigation button in Doctors section on Home page is visible!');
    test.assertVisible('.owl-item', '  - Doctors Owal items are visible on the Home page.');
    test.assertVisible('.round-image', '  - Doctors Round images are visible on the Home page.');
  })

  casper.then(function() {
    numOfDoctorsLinks = this.evaluate(function() {
      var toReturn = document.querySelectorAll('div.owl-item').length;
      console.log("LLLL- " + toReturn);  
      return toReturn;
    });
    
    if(numOfDoctorsLinks >= 5) {
      test.assert(true, "  - There are " + numOfDoctorsLinks + " doctor items!!!");
    } else {
      test.assert(false, "  - There are " + numOfDoctorsLinks + " doctor items! 5 is minimum!!!");
    }
  })

  casper.then(function() {
    numOfDoctorsLinks = this.evaluate(function() {
      var toReturn = document.querySelectorAll('div.owl-wrapper a').length;
      console.log("LLLL- " + toReturn);  
      return toReturn;
    });
    
    if(numOfDoctorsLinks >= 5) {
      test.assert(true, "  - There are " + numOfDoctorsLinks + " links to doctor details!!!");
    } else {
      test.assert(false, "  - There are " + numOfDoctorsLinks + " links to doctor details! 5 is minimum!!!");
    }
  })

  // Check footer elements
  casper.then(function() {
    casper.checkFooterElements();
  })

  casper.run(function() {
    test.done();
  });
});

// casper.test.begin("Homepage resource test", function suite(test){
  
//   casper.start().viewport(1200, 1000).thenOpen("http://arzttermine.de", function(){
//     casper.echo('=== Number of requested resources is ' + numberOfResources);
//   });

//   casper.then(function() {
//     if (numberOfResources == 18) {
//       test.assert(true, 'All requested resources are loaded!!!');
//     } else {
//       test.assert(false, 'Some requested resources are not loaded!!! Number of loaded resurces file is: ' + numberOfResources);
//     }
//   })

//   casper.run(function() {
//     test.done();
//   });
// });
