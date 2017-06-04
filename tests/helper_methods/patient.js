
require("./HomePageElementsSelectors.js");

var termsLinksCheckpoint = ["/agb", "/impressum", "/datenschutz"];
var termsLinksUrls;
var areTheSame = true;

/*
* Check HTML elements of the Site Logo
*/
casper.checkHeaderLogoElements = function checkHeaderLogoElements() {
  this.test.assertVisible(casper.HEADER_LOGO, 'Header Logo DIV is visible!');
  this.test.assertExists(casper.HEADER_LOGO_LINK, ' - Header Logo link element exist!');
  this.test.assertExists(casper.HEADER_LOGO_SPAN_GREY, ' - Header logo GREY span exist!');
  this.test.assertExists(casper.HEADER_LOGO_SPAN_WHITE, ' - Header logo WHITE span exist!');
  this.test.assertExists(casper.HEADER_LOGO_SPAN_BLUE, ' - Header logo BLUE span exist!');
  this.test.assertExists(casper.HEADER_LOGO_SPAN_BLACK, ' - Header logo BLACK span exist!');
}

/*
* Check HTML elements of the footer
*/
casper.checkFooterElements = function checkFooterElements() {
  this.test.assertVisible('footer', 'Footer is visible on the screan!');
  casper.checkFooterLogoElements();
  casper.checkSocialNetworkShareElements();
  casper.checkTermsOfUseLinks();
  
}

casper.checkTermsOfUseLinks = function checkTermsOfUseLinks() {
  this.test.assertVisible('#legal', 'Terms of use section is visible in the footer!');
  termsLinksUrls = this.evaluate(getTermsLinks);
  
  // Compare new 'Rechtliches' links with checkpoint array
  // and prints all new links url in console
  casper.compareTermsArrays();  

  this.echo(termsLinksUrls.length + ' Terms of use links found:');
  this.echo(' - ' + termsLinksUrls.join('\n - '));
}

casper.compareTermsArrays = function compareTermsArrays() {
  if (termsLinksUrls.length == termsLinksCheckpoint.length) {
    for (var i = 0; i < termsLinksUrls.length; i++) {
      if (termsLinksUrls[i] != termsLinksCheckpoint[i]) {
        console.log("Elements are not the same: " + termsLinksUrls[i] + " -- " + termsLinksCheckpoint[i]);
        areTheSame = false;
      } 
    }
  } else {
    console.log("termsLinksUrls length is: " + termsLinksUrls.length + " -- termsLinksCheckpoint length is: " + termsLinksCheckpoint.length);
    areTheSame = false;
  }
  this.test.assert(areTheSame, "Terms of use list of links is OK!!!");
}

// Grab links from first column in 'Rechtliches' - 'Terms of use' section
function getTermsLinks() {
  termsLinksUrls = document.querySelectorAll('#legal ul li a');
  return Array.prototype.map.call(termsLinksUrls, function(e) {
      return e.getAttribute('href');
  });
}

/*
* Check HTML elements of the footer Logo
*/
casper.checkFooterLogoElements = function checkFooterLogoElements() {
  this.test.assertExists(casper.FOOTER_LOGO, 'Footer Logo DIV exist!');
  this.test.assertExists(casper.FOOTER_LOGO_LINK, ' - Footer Logo link element exist!');
  this.test.assertExists(casper.FOOTER_LOGO_SPAN_GREY, ' - Footer logo GREY span exist!');
  this.test.assertExists(casper.FOOTER_LOGO_SPAN_WHITE, ' - Footer logo WHITE span exist!');
  this.test.assertExists(casper.FOOTER_LOGO_SPAN_BLUE, ' - Footer logo BLUE span exist!');
  this.test.assertExists(casper.FOOTER_LOGO_SPAN_BLACK, ' - Footer logo BLACK span exist!');
}

/*
* Check HTML elements of the footer
*/
casper.checkSocialNetworkShareElements = function checkSocialNetworkShareElements() {
  this.test.assertVisible('#socialshareprivacy', 'Social network share links are visible in the footer!');

  casper.checkFacebookShereEoements();
  casper.checkTwitterShereEoements();
  casper.checkGplusShereEoements();
  //getObjectAttribute(".fb_like_privacy_dummy", "src");  
}

casper.checkGplusShereEoements = function checkGplusShereEoements() {
  this.test.assertVisible('.gplus', ' - Google plus share element is visible in the footer!');
  this.test.assertVisible('.gplus > a:nth-child(2)', '   + Google plus share Switch off button is visible in google plus section!');
  this.test.assertVisible('.gplus_one_dummy', '   + Google plus dummy image is visible in facebook section!');
}

casper.checkFacebookShereEoements = function checkFacebookShereEoements() {
  this.test.assertVisible('.facebook', ' - Facebook share element is visible in the footer!');
  this.test.assertVisible('.facebook > a:nth-child(2)', '   + Facebook share Switch off button is visible in facebook section!');
  this.test.assertVisible('.fb_like_privacy_dummy', '   + Facebook dummy image is visible in facebook section!');
}

