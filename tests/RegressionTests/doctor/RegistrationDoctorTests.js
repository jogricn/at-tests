require("./../../../helper.js");

var is_doctor_registered = false;

casper.test.begin("Doctor registration tests", function suite(test){
	
	// Get current date and return day
    function getCurrentDay () {
		var today = new Date();
		var dd = today.getDate();
		  return dd;
    }
	
	
    casper.start("http://arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.then(function() {
		
		var day = this.evaluate(getCurrentDay);
		
		if (day == 1) {
			casper.echo("### Test runs every 1st in a month ###");
			casper.echo("### Today is : " + day);
			casper.echo("### Skip test ###");
			test.done();
		}
    })

    casper.then(function() {
		test.assertExists('nav > ul > li:nth-child(2) > a', '"Für Ärzte" link exists in top bar navigation')
		// Click on "Jetzt kostenlos als Arzt registrieren!" button to open doctor registration form  
		casper.click('nav > ul > li:nth-child(2) > a');
		casper.echo('Click on "Für Ärzte" link to open Praxis marketing page');

		casper.waitForSelector('#intro > div.cta-box a', function() {
			test.assertUrlMatch("https://arzttermine.de/lp/praxis-marketing/praxis-marketing.html", 'New URL is ok');
		});
    })

    // Check registration form elements
    casper.thenClick('#intro > div.cta-box a', function() {
		casper.echo('Click on "Jetzt kostenlos als Arzt registrieren!" button to open doctor registration form');
		
		test.assertVisible('#form #booking-form', 'Doctor registration form is visible!');
		
		// Set gender on 'Herr'
		casper.click('#gender #gender-2');
		casper.echo("    - Click on the Herr radio button");
		this.capture("regForma.png");
		
		// Fill form elements (First name, Last name, email address, phone number)
		casper.fill('#booking-form', {
			'title': 'TestDr',
			'first_name': 'Test-Dr-Thomas',
			'last_name': 'Test-Dr-Hillard',
			'email': 'testgroup@arzttermine.de',
			'phone': '+ 49 0 157 7737 8290'
		}, false);
	  
		casper.echo("    - In Title field type 'TestDr'");
		casper.echo("    - In First name field type 'Test-Thomas'");
		casper.echo("    - In Last name field type 'Test-Hillard'");
		casper.echo("    - In Email field type 'testgroup@arzttermine.de'");
		casper.echo("    - In phone field type '+ 49 0 157 7737 8290'");
		
		this.capture("registracija.png");
    });
	
	casper.thenClick('#booking-form .button-wrapper button', function() {
		casper.echo("---> CLIK ON 'Registrieren!' BUTTON");
		casper.wait(4000, function() {
		  casper.test.assertDoesntExist('.error', 'Ther is no errors.')  
		});
		casper.wait(4000);
		
		this.capture("RegDoctor.png");
	});

    casper.waitForText('Sie haben sich erfolgreich registriert!', function() {
		is_doctor_registered = true;
		
		test.assertVisible('#booking-form', 'New doctor details form is visible.');
		
		casper.waitForText("Sie haben sich erfolgreich registriert!");
		test.assert(true, "Text 'Sie haben sich erfolgreich registriert!' is displayed");
		
		casper.waitForText("In Kürze wird Sie ein Mitarbeiter persönlich kontaktieren, um mit Ihnen die Details zu klären.");
		test.assert(true, "Text 'In Kürze wird Sie ein Mitarbeiter persönlich kontaktieren, um mit Ihnen die Details zu klären.' is displayed");
		
		casper.waitForText("Nutzen Sie die Zeit bis dahin, um Ihr Profil zu pflegen.");
		test.assert(true, "Text 'Nutzen Sie die Zeit bis dahin, um Ihr Profil zu pflegen.' is displayed");
		
		casper.waitForText("Sie haben sich erfolgreich registriert!");
		test.assert(true, "Text 'Sie haben sich erfolgreich registriert!' is displayed");
				 
		// Fill form elements (Praxisname, Stadt, Mobilnummer)
		casper.fill('#booking-form', {
			'practice_name': 'TestDr',
			'city': 'Berlin',
			'phone_mobile': '+ 49 0 157 7737 8290'
		}, false);
		
		casper.echo("    - In Practice Name field type 'TestPractice'");
		casper.echo("    - In City field type 'Berlin'");
		casper.echo("    - In Phone Mobile field type '+ 49 0 157 7737 8290'");
		
		this.capture("DrDetails1.png");
	});
	
	// Combo name=medical_specialty_id
	casper.then(function(){
		this.click("#booking-form select[name='medical_specialty_id']");
		casper.echo("---> Click on the medical_specialty combo box");
		this.evaluate(function() {
			var form = document.querySelector("#booking-form select[name='medical_specialty_id']");
			form.selectedIndex = 1;
			$(form).change();
			casper.echo("---> In medical_specialty combo, chose first value. Should be 'Zahnarzt'");
		});
		
		this.capture("DrDetails1-combo.png");
	});
	
	
	casper.thenClick('#booking-form .button-wrapper button', function() {
		casper.echo("---> CLIK ON 'Weiter' BUTTON");
	});
	
	casper.waitForText('Ihre Firmenadresse', function() {
		// Fill form elements (Praxisname, Stadt, Mobilnummer)
		casper.fill('#booking-form', {
			'street': 'Test Street',
			'zip': '10179',
			'url': 'https://www.arzttermine.de'
		}, false);
		
		casper.echo("    - In Street field type 'Test Street'");
		casper.echo("    - In Zip field type '10179'");
		casper.echo("    - In URL field type 'https://www.arzttermine.de'");

		casper.waitForText("Grund Ihrer Registrierung");
		test.assert(true, "Text 'Grund Ihrer Registrierung' for radio button is displayed");
		
		casper.waitForText("SEO verbessern");
		test.assert(true, "Text 'SEO verbessern' for radio button is displayed");
		
		casper.waitForText("mehr Bewertungen bei Google und Bewertungsseiten");
		test.assert(true, "Text 'mehr Bewertungen bei Google und Bewertungsseiten' for radio button is displayed");
		
		casper.waitForText("bessere Google Suchergebnisse");
		test.assert(true, "Text 'bessere Google Suchergebnisse' for radio button is displayed");
		
		this.capture("DrDetails2.png");
	});
	
	// Combo name=doctors_count
	casper.then(function(){
		this.click("#booking-form select[name='doctors_count']");
		casper.echo("---> Click on the Doctors count combo box");
		this.evaluate(function() {
			var form = document.querySelector("#booking-form select[name='doctors_count']");
			form.selectedIndex = 2;
			$(form).change();
			casper.echo("---> In Doctors Count combo, chose first value. Should be '2'");
		});
		this.capture("DrDetails2-combo.png");
	});
	
	casper.thenClick('#booking-form .button-wrapper button', function() {
		casper.echo("---> CLIK ON 'Weiter' BUTTON");
	});
  
	casper.waitForText('Herzlichen Glückwunsch,', function() {
		test.assert(true, "Doctor details added successfully!!!");
	});	
	
	
    casper.run(function() {
		test.done();
    });
	
});
