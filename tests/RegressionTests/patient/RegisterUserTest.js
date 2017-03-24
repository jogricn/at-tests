require("./helper.js");

casper.test.begin("Register new user tests", function suite(test){
  casper.start("http://arzttermine.de");

  casper.then(function(){
    this.click("#patient-reg-top a.quick-login");
    this.clickLabel('Registrieren Sie sich hier kostenlos!');
  });

  casper.then(function() {
    // Click on Terms check box to select it
    this.click('#terms_id');
    // Fill registration form
    this.fill('#register_form', {
      'first_name': 'TestNebojsa',
      'last_name': 'TestJogric',
      'email': 'nebojsajogric+arztterminetest@gmail.com',
      'phone': '+381604536787',
      'password': 'nesa123456'
    }, true);

    //#submit_button
  })

  casper.then(function() {
    var registredURL = 'https://www.arzttermine.de/patienten/do_patienten_registrieren';
    this.test.assert(this.getCurrentUrl() === registredURL, 'Registred page url is the expected one.');
    test.assertTextExists('Sie haben sich erfolgreich registriert!', 'You have successfully registered');
    test.assertTextExists('Um Ihr Konto zu aktivieren, klicken Sie bitte auf den Link in der Bestätigungs-E-Mail.', 'message');
  })

  casper.run(function() {
    test.done();
  });
});