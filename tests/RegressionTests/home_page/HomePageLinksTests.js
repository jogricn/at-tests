require("./../../../helper.js");
require('./../../helper_methods/patient');
require("./../../helper_methods/HomePageElementsSelectors.js");

var is_doctor_registered = false;

casper.test.begin("Footer - Legal (Rechtliches) section - AGB link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #legal a[href="/agb"]');
	casper.echo("In footer, 'Rechtliches' section, click on the AGB link");
	
	casper.waitForText("Allgemeine Nutzungsbedingungen der Internetplattform www.arzttermine.de", function() {
		this.echo("Title 'Allgemeine Nutzungsbedingungen der Internetplattform www.arzttermine.de' is displayed on page")
		test.assertUrlMatch("https://www.arzttermine.de/agb", 'New URL is ok');
	});
	
	// Check left side navigation items
	casper.then(function() {
		test.assertVisible('.navi.sideNavigation .active a[href="/agb"]', 'AGB link is active in left side navigation');
		
		test.assertVisible('.navi.sideNavigation  a[href="/news"]', 'News link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/jobs"]', 'Jobs link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/presse"]', 'Presse link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/kontakt"]', 'Kontakt link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/impressum"]', 'Impressum link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/datenschutz"]', 'Datenschutz link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/magazin/"]', 'Magazin link is visible in left side navigation');		
    });
	
	// Check content ofthe page
	casper.then(function() {
		
	});
	
	//Check HTML elements of the Site Logo
	casper.then(function() {
		casper.checkHeaderLogoElements();
	});
	
	// Check header telephne number link
    casper.then(function() {
		test.assertVisible(casper.HEADER_TEL_LINK, 'Telephone link is visible on the screan!')
    });
	
	// Check footer elements
    casper.then(function() {
		casper.checkFooterElements();
    });

	// Check "Die letzten News" section
    casper.then(function() {
		test.assertVisible('.section.blogpost-last #box_blogpost-last .box_gfx_content .alternate a.colored', '"Die letzten News" blog post section, with links, is displayed.');	
		
    })

    casper.run(function() {
		test.done();
    });	
});


casper.test.begin("Footer - Legal (Rechtliches) section - Impressum link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #legal a[href="/impressum"]');
	casper.echo("In footer, 'Rechtliches' section, click on the Impressum link");
		
	casper.waitForSelector('.navi.sideNavigation  .active a[href="/impressum"]', function() {
		this.echo("Impressum link is active in left side navigation")
		test.assertUrlMatch("https://www.arzttermine.de/impressum", 'New URL is ok');
		test.assertTitle("Impressum | Arzttermine.de", 
		"Impressum page title is OK!");
	});
	
	// Check left side navigation items
	casper.then(function() {
		test.assertVisible('.navi.sideNavigation a[href="/agb"]', 'AGB link is active in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/news"]', 'News link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/jobs"]', 'Jobs link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/presse"]', 'Presse link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/kontakt"]', 'Kontakt link is visible in left side navigation');
		// .active 
		test.assertVisible('.navi.sideNavigation  .active a[href="/impressum"]', 'Impressum link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/datenschutz"]', 'Datenschutz link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/magazin/"]', 'Magazin link is visible in left side navigation');		
    });
	
	// Check content ofthe page
	casper.then(function() {
		casper.waitForText("Sitz der Gesellschaft");
		casper.waitForText("Rosenthaler Str. 51");
		casper.waitForText("10178 Berlin, Deutschland");
		test.assert(true, "'Sitz der Gesellschaft' with value 'Rosenthaler Str. 51, 10178 Berlin, Deutschland' is displayed on the screen");
		
		casper.waitForText("Geschäftsführer");
		casper.waitForText("Thomas Hillard");
		casper.waitForText("Simon Tietz");
		test.assert(true, "'Geschäftsführer' with value 'Thomas Hillard /n Simon Tietz' is displayed on the screen");
		
		casper.waitForText("USt.-IdNr");
		casper.waitForText("DE271206218");
		test.assert(true, "'USt.-IdNr' with value 'DE271206218' is displayed on the screen");
		
		casper.waitForText("HRB");
		casper.waitForText("126290 Amtsgericht Charlottenburg");
		test.assert(true, "'HRB' with value '126290 Amtsgericht Charlottenburg' is displayed on the screen");
		
		casper.waitForText("Telefon");
		casper.waitForText("+49 (0)30 6098402-10");
		test.assert(true, "'Telefon' with value '+49 (0)30 6098402-10' is displayed on the screen");
		
		casper.waitForText("Fax");
		casper.waitForText("+49 (0)30 6098402-99");
		test.assert(true, "'Fax' with value '+49 (0)30 6098402-99' is displayed on the screen");
		
		casper.waitForText("E-Mail");
		casper.waitForText("info@arzttermine.de");
		test.assert(true, "'E-Mail' with value 'info@arzttermine.de' is displayed on the screen");
	});
	
	//Check HTML elements of the Site Logo
	casper.then(function() {
		//casper.checkHeaderLogoElements();
	});
	
	// Check header telephne number link
    casper.then(function() {
		//test.assertVisible(casper.HEADER_TEL_LINK, 'Telephone link is visible on the screan!')
    });
	
	// Check footer elements
    casper.then(function() {
		//casper.checkFooterElements();
    });

	// Check "Die letzten News" section
    casper.then(function() {
		//test.assertVisible('.section.blogpost-last #box_blogpost-last .box_gfx_content .alternate a.colored', '"Die letzten News" blog post section, with links, is displayed.');	
		
    })

    casper.run(function() {
		test.done();
    });	
});



