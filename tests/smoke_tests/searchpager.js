require("./../../helper.js");
require('./../helper_methods/patient');
require("./../helper_methods/HomePageElementsSelectors.js");

var FIRST_DOCTOR_NAME_LINK = '#providers section.result header .title h2.name span a:first-of-type';

var numOfDoctorsLinks = null;

casper.test.begin("Search page and Results pager tests", function suite(test){

  // Get name of first doctor
  function getFirstDoctorName () {
    var doctorName = casper.fetchText(FIRST_DOCTOR_NAME_LINK);
      return doctorName;
  }

  // -----
  function getErrorMessageNumber () {
    var errorElements = document.querySelectorAll('.error');
      return errorElements.length;
  }

  casper.start();
  
  if(typeof casper.cli.get("user") !== 'undefined' && typeof casper.cli.get("pass") !== 'undefined') {
    console.log("Setting httpauth credentials...");
    casper.setHttpAuth(casper.cli.get('user'), casper.cli.get('pass'));
  }
  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  // Open arzttermine Home page. 
  // Check Title of the page. Check whether there is Search forme and whether the Search elements
  // are visible on the Searh form.
  casper.thenOpen("http://arzttermine.de", function verifyHomePage(){
    test.assertTitle("Kostenfrei Arzttermine und Zahnarzttermine buchen | Arzttermine.de", "Homepage title ok");
    test.assertExists("form[action='/suche']", "Homepage search form exists");
    test.assertVisible(casper.INSURANCE_COMBO, "  - 'Insurance' combo box is visible on search form.");
    test.assertVisible(casper.TOWN_OR_POSTCODE_TEXT_INPUT, "  - 'Town or postcode' text field is visible on search form.");
    test.assertVisible(".placeholder", "  - 'Subject area' combo box is visible on search form.");
  });

  casper.then(function (){
    casper.sendKeys(casper.TOWN_OR_POSTCODE_TEXT_INPUT, "Berlin");
    // In Search form Berlin is set for Location by default
    // 
    // Click on the "Termin finden" button
    this.click(casper.SEARCH_BUTTON);
    casper.echo("<<<--- CLIK ON THE SEARCH BUTTON --->>>");

    casper.wait(10000);
    // When the Search map becomes visible, check Title of new page and number of results text visibility
    casper.waitForSelector('#search-map', function() {
      test.assertTitle("Arzttermine in Berlin beim Zahnarzt | Arzttermine.de", "Search resutls page title ok");
      test.assertVisible("#search-map", "Search map is visible on search form.");
      test.assertVisible(casper.NEXT_PAGE_BUTTON, "Next results page button is visible.");

      casper.echo("<<<--- CLIK ON THE NEXT RESULTS PAGE BUTTON --->>>");
      
      test.assertVisible("span.docs-count", "Nubmer of search results text is visible!");
    });
  });

  casper.then(function() {
    numOfDoctorsLinks = this.evaluate(function() {
      var toReturn = document.querySelectorAll('.docs-count');
      return toReturn[0].innerHTML;
    });
    casper.echo("+++ Total number of search results is " + numOfDoctorsLinks);  
  })

  // Click on link "2" in search results pager to go on page two and check if page two is selected
  casper.thenClick(casper.NEXT_PAGE_BUTTON, function() {
    casper.waitForSelector(casper.PREVIOUS_PAGE_BUTTON, function() {
      test.assertVisible(casper.PREVIOUS_PAGE_BUTTON, "Results back button became visible");  
    });
  })

  casper.then(function() {
    test.assertVisible('#filters', 'Filter section is visible!');
    test.assertVisible('.refresh-filters', '  - Refresh filters button is visible in the form.');
    test.assertVisible('#filter-location', '  - Filter location is visible in the form.');
    test.assertVisible('#filter-specialty', '  - Speciality combo box filter element is visiblem in the search form.');

  })

  casper.then(function() {
    test.assertVisible('#providers', 'Providetr HTML element is visible on the results page.')
  })

  casper.then(function() {
    numOfDoctorsLinks = this.evaluate(function() {
      var toReturn = document.querySelectorAll('section.result').length ;
      return toReturn;
    });

    casper.echo("+++ Number of search results on the second page is " + numOfDoctorsLinks);  
  })

  // Check search results footer elements
  casper.then(function() {
    casper.checkFooterElements();
  })

  casper.then(function() {
    casper.click(casper.PREVIOUS_PAGE_BUTTON)
    casper.echo("Go to previous page");
    casper.wait(5000);

    var firstDoctorName = this.evaluate(getFirstDoctorName);
    console.log(firstDoctorName);
    // Click on the first doctor to open details page
    casper.click(FIRST_DOCTOR_NAME_LINK);
    casper.echo("<<<--- CLIK ON THE FIRST DOCTOR NAME LINK --->>>");

    casper.waitForSelector('.breadcrumbs', function() {
      test.assertVisible('div.phone', 'Doctor phone is visible.')
      
      test.assertExists('.container', 'Doctor details page is opened.');
      // Click on first available term
      casper.click('.appointment');
    })
  })

  casper.then(function() {
    test.assertVisible('div.right-align:nth-child(6) > button:nth-child(1)', 'Weiter button is visible.');
    casper.click('div.right-align:nth-child(6) > button:nth-child(1)');
    casper.echo("<<<--- CLIK ON WEITER BUTTON --->>>");

    test.assertVisible('#go-to-step1', 'Go to step 1 buton is visible.')
    
    test.assertVisible('#step-2 > div.right-align > button', '"Termin buchen" button is visible.');
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
      test.assert(false, 'Incorect number of errors. CHECK VALIDATION !!!')
    }
  })

  casper.run(function() {
    test.done();
  });
});