casper.checkTwitterShereEoements = function checkTwitterShereEoements() {
  this.test.assertVisible('.twitter', ' - Twitter share element is visible in the footer!');
  this.test.assertVisible('.twitter > a:nth-child(2)', '   + Twitter share Switch off button is visible in twitter section!');
  this.test.assertVisible('.tweet_this_dummy', '   + Twitter dummy image is visible in twitter section!');
}

function getObjectAttribute(cssSelector, objectAttribute) {
  // facebook image
  var facebookImageSrc = "/static/jquery/plugins/socialshareprivacy/socialshareprivacy/images/dummy_facebook.png";

  var objAttr = this.evaluate(function() {
    var atrValue = document.querySelector('.fb_like_privacy_dummy').getAttribute('src');
    return atrValue;
  })

  if (utils.equals(objAttr, facebookImageSrc)) {
    test.assert(true, 'facebook image source is OK!');
  } else {
    test.assert(false, 'facebook image source is NOT ok!!!');
  }
}

/*
* Login to Default user account through quick login form
*/
casper.loginTestUser = function loginTestUser() {
  // this.click("#patient-reg-top a.quick-login");
  //this.clickLabel('Login');

  // Fill Login form and  and click on Login button
  this.fill('#login_form', {
    'email': 'nebojsajogric+arztterminetest@gmail.com',
    'password': 'nesa123456'
  }, true);

  casper.wait(10000);

  casper.waitForSelector('#patient-account', function() {
    this.test.assert(true, 'Default User is successfully logged in!!!')
  })
}

/*
* Logut from user account
*/
casper.logoutUser = function logoutUser() {
  // Logoff from user account
  this.click(".right > a:nth-child(1)");

  this.waitForSelector('#login_form', function() {
    var url = "https://www.arzttermine.de/patienten-login";
    this.test.assert(this.getCurrentUrl() === url, 'User is leged out!!!');
  });
}

/*
* Populate Appointment form with Default user data
*/
casper.fillAppointmentFormWithSubmit = function fillAppointmentFormWithSubmit(doSubmit, send_sms, send_email) {
	// Set gender on 'Herr'
  casper.click('#gender-2');
  
  // Fill form elements (First name, Last name, email address, phone number)
  casper.fill('#booking-form', {
    'form[first_name]': 'Test-Thomas',
    'form[last_name]': 'Test-Hillard',
    'form[email]': 'testgroup@arzttermine.de',
    'form[phone]': '+ 49 0 157 7737 8290'
  }, false);
  
  casper.echo("    - In First name field type 'Test-Thomas'");
  casper.echo("    - In Last name field type 'Test-Hillard'");
  casper.echo("    - In Email field type 'testgroup@arzttermine.de'");
  
  if (send_sms) {
	casper.echo("---> Click on the SMS checkbox to select it")
    casper.click('#contact_preference_sms'); 
  }
  
  casper.click('#booking-form #step-1 .button-wrapper button');
  casper.echo("---> CLIK ON WEITER BUTTON");

  casper.wait(2000);

  var secondCombo = document.getElementsByClassName ("#filter-treatment");
  var selectedOption = 'Sonstige';
  casper.echo("---> In 'Behandlungsgrund' box set 'Sonstige' value")
  secondCombo.value = selectedOption;

  casper.echo("---> For 'Waren Sie bereits Patient/in bei Dr. Patrick Prinz?' click on 'Ja' radio button")
  casper.click('#is-patient-1')

  casper.echo("---> Click on radio button 'I agree to my data being used to teach my appointment...'")
  casper.click('#checkbox-tos');
	
  if (doSubmit) {
    this.test.assertVisible('#step-2 .button-wrapper button[type="submit"]', 'Booking button is visible');
    casper.click('#step-2 .button-wrapper button[type="submit"]');
    casper.echo("---> CLIK ON 'Termin buchen!' BUTTON");
    casper.wait(3000, function() {
      casper.test.assertDoesntExist('.error', 'Ther is no errors.')  
    })
  };
}


doSearchDoctors = function doSearchDoctors(specialty, town, insurance) {
  var specialtyComboSelector = casper.MEDICAL_SPECIALTY_COMBO;
  var specialtyValue = specialty;
  casper.echo("Values are : " + specialtyComboSelector + " -  and value for selector is : " + specialtyValue);
  casper.evaluate(function() {
    casper.echo("Values are  : " + specialtyComboSelector + " -  and value for selector is : " + specialtyValue);
    setComboBoxVaue(specialtyComboSelector, specialtyValue)
  })
  //casper.evaluate(setComboBoxVaue(specialtyComboSelector, specialtyValue));

  //casper.evaluate(setComboBoxVaue(casper.INSURANCE_COMBO, insurance));
}

function setComboBoxVaue(comboSelector, selectedValue) {
  casper.echo(comboSelector);
  casper.echo(selectedValue);
  // var secondCombo = document.querySelector(comboSelector);
  // // var selectedOption = 'Akute Zahnschmerzen';
  //   // In 'Behandlungsgrund' box set 'Akute Zahnschmerzen' value
  // secondCombo.value = selectedValue;
  
}
