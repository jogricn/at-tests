require("./../../../helper.js");
require('./../../helper_methods/patient.js');
require('./../../helper_methods/doctors.js');

//https://www.arzttermine.de/buchung/ba069798c950/m1
//https://www.arzttermine.de/bewertung/ba069798c950/m1

var APPOINTMENT_BOOKING_LINK;
var APPOINTMENT_BOOKING_DOCTOR;

var BASE_SITE_URL = "https://www.arzttermine.de";

var FIRST_DOCTOR_NAME_LINK = '#providers section.result header .title h2.name span a:first-of-type';

FIRST_APPOINTMENT = "#upcoming_bookings_container > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(5) > input.btn_gray_new:nth-child(1)";
SECUND_APPOINTMENT = "#upcoming_bookings_container > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(5) > input:nth-child(1)";


/*
* --- TEST ---
*
* Description
* 	Open Dr. Jürgen Ranft, M.Sc. page and make appointment for first available term
*/
casper.test.begin("Test - Make an appointment - Dr. Jürgen Ranft, M.Sc.", function suite(test){
    
  casper.start().viewport(1200, 1000).thenOpen('https://arzttermine.de/arzt/dr-juergen-ranft-msc', function(){
	casper.echo("---> Open 'Dr. Jürgen Ranft, M.Sc.' page URL https://arzttermine.de/arzt/dr-juergen-ranft-msc")
	test.assertTitle("Dr. Jürgen Ranft, M.Sc., Zahnarzt in Berlin, Termin buchen | Arzttermine.de", 
	"Dr. Jürgen Ranft page title is OK!");

  });

  casper.then(function() {
      this.wait(2000);
	  this.capture('doctor_page.png');
      casper.waitForSelector('.breadcrumbs', function() {
        test.assertExists('.container', 'Doctor details page is opened.')
        // Click on first available term
        casper.click('.appointment');
		casper.echo("---> Click on first available term")
      })
    //});
  })

  // Populate form and click on "Termin buchen" button to make an appointment with test user
  casper.then(function() {
	  this.capture('1_empty_appointment_form.png');
    casper.fillAppointmentFormWithSubmit(true, false, true);

    casper.capture('2_ZakazanTermin.png');

    casper.waitForText('Ihre Buchung war erfolgreich', function() {
      test.assertVisible('#booking-confirmation', 'Bookint confirmation form is visible.')
      test.assert(true, 'Your booking was successful!!!');

      APPOINTMENT_BOOKING_LINK = this.getCurrentUrl();
	  this.echo("APPOINTMENT_BOOKING_LINK:" + APPOINTMENT_BOOKING_LINK)
    })
  });

  casper.run(function() {
    test.done();
  });
});





/*
*
* TEST DESCRIPTION
*
*/
casper.test.begin("Check doctor evaluation page Test", function suite(test){
  var EVALUATION_PAGE_URL = APPOINTMENT_BOOKING_LINK.replace('buchung', 'bewertung');
 
  casper.start().viewport(1200, 1000).thenOpen(EVALUATION_PAGE_URL, function(){
    test.assertVisible('h1', 'Doctor name is visible on the valuation page');
  });

  casper.then(function() {
    checkDefaultDoctorPageElements(test);
    checkRatingElements(test);
    checkDoctorCalendars(test);
    chechRaitingsReviewsSection(test);
    getNumOfRaitings(test);
    checkNumOfRatings(test);
  })


  casper.run(function() {
    test.done();
  });
});



/*
* --- TEST ---
*
* Description - Cancellation of Appointment Tests
*/
//casper.test.begin("Cancellation of Appointment Tests", function suite(test){
// 
// casper.start("https://www.arzttermine.de/patienten-login");
//
// casper.then(function(){
//    casper.loginTestUser();
//  });

//  casper.wait(2000);

//  casper.then(function() {
    // Click on 'Termine' tab
//    casper.click('#doctor_dashboard_left_panel > div:nth-child(3) > a');
//  });

// casper.waitForSelector('#patient-account', function() {
//    test.assertVisible('#upcoming_bookings_container', 'Termine Booking page is opened.');    

//    var url = "https://www.arzttermine.de/patienten/termine";
//    test.assert(this.getCurrentUrl() === url, 'URL is ok!!!');
//    //test.assertVisible('#upcoming_bookings_container > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(5) > input:nth-child(1)', 'Cancelation button is visible.');
//  })

