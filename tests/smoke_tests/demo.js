require("./../../../helper.js");
require("./../helper_methods/HomePageElementsSelectors.js");

var FIRST_DOCTOR_NAME_LINK = 'section.result:nth-child(2)   \
                                > div:nth-child(1)          \
                                > header:nth-child(1)       \
                                > div:nth-child(2)          \
                                > h2:nth-child(1)           \
                                > span:nth-child(1)         \
                                > a:nth-child(1)';


// HELPER FUNCTIONS ====================================================================================================

function getNumberOfSearchResults() {
  var toReturn = document.querySelectorAll('.docs-count');
  return toReturn[0].innerHTML;
}

// Get name of first doctor
function getFirstDoctorName () {
  var doctorName = document.querySelectorAll(FIRST_DOCTOR_NAME_LINK);
  return doctorName[0].innerHTML;
}

function getErrorMessageNumber () {
  var errorElements = document.querySelectorAll('.error');
  return errorElements.length;
}

// END - HELPER FUNCTIONS ==============================================================================================


// TEST #1 =============================================================================================================
// Search page test

casper.test.begin("Seerch test", function suite(test){
  casper.start(casper.cli.get('baseurl'));
  if(typeof casper.cli.get("user") !== 'undefined' && typeof casper.cli.get("pass") !== 'undefined') {
    console.log("Setting httpauth credentials...");
    casper.setHttpAuth(casper.cli.get('user'), casper.cli.get('pass'));
  }

  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  casper.thenClick(casper.TERMIN_FINDEN_BUTTON);
    
  // When the Search map becomes visible, check a number of search results
  casper.waitForSelector('#search-map', function() {
    var numOfDoctorsLinks = this.evaluate(getNumberOfSearchResults);
    casper.echo("+++ Total number of search results is " + numOfDoctorsLinks);  

    if (numOfDoctorsLinks > 0) {
      test.assert(true, "Number of results is greater than zero. that's good");
    } else {
      test.assert(false, "Something wrong with the number of results!!! Number of results should be greater than zero");
    }
  });
  
  // Checksearch results Filter elements
  casper.then(function() {
    test.assertVisible('#filters', 'Filter section is visible!');
    test.assertVisible('.refresh-filters', '  - Refresh filters button is visible in the form.');
    test.assertVisible('#filter-location', '  - Filter location is visible in the form.');
    test.assertVisible('#filter-specialty', '  - Speciality combo box filter element is visiblem in the search form.');
  })

  casper.run(function() {
    test.done();
  });
});


// TEST #2 =============================================================================================================
// Booking an appointment
casper.test.begin("Appointment with empty form test", function suite(test){
  casper.start(casper.cli.get('baseurl'));
  if(typeof casper.cli.get("user") !== 'undefined' && typeof casper.cli.get("pass") !== 'undefined') {
    console.log("Setting httpauth credentials...");
    casper.setHttpAuth(casper.cli.get('user'), casper.cli.get('pass'));
  }

  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  casper.thenClick(casper.TERMIN_FINDEN_BUTTON);
    
  // When the Search map becomes visible, check a number of search results
  casper.waitForSelector('#providers');
  
  casper.then(function() {
    var firstDoctorName = this.evaluate(getFirstDoctorName);
    console.log(firstDoctorName);
    // Click on the first doctor to open details page
    casper.click(FIRST_DOCTOR_NAME_LINK);
    casper.echo("<<<--- CLIK ON THE FIRST DOCTOR NAME LINK --->>>");

    casper.waitForSelector('.breadcrumbs', function() {
      // Click on first available term
      casper.click('.appointment');
    })
  })

  casper.then(function() {
    test.assertVisible('div.right-align:nth-child(6) > button:nth-child(1)', 'Weiter button is visible.');
    casper.click('div.right-align:nth-child(6) > button:nth-child(1)');
    casper.echo("<<<--- CLIK ON WEITER BUTTON --->>>");

    // Click on "Termin buchen" button to try to make an appointment with empty form
    casper.click('#step-2 > div.right-align > button');
    casper.echo("<<<--- CLIK ON 'Termin buchen!' BUTTON --->>>");

    casper.waitForSelector('.error', function() {
      // Because we tried to submit empty form, error message should appear
      test.assertExists('div.error', 'Error is shown!');
    });

    // Weiter button is visible again
    test.assertVisible('div.right-align:nth-child(6) > button:nth-child(1)', 'Weiter button is visible.');
    var numOfErrors = this.evaluate(getErrorMessageNumber);
    if (numOfErrors != 9) {
      test.assert(false, 'Incorect number of errors. CHECK VALIDATION !!! There should be 9 validation errors')
    }
  })

  casper.run(function() {
    test.done();
  });
});