casper.test.begin("Footer - Legal (Rechtliches) section - Datenschutz link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #legal a[href="/datenschutz"]');
	casper.echo("In footer, 'Rechtliches' section, click on the Datenschutz link");
		
	casper.waitForSelector('.navi.sideNavigation  .active a[href="/datenschutz"]', function() {
		this.echo("Datenschutz link is active in left side navigation")
		test.assertUrlMatch("https://www.arzttermine.de/datenschutz", 'New URL is ok');
		test.assertTitle("Datenschutz | Arzttermine.de", 
		"Datenschutz page title is OK!");
	});
	
	// Check left side navigation items
	casper.then(function() {
		test.assertVisible('.navi.sideNavigation a[href="/agb"]', 'AGB link is active in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/news"]', 'News link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/jobs"]', 'Jobs link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/presse"]', 'Presse link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/kontakt"]', 'Kontakt link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/impressum"]', 'Impressum link is visible in left side navigation');
		
		// .active 
		test.assertVisible('.navi.sideNavigation  .active a[href="/datenschutz"]', 'Datenschutz link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/magazin/"]', 'Magazin link is visible in left side navigation');		
    });
	
	// Check content ofthe page
	casper.then(function() {
		//
		casper.waitForText("Datenschutzerklärung");
		casper.waitForText("Mit dieser Datenschutzerklärung möchte Sie die docbiz GmbH, Rosenthaler Str. 51, 10178 Berlin – nachfolgend „docbiz“ - informieren, welche Daten bei dem Besuch und der Nutzung der Webseite https://www.arzttermine.de von Ihnen erhoben und zu welchem Zweck diese genutzt werden.");
		
		//
		casper.waitForText("Welche Daten werden erhoben und wann werden sie wieder gelöscht?");
		casper.waitForText("Wir erheben ausschließlich die nachfolgend näher bezeichneten Daten:");
		casper.waitForText("1. Daten der Nutzung");
		casper.waitForText("2. Cookies");
		casper.waitForText("3. Websiteanalyse");
		casper.waitForText("http://tools.google.com/dlpage/gaoptout?hl=de");
		casper.waitForText("4. Technische Protokolldaten");
		casper.waitForText("Wie werden die eingegebenen Daten verarbeitet?");
		casper.waitForText("An wen werden die Daten weitergegeben?");
	});
	
	//Check HTML elements of the Site Logo
	casper.then(function() {
		//casper.checkHeaderLogoElements();
	});
	
	// Check header telephne number link
    casper.then(function() {
		//test.assertVisible(casper.HEADER_TEL_LINK, 'Telephone link is visible on the screan!')
    });
	
	// Check footer elements
    casper.then(function() {
		//casper.checkFooterElements();
    });

	// Check "Die letzten News" section
    casper.then(function() {
		//test.assertVisible('.section.blogpost-last #box_blogpost-last .box_gfx_content .alternate a.colored', '"Die letzten News" blog post section, with links, is displayed.');	
		
    })

    casper.run(function() {
		test.done();
    });	
});
