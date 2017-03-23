require("./../../../helper.js");
require('./../../helper_methods/patient.js');
require('./../../helper_methods/doctors.js');

var HEADER_TEL_LINK = ".phone-container > span:nth-child(1) > a:nth-child(1)";

function getDoctorName () {
  var clinicName = document.querySelectorAll('h1');
  return clinicName[0].innerHTML;
}

/*
*
* TEST DESCRIPTION
*
*/
casper.test.begin("Doctor with multiple clinics test - Deniz Güvencer", function suite(test){

  casper.start('http://www.arzttermine.de/arzt/deniz-guevencer/gkv');
  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  casper.then(function() {
    casper.checkHeaderLogoElements();
    test.assertVisible(HEADER_TEL_LINK, 'Telephone link is visible on the screan!')
  })

  casper.then(function() {
    checkDefaultDoctorPageElements(test);
  })

  casper.then(function() {
    
    checkRatingElements(test);

    // TODO: Check number of stars for all ratings
    test.assertVisible('div.ratings div:nth-of-type(1) div.rating', '  - "Behandlung" Rating is 5!!!');
    test.assertVisible('div.ratings div:nth-of-type(2) div.rating', '  - "Wartezeit" Rating is 4!!!');
test.assertVisible('div.ratings div:nth-of-type(3) div.rating', '  - "Gesamtbewertung" Rating is 5!!!');
  })

  casper.then(function() {
    checkDoctorClinics(test, 2);
    checkDoctorClinicsLinks(test);
  })

  casper.then(function() {
    checkDoctorCalendars(test);
  })

  casper.then(function() {
    chechRaitingsReviewsSection(test);

    checkNumOfRatings(test);
  })

  // Check footer elements
  casper.then(function() {
    casper.checkFooterElements();
  })
  
  casper.run(function() {
    test.done();
  });
});

/*
*
* TEST DESCRIPTION
*
*/
casper.test.begin("Doctor with multiple rating reviews test - Dr. Walter Effenberger", function suite(test){

  casper.start('http://www.arzttermine.de/arzt/walter-effenberger/gkv');
  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
  
  casper.then(function() {
    casper.checkHeaderLogoElements();
    test.assertVisible(HEADER_TEL_LINK, 'Telephone link is visible on the screan!')
  })

  casper.then(function() {
    checkDefaultDoctorPageElements(test);
  })

  casper.then(function() {
    
    checkRatingElements(test);

    test.assertVisible('div.ratings div:nth-of-type(1) div.rating', '  - "Behandlung" Rating is 5!!!');
    test.assertVisible('div.ratings div:nth-of-type(1) div.rating', '  - "Wartezeit" Rating is 4!!!');
test.assertVisible('div.ratings div:nth-of-type(1) div.rating', '  - "Gesamtbewertung" Rating is 5!!!');
  })

  casper.then(function() {
    checkDoctorClinics(test, 1);
    checkDoctorClinicsLinks(test);
  })

  casper.then(function() {
    checkDoctorCalendars(test);
  })

  casper.then(function() {
    chechRaitingsReviewsSection(test);

    checkNumOfRatings(test);
  })

  // Check footer elements
  casper.then(function() {
    casper.checkFooterElements();
  })
  
  casper.run(function() {
    test.done();
  });
});
