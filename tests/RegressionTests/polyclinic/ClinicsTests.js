require("./../../../helper.js");
require('./../../helper_methods/patient');

// Get clinic name
function getClinicName () {
  var clinicName = document.querySelectorAll('h1');
  return clinicName[0].innerHTML;
}

function getClinicPhone () {
  var clinicPhone = document.querySelectorAll('div.headline.justified-blocks > div');
  return clinicPhone[0].innerHTML;
}

function getClinicBreadcrumbs () {
  var clinicBreadcrumbs = document.querySelectorAll('div.breadcrumbs > ul');
  return clinicBreadcrumbs;
}

function getClinicDoctors () {
  var clinicDoctors = document.querySelectorAll('#providers > section');
  return clinicDoctors;
}

function getClinicDoctorLinks () {
  var clinicDoctorsLinks = document.querySelectorAll('div.title > h2 > span > a');
  return clinicDoctorsLinks;
}

function getClinicDoctorsCalendars () {
  var clinicDoctorsCalendars = document.querySelectorAll('div.calendar');
  return clinicDoctorsCalendars;
}

var HEADER_TEL_LINK = ".phone-container > span:nth-child(1) > a:nth-child(1)";

/*
*
* TEST DESCRIPTION
*
*/
casper.test.begin("Clinics with multiple doctors test", function suite(test){
 
  casper.start('http://www.arzttermine.de/praxis/polikum-charlottenburg/gkv');
  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  casper.then(function() {
    casper.checkHeaderLogoElements();
     test.assertVisible(HEADER_TEL_LINK, 'Telephone link is visible on the screan!')
  })

  casper.then(function() {
    var openedClinicName = this.evaluate(getClinicName);
    if (openedClinicName == 'Polikum Charlottenburg') {
      test.assert(true, '"Polikum Charlottenburg" details page is opened.');	
    }
  })
  
  casper.then(function() {
    test.assertVisible('div.headline.justified-blocks > div', 'Clinic phone number is visible');
    var openedClinickPhone = this.evaluate(getClinicPhone);
    if (openedClinickPhone == '030-609 835149') {
      test.assert(true, '  - "Polikum Charlottenburg" phone number is corect!');	
    }
  })

  casper.then(function() {
    test.assertVisible('.breadcrumbs', 'Breadcrumbs are visible.');

    var clinicBreadcrumbsArray  = this.evaluate(getClinicBreadcrumbs);
    if (clinicBreadcrumbsArray.length > 2) {
      test.assert(true, '  - Breadcrumbs number is Ok! There is ' + clinicBreadcrumbsArray.length +  ' breadcrumbs.');
    } else {
      test.assert(false, 'Something is wrong with breadcrumbs!!!');
    };
  })

  casper.then(function() {
    test.assertVisible('.middle > div.address', 'Clinic address is visible!');
    test.assertVisible('.specialties', 'Clinic specialty is visible!');

    test.assertVisible('.location-map > img', 'Location map image is visible!');

    test.assertVisible('.insurance-selector', 'Insurance selector is visible');
    test.assertVisible('a.insurance-selector-button.public', '  - Public insurance selector is visible.');
    test.assertVisible('a.insurance-selector-button.private', '  - Private insurance selector is visible.');
  })

  casper.then(function() {
    var clinicDoctorsArray = this.evaluate(getClinicDoctors);
    if (clinicDoctorsArray.length >= 2) {
      test.assert(true, 'Number of the doctors is Ok! There is ' + clinicDoctorsArray.length + ' doctors.');
    } else {
      test.assert(false, 'Something is wrong with a number of the doctors!!! Count : ' + clinicDoctorsArray.length);
    };
  })

  casper.then(function() {
    var clinicDoctorsLinksArray = this.evaluate(getClinicDoctorLinks);
    if (clinicDoctorsLinksArray.length >= 2) {
      test.assert(true, 'Number of the doctors LINKS is Ok! There is ' + clinicDoctorsLinksArray.length + ' doctors links.');
    } else {
      test.assert(false, 'Something is wrong with number of the doctors LINKS!!! Count : ' + clinicDoctorsLinksArray.length);
    };
  })

  casper.then(function() {
    var clinicDoctorsCalendarsArray = this.evaluate(getClinicDoctorsCalendars);
    if (clinicDoctorsCalendarsArray.length >= 2) {
      test.assert(true, 'Number of the doctors CALENDARS is Ok! There is ' + clinicDoctorsCalendarsArray.length + ' calendars.');
    } else {
      test.assert(false, 'Something is wrong with number of the doctors CALENDARS!!! Count : ' + clinicDoctorsCalendarsArray.length);
    };
  })

  // Check footer elements
  casper.then(function() {
    casper.checkFooterElements();
  })
  
  casper.run(function() {
    test.done();
  });
});
