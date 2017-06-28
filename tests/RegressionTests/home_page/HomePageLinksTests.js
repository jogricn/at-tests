require("./../../../helper.js");
require('./../../helper_methods/patient');
require("./../../helper_methods/HomePageElementsSelectors.js");


// ------------------------------------------------------------------------------------
//
//                  Footer - Legal (Rechtliches) section links
//
// ------------------------------------------------------------------------------------

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


// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
//
//                  Footer - Information (Informationen) section links
//
// ------------------------------------------------------------------------------------
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

