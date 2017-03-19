require("./../../helper.js");

casper.test.begin("Praxis Marketing Page Tests", function suite(test){

  casper.start("http://praxismarketing.arzttermine.de", function(){
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
    test.assertTitle("Arzttermine.de Praxis Marketing", "Marketing page title ok.");
  });

  // Site need to be redirected
  // Check whether the changed address
  casper.then(function checkRedirection() {
    var url = "http://www.arzttermine.de/lp/praxis-marketing/praxis-marketing.html";
    this.test.assert(this.getCurrentUrl() === url, 'Redirection url is the expected one.');
  });

  casper.then(function checkElementsVisibility() {
    test.assertExists("div.cta.heavy a", "'Jetzt kostenlos als Arzt registrieren!' button exist!");
  });

  casper.run(function() {
    test.done();
  });
});