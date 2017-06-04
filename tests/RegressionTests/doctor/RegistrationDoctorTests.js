require("./../../../helper.js");

casper.test.begin("Register doctor - empty form - Validation test", function suite(test){
    casper.start("http://arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

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
	  
		// Fill form elements (First name, Last name, email address, phone number)
		casper.fill('#booking-form', {
			'#booking-form > div:nth-child(2) > input': 'TestDr',
			'form[first_name]': 'Test-Thomas',
			'form[last_name]': 'Test-Hillard',
			'form[email]': 'testgroup@arzttermine.de',
			'form[phone]': '+ 49 0 157 7737 8290'
		}, false);
	  
		casper.echo("    - In Title field type 'TestDr'");
		casper.echo("    - In First name field type 'Test-Thomas'");
		casper.echo("    - In Last name field type 'Test-Hillard'");
		casper.echo("    - In Email field type 'testgroup@arzttermine.de'");
		casper.echo("    - In phone field type '+ 49 0 157 7737 8290'");
		
		casper.click('#booking-form .button-wrapper button');
		casper.echo("---> CLIK ON 'Registrieren!' BUTTON");
		casper.wait(3000, function() {
		  casper.test.assertDoesntExist('.error', 'Ther is no errors.')  
		});
	
    });

    casper.waitForText('Das sind die nächsten Schritte', function() {
		test.assertVisible('#booking-confirmation', 'Booking confirmation form is visible.')
				
	});
  
  casper.run(function() {
    test.done();
  });
});
