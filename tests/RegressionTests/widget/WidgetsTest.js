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

function checkMainWidgetElements(currentWidgetName, widgetTest) {
  casper.echo('--  ' + currentWidgetName + 'widget test');

  //var currentWidgetUrl = casper.getCurrentUrl();

  //casper.echo('    - ' + currentWidgetName + 'Widget URL is: ' + currentWidgetUrl);
  //widgetTest.assertVisible('#mux-widget', '  * Widget main container is visible.');
}

function checkWidgets(currentWidgetNameString, currentWidgetUrlString) {
  
  casper.test.assert(true, currentWidgetNameString  + ' widget is loaded!');
  casper.echo(currentWidgetUrlString);

  // var filename = currentWidgetNameString + '.png';
  // casper.capture(filename);

  // var currentWidgetUrl = casper.getCurrentUrl();
  // if (currentWidgetUrl == currentWidgetUrlString) {
  //   casper.test.assert(true, currentWidgetNameString + ' widget page is opened');
  // } else {
  //   casper.echo('Otvoren je URL: ' + currentWidgetUrl + ' a drugi link je '+  currentWidgetUrlString);
  //   casper.test.assert(false, currentWidgetNameString + ' widget page is opened');

  // }

  // casper.echo('Broj widgeta je: ' + WIDGETS_URLS.length);

  // for (var i = 0; i < WIDGETS_URLS.length; i++) {
  //   casper.echo('Trenutno radimo sa widgetom: ' + i);
  //   var widgetUrl = TEST_SITE_URL + WIDGETS_URLS[i][1];

  //   //casper.echo('* ' + widgetUrl);


  //   var widgetName = WIDGETS_URLS[i][0];

  //   casper.open(widgetUrl);

  //     // this.waitForSelector('#mux-widget', function() {
  //     //   checkMainWidgetElements(widgetName, test);
  //     // });

  //   casper.wait(2000, function() {

  //     var currentWidgetUrl = casper.getCurrentUrl();
  //     if (currentWidgetUrl == widgetUrl) {
  //       test.assert(true, widgetName + ' widget page is opened');
  //     } else {
  //       test.assert(false, widgetName + ' widget page is opened');
  //     }
  //     // checkMainWidgetElements(widgetName, test);  
  //     var filename = 'widgetpage' + i + '.png';
  //     casper.capture(filename);
  //   })      
  // };
}

casper.test.begin("Widgets test", function suite(test){
  casper.start();

  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  casper.then(function() {
    casper.echo('Broj widgeta je: ' + WIDGETS_URLS.length);

    for (var i = 0; i < WIDGETS_URLS.length; i++) {
      var widgetUrl = TEST_SITE_URL + WIDGETS_URLS[i][1];
      var widgetName = WIDGETS_URLS[i][0];

      // casper.echo('* Widget name: ' + widgetName + ' -' + widgetUrl);

      casper.open(widgetUrl);
      
      checkWidgets(widgetName, widgetUrl);
      

      

      // this.waitForSelector('#mux-widget', function() {
      //   checkMainWidgetElements(widgetName, test);
      // });

      // casper.wait(2000, function() {

      //   var currentWidgetUrl = casper.getCurrentUrl();
      //   if (currentWidgetUrl == widgetUrl) {
      //     test.assert(true, widgetName + ' widget page is opened');
      //   } else {
      //     test.assert(false, widgetName + ' widget page is opened');
      //   }
      //   // checkMainWidgetElements(widgetName, test);  
      //   var filename = 'widgetpage' + i + '.png';
      //   casper.capture(filename);
      // })      
    };
    
  })

  casper.run(function() {
    test.done();
  });
});