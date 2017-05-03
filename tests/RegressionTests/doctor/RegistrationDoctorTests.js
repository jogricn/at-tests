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
    test.assertVisible('#gender #gender-1', 'Gender "Frau" button is visible!');    
    test.assertVisible('#gender #gender-2', 'Gender "Herr" button is visible!');

    test.assertExists('#booking-form > div:nth-child(2) > input', '"Titel" input field is visible.');
    test.assertExists('#booking-form input[name=first_name]', '"Vorname" input field is visible.');
    test.assertExists('#booking-form input[name=last_name]', '"Nachname" input field is visible.');
    test.assertExists('#booking-form input[name=email]', '"E-Mail" input field is visible.');
    test.assertExists('#booking-form input[name=phone]', '"Telefon" input field is visible.');

    test.assertVisible('#booking-form .button-wrapper button', 'Doctor registration submit button is visible.');
  })

  casper.then(function() {
    test.assertVisible('.already-registered a', 'Login link for already registered doctors is visible!');
  })
  
  // Submit empty form
  casper.then(function() {
    casper.echo('<<< --- Click on the register (submit) button --- >>>');
    casper.click('#booking-form .button-wrapper button'); 
  })

  // Check validation Error
  casper.waitForSelector('.form-element.error', function() {
    test.assertVisible('.form-element.error[data-error-message="Bitte geben Sie Ihren Vornamen ein."]', 'Vorname Validation ERROR is visible!!!')
  })

  casper.run(function() {
    test.done();
  });
});
