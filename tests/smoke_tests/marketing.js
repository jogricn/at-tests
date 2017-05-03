require("./../../helper.js");

casper.test.begin("Praxis Marketing Page Tests", function suite(test){

  //casper.start("http://praxismarketing.arzttermine.de", function(){
  casper.start().viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height).thenOpen("http://praxismarketing.arzttermine.de", function(){
    //casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
    casper.wait(5000);
    //casper.capture('scrsht.png');
  });
  //casper.wait(5000);
  // Site need to be redirected
  // Check whether the changed address
  casper.then(function checkRedirection() {
    var url = "https://www.arzttermine.de/lp/praxis-marketing/praxis-marketing.html";
    this.test.assert(this.getCurrentUrl() === url, 'Redirection url is the expected one.' + this.getCurrentUrl());
this.test.assertTitle("Arzttermine.de Praxis Marketing", "Marketing page title ok.");
    
  });

  casper.then(function checkElementsVisibility() {
    test.assertExists("#intro div.cta-box a", "'Jetzt kostenlos als Arzt registrieren!' button exist!");
  });

  casper.run(function() {
    test.done();
  });
});
