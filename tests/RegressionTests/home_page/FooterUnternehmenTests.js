require("./../../../helper.js");
require('./../../helper_methods/patient');
require("./../../helper_methods/HomePageElementsSelectors.js");


// ------------------------------------------------------------------------------------
//  Description:
//                  
//
// ------------------------------------------------------------------------------------


casper.test.begin("Footer - Company (Unternehmen) section - Kontakt link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #Company a[href="/kontakt"]');
	casper.echo("In footer, 'Unternehmen' section, click on the Kontakt link");
	
	casper.waitForText("Nehmen Sie Kontakt zu uns auf!", function() {
		this.echo("Title 'Nehmen Sie Kontakt zu uns auf!' is displayed on the top of the page")
		test.assertUrlMatch("https://www.arzttermine.de/kontakt", 'New URL is ok');
	});
	
	// Check left side navigation items
	casper.then(function() {
		test.assertVisible('.navi.sideNavigation a[href="/agb"]', 'AGB link is active in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/news"]', 'News link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/jobs"]', 'Jobs link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/presse"]', 'Presse link is visible in left side navigation');
		// .active 
		test.assertVisible('.navi.sideNavigation  .active a[href="/kontakt"]', 'Kontakt link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/impressum"]', 'Impressum link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/datenschutz"]', 'Datenschutz link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/magazin/"]', 'Magazin link is visible in left side navigation');		
    });
	
	// Check content of the page
	casper.then(function() {
		test.assertVisible('#content #contact .form_container form[name="edit"]', 'Contact form is visible ');
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


casper.test.begin("Footer - Company (Unternehmen) section - Jobs link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #Company a[href="/jobs"]');
	casper.echo("In footer, 'Unternehmen' section, click on the Jobs link");
	
	casper.waitForText("Wir suchen Dich!", function() {
		this.echo("Title 'Wir suchen Dich!' is displayed on the top of the page")
		test.assertUrlMatch("https://www.arzttermine.de/jobs", 'New URL is ok');
	});
	
	// Check left side navigation items
	casper.then(function() {
		// .active 
		test.assertVisible('.subnavigation ul li.active a[href="/jobs"]', 'Home link is active in top subnavigation');
		test.assertVisible('.subnavigation ul li a[href="/jobs/unser-team"]', 'Unser Team link is visible in top subnavigation');
		
		test.assertVisible('.subnavigation ul li a[href="/jobs/ueber-uns"]', 'Über Uns link is visible in top subnavigation');
		
		test.assertVisible('.subnavigation ul li a[href="/jobs/jobs-auswahl"]', 'Jobs link is visible in top subnavigation');
		
		test.assertVisible('.subnavigation ul li a[href="/jobs/unsere-benefits"]', 'Unsere Benefits link is visible in top subnavigation');
		
		test.assertVisible('.subnavigation ul li a[href="/jobs/arbeiten-bei-arzttermine"]', 'Arbeiten bei Arzttermine.de link is visible in top subnavigation');
		
    });
	
	// Check content of the page
	casper.then(function() {
		test.assertVisible('#intro', 'Contact form is visible ');
		
		casper.waitForText("jobs@arzttermine.de");
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

    casper.run(function() {
		test.done();
    });	
});


casper.test.begin("Footer - Company (Unternehmen) section - Als Arzt registrieren link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #Company a[href="/lp/praxis-marketing/praxis-marketing.html"]');
	
	casper.echo("In footer, 'Unternehmen' section, click on the Als Arzt registrieren link");
	
	casper.waitForSelector("#how-it-works", function() {
		this.echo("how-it-works section is displayed on the the page")
		test.assertUrlMatch("https://www.arzttermine.de/lp/praxis-marketing/praxis-marketing.html", 'New URL is ok');
		test.assertTitle("Arzttermine.de Praxis Marketing", 
		"Als Arzt registrieren page title is OK!");
	});
	
	// Check left side navigation items
	casper.then(function() {
		// .active 
		test.assertVisible('.container.nav-wrapper nav a[href="#anch-home"]', 'Home link is visible in top navigation');
		test.assertVisible('.container.nav-wrapper nav a[href="#anch-how-it-works"]', 'Link to how-it-works section is visible in top navigation');
		
		test.assertVisible('.container.nav-wrapper nav a[href="#anch-advantages"]', 'Link to advantages section is visible in top navigation');
		
		test.assertVisible('.container.nav-wrapper nav a[href="#anch-your-free-profile"]', 'Link to your-free-profile section is visible in top navigation');
		
		test.assertVisible('.container.nav-wrapper nav a[href="#anch-what-others-say"]', 'Link to what-others-say is visible in top navigation');
    });
	
	// Check content of the page
	casper.then(function() {
		test.assertVisible('#intro a[href="http://www.arzttermine.de/aerzte/registrierung"]', 'Aerzte registrierung button is visible in intro section');
		
		test.assertVisible('#how-it-works a[href="http://www.arzttermine.de/aerzte/registrierung"]', 'Aerzte registrierung button is visible in how-it-works section');
		
		test.assertVisible('#advantages a[href="http://www.arzttermine.de/aerzte/registrierung"]', 'Aerzte registrierung button is visible in advantages section');
		
		test.assertVisible('#your-free-profile a[href="http://www.arzttermine.de/aerzte/registrierung"]', 'Aerzte registrierung button is visible in your-free-profile section');
		
		test.assertVisible('#what-others-say a[href="http://www.arzttermine.de/aerzte/registrierung"]', 'Aerzte registrierung button is visible in what-others-say section');
		
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

    casper.run(function() {
		test.done();
    });	
});


casper.test.begin("Footer - Company (Unternehmen) section - Praxisoptimierung link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #Company a[href="/praxisoptimierung"]');
	
	casper.echo("In footer, 'Unternehmen' section, click on the Praxisoptimierung link");
	
	casper.waitForSelector('header.box.leading-border.with-triangle a[href="#form"]', function() {
		this.echo("Der schnelle Weg.. box with link to kontakt section is displayed on the the page")
		test.assertUrlMatch("https://www.arzttermine.de/praxisoptimierung", 'New URL is ok');
		test.assertTitle("Arzttermine.de Praxisoptimierung", 
		"Praxisoptimierung page title is OK!");
	});
	
	//'Unsere Lösungen' section links
	casper.then(function() {
		// .active 
		test.assertVisible('#solutions .clearfix.list-unstyled.row .box-white a[href="/praxisoptimierung/atsearch"]', 'At Search link is visible in solution box');

		test.assertVisible('#solutions a[href="/praxisoptimierung/atweb"]', 'At Web link is visible in solution box');
		
		test.assertVisible('#solutions a[href="/praxisoptimierung/atrep"]', 'At Rep link is visible in solution box');
		
		test.assertVisible('#solutions a[href="/lp/praxis-marketing/praxis-marketing.html"]', 'At Patient link is visible in solution box');
		
		test.assertVisible('#solutions a[href="/praxisoptimierung/atcalendar"]', 'At Calendar link is visible in solution box ');
		
		test.assertVisible('#solutions a[href="/praxisoptimierung/atcall"]', 'At Call link is visible in solution box ');
    });
	
	// Check form content
	casper.then(function() {
		test.assertVisible('#form form[name="edit"] .checkbox input[name="atsearch"]', 'AtSearch checkbox is visible on the form');
		test.assertVisible('#form form[name="edit"] .checkbox input[name="atweb"]', 'AtWeb checkbox field is visible on the form');
		test.assertVisible('#form form[name="edit"] .checkbox input[name="atrep"]', 'AtRep checkbox field is visible on the form');
		test.assertVisible('#form form[name="edit"] .checkbox input[name="atpatient"]', 'AtPatient checkbox field is visible on the form');
		test.assertVisible('#form form[name="edit"] .checkbox input[name="atcalendar"]', 'AtCalendar checkbox field is visible on the form');
		test.assertVisible('#form form[name="edit"] .checkbox input[name="atcall"]', 'AtCall checkbox field is visible on the form');

		test.assertVisible('#form form[name="edit"] #form-name', 'Ansprechpartner input field is visible on the form');
		test.assertVisible('#form form[name="edit"] #form-phone', 'Telefonnummer input field is visible on the form');
		test.assertVisible('#form form[name="edit"] #form-praxis', 'Praxisname input field is visible on the form');
		test.assertVisible('#form form[name="edit"] #form-email', 'E-Mail input field is visible on the form');
		test.assertVisible('#form form[name="edit"] button#submit', 'Wir rufen Sie zurück! submit button is visible on the form');
		
		test.assertVisible('#form form[name="edit"] a[href="tel:030609840272"]', 'Telefonnummer 030609840272 is visible in the form');
	});
	
    casper.run(function() {
		test.done();
    });	
});

casper.test.begin("Footer - Company (Unternehmen) section - Ärzte Magazin link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #Company a[href="/aerzte-magazin"]');
	casper.echo("In footer, 'Unternehmen' section, click on the Ärzte Magazin link");
	casper.wait(2000);
	casper.waitForText("Zu viele Terminabsagen - Wie bringen Sie Ihre Patienten dazu, Termine einzuhalten?", function() {
		this.echo("General box title 'Zu viele Terminabsagen - Wie bringen Sie Ihre Patienten dazu, Termine einzuhalten?' is visible on the page")
		test.assertUrlMatch("https://www.arzttermine.de/aerzte-magazin", 'New URL is ok');
	});
	
	// Check left side navigation items
	casper.then(function() {
		// .active 
		test.assertVisible('.subnavigation ul li.active a[href="/aerzte-magazin/"]', 'Home link is active in top subnavigation');
				
    });
	
	// Check content of the page
	casper.then(function() {
		test.assertVisible('#intro', 'Intro section is visible ');
		test.assertVisible('#general', 'General section is visible ');
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

    casper.run(function() {
		test.done();
    });	
});


casper.test.begin("Footer - Company (Unternehmen) section - Patienten Informationen link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #Company a[href="/lp/patienten/so-funktioniert-arzttermine/"]');
	casper.echo("In footer, 'Unternehmen' section, click on the Patienten Informationen link");
	
	
	casper.waitForSelector(".landingpage.specialpage.patientenpage", function() {
		this.echo("The appropriate class assigned to body element - landingpage.specialpage.patientenpage")
		test.assertUrlMatch("https://www.arzttermine.de/lp/patienten/so-funktioniert-arzttermine/", 'New URL is OK');
	});

	// Check content of the page
	casper.then(function() {
		
		test.assertVisible('.info a[href="http://www.arzttermine.de/?utm_source=patientPage_jetzt-ausprobieren"]', 'jetzt ausprobieren button with the appropriate link is visible  in .info section ');
		
		test.assertVisible('.info a[href="http://www.arzttermine.de/?utm_source=patientPage_arzt-finden"]', 'Arzt in der Nähe finden button with the appropriate link is visible  in .info section ');
		
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