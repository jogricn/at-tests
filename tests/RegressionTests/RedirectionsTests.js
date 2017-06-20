require("./../../helper.js");

casper.test.begin("Praxisoptimierung Page Tests", function suite(test){

    casper.start().viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height).thenOpen("http://praxisoptimierung.arzttermine.de/", function(){
        casper.wait(5000);
    });
    
    // Site need to be redirected
    // Check whether the changed address
    casper.then(function checkRedirection() {
        var url = "https://arzttermine.de/praxisoptimierung";
        this.test.assert(this.getCurrentUrl() === url, 'Redirection url is the expected one : ' + this.getCurrentUrl());
	    this.test.assertTitle("Arzttermine.de Praxisoptimierung", "Praxisoptimierung page title ok.");
    
    });
  
	casper.waitForText('Wir helfen Ihnen, die Abläufe in Ihrer Praxis zu optimieren', function() {
		//casper.waitForText("Sie haben sich erfolgreich registriert!");
		test.assert(true, "Text 'Wir helfen Ihnen, die Abläufe in Ihrer Praxis zu optimieren' is displayed in h2");
	});

    casper.run(function() {
		test.done();
    });
});
