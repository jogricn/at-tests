require("./../../../helper.js");
require('./../../helper_methods/patient');
require("./../../helper_methods/HomePageElementsSelectors.js");

// ------------------------------------------------------------------------------------
//
//                  Footer - Information (Informationen) section links
//
// ------------------------------------------------------------------------------------


casper.test.begin("Footer - Information (Informationen) section - Medizinische Fachgebiete link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #discover a[href="/fachgebiete"]');
	casper.echo("In footer, 'Informationen' section, click on the Medizinische Fachgebiete link");
		
	casper.waitForSelector('.subnavigation ul li.active a[href="/fachgebiete"]', function() {
		this.echo("Medizinische Fachgebiete link is active in top subnavigation")
		test.assertUrlMatch("https://www.arzttermine.de/fachgebiete", 'New URL is ok');
		test.assertTitle("Fachgebiete | Arzttermine.de", 
		"Medizinische Fachgebiete page title is OK!");
	});
	
	// Check top subnavigation items
	casper.then(function() {
		test.assertVisible('.subnavigation ul li a[href="/empfehlungen"]', 'Empfehlungen für Ärzte link is visible in top subnavigation');
		test.assertVisible('.subnavigation ul li a[href="/staedte"]', 'Städte link is visible in left side navigation');
		
		// .active 
		test.assertVisible('.subnavigation ul li.active a[href="/fachgebiete"]', 'Medizinische Fachgebiete link is active in top subnavigation');
		
    });
	
	// Check content of the page
	casper.then(function() {
		var titleText = this.evaluate(function() {
			return document.querySelector('#intro h1').textContent;
		});
		
		test.assertEquals(titleText, "Medizinische Fachgebiete", "Page intro title is OK.");
		
		//casper.waitForText("Datenschutzerklärung");
		casper.waitForText("Wer krank ist, geht zum Arzt. Doch welcher Arzt ist denn nun der richtige? Es gibt viele verschiedene Fachrichtungen, auf die sich Ärzte spezialisieren und je nach Beschwerden oder Anliegen kann der Facharzt Ihnen besser helfen, als ein anderer. Gerne möchten wir Ihnen die einzelnen Fachrichtungen näher bringen, damit Sie genau wissen, welcher Facharzt in Ihrer Nähe auf Ihre Bedürfnisse und Beschwerden spezialisiert ist.");
	});
	
	// Fachgebiete section
	casper.then(function() {
		test.assertVisible('#featured-specialties', 'Fachgebiete section is visible');
		
		test.assertVisible('#featured-specialties .featured-specialty .image-wrapper a[href="/fachgebiete/urologie"] img[title="Fachgebiet_Urologie"]', 'Fachgebiet Urologie image link is visible in Fachgebiete section');		
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


casper.test.begin("Footer - Information (Informationen) section - Magazin link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #discover a[href="/magazin/"]');
	casper.echo("In footer, 'Informationen' section, click on the Magazin link");
		
	casper.waitForSelector('#td-outer-wrap', function() {
		this.echo("Magazin page template wraper is displayed");
		test.assertUrlMatch("https://www.arzttermine.de/magazin/", 'New URL is ok');
		test.assertTitle("Startseite - Arzttermine.de Magazin", 
		"Magazin page title is OK!");
	});
	
	// Check top navigation items
	casper.then(function() {
		test.assertVisible('#td-header-menu .menu-main-menu-container .menu-item a[href="/magazin/"]', 'Startseite link is visible top navigation');
	
    });
	
	// Check content of the page
	casper.then(function() {
		
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

    casper.run(function() {
		test.done();
    });	
});


casper.test.begin("Footer - Information (Informationen) section - News link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #discover a[href="/news"]');
	casper.echo("In footer, 'Informationen' section, click on the News link");
		
	casper.waitForSelector('#content .blog', function() {
		this.echo("Blog container is displayed on News page");
		test.assertUrlMatch("https://www.arzttermine.de/news", 'New URL is ok');
		test.assertTitle("News | Arzttermine.de", 
		"News page title is OK!");
	});
	
	// Check top subnavigation items
	casper.then(function() {
		test.assertVisible('.navi.sideNavigation a[href="/agb"]', 'AGB link is visible in left side navigation');
		// .active 
		test.assertVisible('.navi.sideNavigation .active a[href="/news"]', 'News link is active in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/jobs"]', 'Jobs link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/presse"]', 'Presse link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/kontakt"]', 'Kontakt link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/impressum"]', 'Impressum link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation a[href="/datenschutz"]', 'Datenschutz link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/magazin/"]', 'Magazin link is visible in left side navigation');	
    });
	
	// Check content of the page
	casper.then(function() {
		var titleText = this.evaluate(function() {
			return document.querySelector('.blog .blogpost.content h2.header a').textContent;
		});
		
		test.assertEquals(titleText, "Gelbe-Seiten-Verlag übernimmt Arzttermine.de", "Blog post title link text is OK.");
	});
	
	casper.then(function() {
		var dateText = this.evaluate(function() {
			return document.querySelector('.blog .blogpost.content .meta .published_at').textContent;
		});
		
		this.echo("Blog post date is : " + dateText);
		test.assertVisible('.blog .blogpost.content .meta .published_at', 'Published at label is displayed');
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

    casper.run(function() {
		test.done();
    });	
});


casper.test.begin("Footer - Information (Informationen) section - Pressebereich link tests", function suite(test){

    casper.start("http://www.arzttermine.de");
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
	
	casper.thenClick('footer #discover a[href="/presse"]');
	casper.echo("In footer, 'Informationen' section, click on the Pressebereich link");
		
	casper.waitForSelector('.navi.sideNavigation .active a[href="/presse"]', function() {
		this.echo("Blog container is displayed on News page");
		test.assertUrlMatch("https://www.arzttermine.de/presse", 'New URL is ok');
		test.assertTitle("Pressebereich | Arzttermine.de", 
		"Pressebereich page title is OK!");
	});
	
	// Check top subnavigation items
	casper.then(function() {
		test.assertVisible('.navi.sideNavigation a[href="/agb"]', 'AGB link is visible in left side navigation');
		 
		test.assertVisible('.navi.sideNavigation a[href="/news"]', 'News link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/jobs"]', 'Jobs link is visible in left side navigation');
		// .active
		test.assertVisible('.navi.sideNavigation .active a[href="/presse"]', 'Presse link is active in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/kontakt"]', 'Kontakt link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/impressum"]', 'Impressum link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation a[href="/datenschutz"]', 'Datenschutz link is visible in left side navigation');
		test.assertVisible('.navi.sideNavigation  a[href="/magazin/"]', 'Magazin link is visible in left side navigation');	
    });
	
	// Check content of the page
	casper.then(function() {
		var titleText = this.evaluate(function() {
			return document.querySelector('.container #content h1').textContent;
		});
		
		test.assertEquals(titleText, "Presse", "Page content title text is OK. ");
	});
	
	casper.then(function() {
		var subtitleText = this.evaluate(function() {
			return document.querySelector('#content h2').textContent;
		});
		
		test.assertEquals(subtitleText, "Downloads", "Presse page content subtitle text is OK.");
	});
	
	casper.then(function() {
		casper.waitForText("Kontakt Unternehmen");
		casper.waitForText("Thomas Hillard, Geschäftsführer");
		casper.waitForText("Simon Tietz, Geschäfstführer");
		casper.waitForText("Docbiz GmbH");
		casper.waitForText("Rosenthaler Str. 51");
		casper.waitForText("10178 Berlin");
		casper.waitForText("info@arzttermine.de");
		casper.waitForText("www.arzttermine.de");
	});
	
	// TODO: Check download links
	casper.then(function() {
		casper.waitForText("Arzttermine.de Logo inkl. Claim");
		casper.waitForText("Unternehmensprofil als PDF");
		casper.waitForText("Unternehmensprofil als Word Dokument");
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

    casper.run(function() {
		test.done();
    });	
});

