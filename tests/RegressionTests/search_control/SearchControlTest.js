require("./../../helper.js");
require('./../helper_methods/patient');
require("./../helper_methods/HomePageElementsSelectors.js");

var numOfDoctorsLinks = null;

casper.test.begin("Home page Search tests", function suite(test){

  function getErrorMessageNumber () {
    var errorElements = document.querySelectorAll('.error');
      return errorElements.length;
  }

  function checkResultsCityValue(current_city) {
		cities = casper.evaluate(getDoctorCities);
	
		casper.each(cities, function (self, city) {
			if (city != current_city) {
				test.fail("City for some of results is " + city + ", but it should be " + current_city);
			}
			
		});
		
		test.assert(true, "City vale for a search result is OK")
	}

  function getDoctorCities() {
		var dates = document.querySelectorAll('#providers section.result header .address .zip-city .city');

		return Array.prototype.map.call(dates, function(e) {

			return e.innerHTML;

		});
	}

  casper.start();
  
  if(typeof casper.cli.get("user") !== 'undefined' && typeof casper.cli.get("pass") !== 'undefined') {
    console.log("Setting httpauth credentials...");
    casper.setHttpAuth(casper.cli.get('user'), casper.cli.get('pass'));
  }
  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  // Open arzttermine Home page. 
  // Check Title of the page. Check whether there is Search forme is visible.
  casper.thenOpen("http://arzttermine.de", function verifyHomePage(){
    test.assertTitle("Kostenfrei Arzttermine und Zahnarzttermine buchen | Arzttermine.de", "Homepage title ok");
	casper.echo("---> Page title is OK!")
    test.assertExists("form[action='/suche']", "Homepage search form exists");
	casper.echo("---> Search form is visible on Home page!")
    
  });
  
  casper.then(function(){
	this.click("form.search-box select[name='form[medical_specialty_id]']");
	casper.echo("---> Click on the medical_specialty combo box");
	this.evaluate(function() {
		var form = document.querySelector("form.search-box select[name='form[medical_specialty_id]']");
		form.selectedIndex = 1;
		$(form).change();
		casper.echo("---> In medical_specialty combo, chose first value. Should be 'Zahnarzt'");
	});
	
  });
  
  casper.then(function(){
	this.click("form.search-box select[name='form[insurance_id]']");
	casper.echo("---> Click on the insurance type combo box");
	this.evaluate(function() {
		var form = document.querySelector("form.search-box select[name='form[insurance_id]']");
		form.selectedIndex = 2;
		$(form).change();
		casper.echo("---> In insurance combo, chose second value. Should be 'private'");
	});
  });

  casper.then(function (){
		
    casper.sendKeys(casper.TOWN_OR_POSTCODE_TEXT_INPUT, "Berlin");
	casper.echo("---> In Location type Berlin");
    
    // Click on the "Termin finden" button
    this.click(casper.SEARCH_BUTTON);
    casper.echo("--->  CLIK ON THE SEARCH BUTTON");

    casper.wait(5000);
    // When the Search map becomes visible, check Title of new page and number of results text visibility
    casper.waitForSelector('#search-map', function() {
      test.assertTitle("Arzttermine in Berlin beim Zahnarzt | Arzttermine.de", "Search resutls page title ok");
      test.assertVisible("#search-map", "Search map is visible on search form.");
      test.assertVisible(casper.NEXT_PAGE_BUTTON, "Next results page button is visible.");
      test.assertVisible("span.docs-count", "Nubmer of search results text is visible!");
    });
  });

  casper.then(function() {
    numOfDoctorsLinks = this.evaluate(function() {
      var toReturn = document.querySelectorAll('.docs-count');
      return toReturn[0].innerHTML;
    });
    casper.echo("--->  Total number of search results is " + numOfDoctorsLinks);  
  });
  
  
  casper.then(function() {
	cities = casper.evaluate(getDoctorCities);
	
	casper.each(cities, function (self, city) {
        if (city != "Berlin") {
			test.fail("City for some of results is " + city + ", but it should be Berlin");
		}
    });
	
	test.assert(true, "City vale for a search result is OK")
  });
  

  // Click on link "2" in search results pager to go on page two and check if page two is selected
  casper.thenClick(casper.NEXT_PAGE_BUTTON, function() {
	casper.echo("--->  Click on the Next results page");  
    casper.waitForSelector(casper.PREVIOUS_PAGE_BUTTON, function() {
      test.assertVisible(casper.PREVIOUS_PAGE_BUTTON, "Results back button became visible");  
    });
  });
  
  // Duplicated, should be function
  casper.then(function() {
	cities = casper.evaluate(getDoctorCities);
	
	casper.each(cities, function (self, city) {
        if (city != "Berlin") {
			test.fail("City for some of results is " + city + ", but it should be Berlin");
		}
    });
	
	test.assert(true, "City vale for a search result is OK")
  });

  casper.then(function() {
    test.assertVisible('#filters', 'Filter section is visible!');
    test.assertVisible('.refresh-filters', '  - Refresh filters button is visible in the form.');
    test.assertVisible('#filter-location', '  - Filter location is visible in the form.');
    test.assertVisible('#filter-specialty', '  - Speciality combo box filter element is visiblem in the search form.');
	
	this.sendKeys("#filters .toggler #filter-location", "Munich");
	this.echo("--->  In Location type Munich");
  });
  
  casper.thenClick("#filters-essential button.refresh-filters", function() {
		this.wait(5000);
		this.echo("--->  Click on the 'Ergebnisse filtern' button to refresh search results");
	});
  
  

  casper.then(function() {
    test.assertVisible('#providers', 'Provide HTML element is visible on the results page.')
  });

  casper.then(function() {
    numOfDoctorsLinks = this.evaluate(function() {
      var toReturn = document.querySelectorAll('section.result').length ;
      return toReturn;
    });

    casper.echo("--->  Number of search results on the second page is " + numOfDoctorsLinks);  
  });
  
  // Duplicated, should be function
  casper.then(function() {
	cities = casper.evaluate(getDoctorCities);
	
	casper.each(cities, function (self, city) {
        if (city != "München") {
			test.fail("City for some of results is " + city + ", but it should be München");
		}
    });
	
	test.assert(true, "City vale for a search result is OK")
  });
  
  casper.then(function(){
	this.click("#filter-specialty");
	casper.echo("--->  Click on the specialty combo box");
	this.evaluate(function() {
		var form = document.querySelector("#filter-specialty");
		form.selectedIndex = 4;
		$(form).change();
		casper.echo("--->  In specialty combo, chose 4th value. Should be 'Allergologen'");
	});
  });
  
  casper.thenClick("#filters-essential button.refresh-filters", function() {
		this.wait(5000);
		this.echo("--->  Click on the 'Ergebnisse filtern' button to refresh search results");
	});
  

  // Click on link "2" in search results pager to go on page two and check if page two is selected
  casper.thenClick(casper.NEXT_PAGE_BUTTON, function() {
	casper.echo("--->  Click on the Next results page");  
    casper.waitForSelector(casper.PREVIOUS_PAGE_BUTTON, function() {
      test.assertVisible(casper.PREVIOUS_PAGE_BUTTON, "Results back button became visible");  
    });
  });
  
  
  // Duplicated, should be function
  casper.then(function() {
	cities = casper.evaluate(getDoctorCities);
	
	casper.each(cities, function (self, city) {
        if (city != "München") {
			test.fail("City for some of results is " + city + ", but it should be München");
		}
		
    });
	
	test.assert(true, "City vale for a search result is OK")
  });
  
  
  casper.then(function() {
    casper.click(casper.PREVIOUS_PAGE_BUTTON)
    casper.echo("--->  Go to previous page");
    casper.wait(5000);

    
  });
  
  // Check search results footer elements
  casper.then(function() {
    casper.checkFooterElements();
  })

  casper.run(function() {
    test.done();
  });
});
