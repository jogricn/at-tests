require("./../../../helper.js");

casper.test.begin("Register doctor - empty form - Validation test", function suite(test){
  casper.start("http://arzttermine.de");
  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  casper.then(function() {
    test.assertExists('nav > ul > li:nth-child(2) > a', '"Als Arzt registrieren" button exists')
    // Click on "Jetzt kostenlos als Arzt registrieren!" button to pen doctor registration form  
    casper.click('nav > ul > li:nth-child(2) > a');

    casper.waitForSelector('#intro > div > div.cta-box > div > a', function() {
    	test.assertUrlMatch("http://www.arzttermine.de/lp/praxis-marketing/praxis-marketing.html", 'New URL is ok');
    });
  })

  // Chneck registration form elements
  casper.thenClick('#intro > div > div.cta-box > div > a', function() {
    test.assertVisible('#form', 'Doctor registration form is visible!');    
    test.assertVisible('#gender-1', 'Gender "Frau" button is visible!');    
    test.assertVisible('#gender-2', 'Gender "Herr" button is visible!');

    test.assertExists('#booking-form > div:nth-child(2) > input', '"Titel" input field is visible.');
    // test.assertExists('#booking-form > div:nth-child(3) > input', '"Vorname" input field is visible.');
    // test.assertExists('#booking-form > div:nth-child(4) > input', '"Nachname" input field is visible.');
    // test.assertExists('#booking-form > div:nth-child(5) > input', '"E-Mail" input field is visible.');
    // test.assertExists('#booking-form > div:nth-child(6) > input', '"Telefon" input field is visible.');

    test.assertVisible('.right-align > button:nth-child(1)', 'Doctor registration submit button is visible.');
  })

  casper.then(function() {
    test.assertVisible('.already-registered > a:nth-child(1)', 'Login link for alredy registered doctors is visible!');
  })
  
  // Submit empty form
  casper.then(function() {
    casper.echo('<<< --- Click on register button --- >>>');
    casper.click('.right-align > button:nth-child(1)'); 
  })

  // Check validation Error
  casper.waitForSelector('.alert-wrapper > div', function() {
    test.assertVisible('.alert-wrapper > div', 'Validation ERROR is visible!!!')
  })

  casper.run(function() {
    test.done();
  });
});