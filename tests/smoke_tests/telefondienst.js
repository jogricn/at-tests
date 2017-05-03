require("./../../helper.js");

casper.test.begin("Telefondienst Page Tests", function suite(test){

  var framesArray = [];

  //Get all <frames> source URL's
  function getFreames() {
    var scripts = document.querySelectorAll('frame[src]');
    return Array.prototype.map.call(scripts, function(e) {
        return e.getAttribute('src');
    });
  };

  casper.start("http://telefondienst.arzttermine.de/", function(){
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
    test.assertTitle("Telefondienst Arzttermine.de", "Telefondienst page title ok.");
    //Because the content of the page located in the <frame> we expected that frame exist
    test.assertExists('frame', "Frame exist!!!");
  });

  // Take the firs frame source url and compare with expected
  casper.then(function() {
  	framesArray = this.evaluate(getFreames);
    var frameSource = framesArray[0];
  	test.assertEquals(frameSource, 'http://arzttermine.de/lp/telefondienst/telefondienst.html', 'Frame source is OK!')
  })

  casper.run(function() {
    test.done();
  });
});