//  casper.wait(2000);

//  casper.then(function() {
   
    //            #upcoming_bookings_container > table > tbody > tr.booking_row > td:nth-child(5) > input
//    casper.click('#upcoming_bookings_container > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(5) > input:nth-child(1)');
//    casper.wait(2000);

    //this.capture("hello5.png");
    
    // casper.waitForSelector('button', function() {
    //   casper.click('button');
    // })
//  })

//  casper.run(function() {
//    test.done();
//  });
//});

/*
* --- TEST ---
*
* Description
* 	
*/
casper.test.begin("Test - Booking form validation", function suite(test){
  
  // Get name of first doctor
  function getSelectedDoctorName () {
    var doctorName = document.querySelectorAll('section.result:nth-child(1) > div:nth-child(1) > header:nth-child(1) > div:nth-child(2) > h2:nth-child(1) > span:nth-child(1) > a:nth-child(1)');
      return doctorName[0].innerHTML;
  }
  
  casper.start().viewport(1200, 1000).thenOpen('https://arzttermine.de', function(){
	casper.echo("---> Open Arzt termine home page - URL https://arzttermine.de")
    test.assertTitle("Kostenfrei Arzttermine und Zahnarzttermine buchen | Arzttermine.de", 
	"Homepage title ok");
	
  });

  casper.then(function() {
	  
    casper.sendKeys(casper.TOWN_OR_POSTCODE_TEXT_INPUT, "Berlin");
	casper.echo("---> In Location type Berlin");	
    
    // Click on the "Termin finden" button
    this.click(casper.SEARCH_BUTTON);
    casper.echo("---> Click on the Search button");

    // When the number of search results becomes visible, open first doctor and 
    // click on first available term open to try to make an appointment
    casper.waitForSelector('span.docs-count', function() {
		var firstDoctorName = this.evaluate(getSelectedDoctorName);
		APPOINTMENT_BOOKING_DOCTOR = firstDoctorName;

		casper.echo(APPOINTMENT_BOOKING_DOCTOR);

		// Click on the first doctor to open details page
		casper.click(FIRST_DOCTOR_NAME_LINK);
		console.log("---> Click on doctor " + firstDoctorName);
      
		this.wait(2000);
		
		casper.waitForSelector('.breadcrumbs', function() {
			this.capture('doctor_page.png');
			test.assertExists('.container', 'Doctor details page is opened.')
			// Click on first available term
			casper.click('.appointment');
			casper.echo("---> Click on first available term")
		})
    });
  })

  // Populate form and click on "Termin buchen" button to make an appointment with test user
  casper.then(function() {
	//this.capture('appointment_form.png');
	casper.wait(2000);
	casper.click('#booking-form #step-1 .button-wrapper button');
	casper.echo("---> CLIK ON WEITER BUTTON");

    //
	casper.wait(2000);
	
	casper.capture("DRUGI_nakon_weiter.png");
	
	this.test.assertVisible('#step-2 .button-wrapper button[type="submit"]', 'Booking button is visible');
	this.capture('DRUGI_pre_buchen.png');
    casper.click('#step-2 .button-wrapper button[type="submit"]');
    casper.echo("---> CLIK ON 'Termin buchen!' BUTTON");
    casper.wait(3000, function() {
		casper.test.assertExist('.error', 'Valiadation errors are visible.');
    })
	//
	this.capture('DRUGI_POSLE_buhena.png');
	// Check validation Error
	casper.waitForSelector('.form-element.error', function() {
		test.assertVisible('.form-element.error[data-error-message="Bitte geben Sie Ihren Vornamen ein."]', 'Vorname Validation ERROR is visible!!!');
		
		test.assertVisible('.form-element.error[data-error-message="Bitte geben Sie Ihren Nachnamen ein."]', 'Nachnamen Validation ERROR is visible!!!')
		
		test.assertVisible('.form-element.error[data-error-message="Bitte geben Sie Ihre E-Mail Adresse ein."]', 'E-Mail Adresse Validation ERROR is visible!!!')
				
		test.assertVisible('.form-element.error[data-error-message="Bitte geben Sie eine gültige Telefonnummer ein."]', 'Telefonnummer Validation ERROR is visible!!!')
		
	})
  });

  casper.run(function() {
    test.done();
  });
});

