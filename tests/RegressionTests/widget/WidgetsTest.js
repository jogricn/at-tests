require("./../../../helper.js");

var TEST_SITE_URL = "http://www.arzttermine.de";

var WIDGETS_URLS = [["Arzt Atlas",              "/w/arztatlas-widget/arzt/gkv?u=3820&l=3079#arzt-atlas.de"], 
                    ["Chirurgie Portal",        "/w/arztatlas-widget/arzt/gkv?u=8&l=2#chirurgie-portal.de"],
                    ["Portal der Frauen",       "/w/arztatlas-widget/arzt/gkv?u=8&l=2#portal-der-frauen.de"],
                    ["Portzal der Zahnmedicin", "/w/arztatlas-widget/arzt/gkv?u=8&l=2#portal-der-zahnmedizin.de"],
                    ["Stiftung Gesundheit",     "/w/stiftung-gesundheit-widget/arzt/gkv?u=8&l=2"],
                    ["Mux",                     "/w/mux-widget/arzt/gkv?u=8&l=2"],
                    ["Gelbeseiten",             "/w/gs-widget/arzt/gkv?u=8&l=2"],
                    ["Netdoktor",               "/w/netdoktor-widget/arzt/gkv?u=8&l=2"],
                    ["Das Telefonbuch",         "/w/das-telefonbuch-widget/arzt/gkv?u=8&l=2"]];


// Get element text
function getElementText(selector) {
  var html_elements = casper.fetchText(selector)
  //document.querySelectorAll('.mux_doctor_info .info .name');
  //casper.echo('Num of html_elements: ' + html_elements.length)
  return html_elements;
}


function checkMainWidgetElements(currentWidgetNameString, currentWidgetUrlString) {
  
  casper.test.assert(true, currentWidgetNameString  + ' widget is loaded!');

  var filename = currentWidgetNameString + '.png';
  casper.capture(filename);

  //var currentWidgetUrl = casper.getCurrentUrl();
  //if (currentWidgetUrl == currentWidgetUrlString) {
  //   casper.test.assert(true, currentWidgetNameString + ' widget URL is OK');
  //} else {
  //   casper.echo('Current URL is: ' + currentWidgetUrl + ' , but should  be: '+  currentWidgetUrlString);
 //    casper.test.assert(false, currentWidgetNameString + ' widget URL is NOT OK');
  //}

  casper.test.assertVisible('.mux_doctor_info .info ', 'Dr. info element is visible.');
  casper.test.assertVisible('.mux_doctor_info .gfx img', 'Dr. image element is visible.');

  var doctorName = getElementText('.mux_doctor_info .info .name');
  casper.echo('Doctor name :' + doctorName + ' is displayed in info panel');
  var doctorSpecialties = getElementText('.mux_doctor_info .info .medical-specialties');
  casper.echo('Doctor Medical specialties :' + doctorSpecialties + ' is displayed in info panel');

  casper.test.assertVisible('.provider-list .calendar-container', 'Calendar is visible.');
  casper.test.assertVisible('.provider-list .header-next-link #next-link', 'Nächste Woche (>) link is visible.');
  
  //casper.test.assertVisible('.mux_doctor_info .info .medical-specialties', 'Dr. info element is visible.');
  casper.test.assertVisible('.mux_appointment_times .times-container', 'Calendar is visible.');

  //casper.getElementInfo('.times-container .btn_soft_green');
  //var element_info = casper.getElementsInfo(".times-container .btn_soft_green");
  //casper.echo("Is visible? " + element_info[0].visible);
  //if (element_info[0].visible) {
  //  casper.click('.times-container .btn_soft_green');
  //  casper.echo('Click on the first available termin');
  //}
  //else {
  //  casper.click('.provider-list .header-next-link #next-link');
  //  casper.echo('Click on the > link to find available termin');
  //}
  

  
}

casper.test.begin("Widgets test", function suite(test){

  casper.start();

  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  casper.then(function() {
    casper.echo('Number of test widgets is: ' + WIDGETS_URLS.length);

    for (var i = 0; i < WIDGETS_URLS.length; i++) {
      var widgetUrl = TEST_SITE_URL + WIDGETS_URLS[i][1];
      var widgetName = WIDGETS_URLS[i][0];

      (function(widgetUrl, widgetName) {
        casper.thenOpen(widgetUrl, function() {  
	  casper.echo('* OPEN - Widget name: ' + widgetName + ', widget URL: ' + widgetUrl);          
          this.waitForSelector('#mux-widget', function() {
	    checkMainWidgetElements(widgetName, widgetUrl);
	  });
	});
      })(widgetUrl, widgetName);
    };
  })

  casper.run(function() {
    test.done();
  });
});
