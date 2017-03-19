require("./../../helper.js");

casper.test.begin("Search and Pager tests", function suite(test){
  
  // Checkpoint array of 'Berliner Zahnärzte(Stadtteile)' links which we expect be on web site
  // var cityLinks = ["/zahnarzt/berlin-charlottenburg", "/zahnarzt/berlin-friedrichshain", "/zahnarzt/berlin-kreuzberg", "/zahnarzt/berlin-lichtenberg", "/zahnarzt/berlin-mitte", "/zahnarzt/berlin-prenzlauer-berg", "/zahnarzt/berlin-Schoeneberg", "/zahnarzt/berlin-spandau", "/zahnarzt/berlin-steglitz", "/zahnarzt/berlin-tempelhof", "/zahnarzt/berlin-treptow", "/zahnarzt/berlin-wedding", "/zahnarzt/berlin-wilmersdorf", "/zahnarzt/berlin-zehlendorf"];
  var cityLinks = ["/allgemeinarzt/berlin", "/zahnarzt/bremen", "/zahnarzt/dresden", "/zahnarzt/dortmund", "/zahnarzt/duesseldorf", "/zahnarzt/essen", "/frauenarzt/frankfurt", "/zahnarzt/hamburg","/zahnarzt/hannover", "/frauenarzt/koeln","/zahnarzt/leipzig", "/allgemeinarzt/muenchen", "/zahnarzt/nuernberg", "/zahnarzt/stuttgart","/internist/koblenz"];
  var links;
  var specialtiesLinks;
  var areTheSame = true;

  // Grab links from first column in 'Berliner Zahnärzte(Stadtteile)' section
  function getLinks() {
    links = document.querySelectorAll('#cities ul li a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
  }

  // Grab links from Specialties section
  function getSpecialistsLinks() {
    specialtiesLinks = document.querySelectorAll('#specialties ul li a');
    return Array.prototype.map.call(specialtiesLinks, function(e) {
        return e.getAttribute('href');
    });
  }

  casper.start("http://arzttermine.de", function(){
    casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);
    test.assertTitle("Kostenfrei Arzttermine und Zahnarzttermine buchen | Arzttermine.de", "Homepage title ok");
  });

  // Collect all Cities links
  casper.then(function() {
    links = this.evaluate(getLinks);

  });

  // Compare new 'Berliner Zahnärzte(Stadtteile)' links with checkpoint array
  // and prints all new links url in console
  casper.then(function() {
    if (cityLinks.length == links.length) {
      for (var i = 0; i < cityLinks.length; i++) {
        if (cityLinks[i] != links[i]) {
          console.log("Elements are not the same: " + cityLinks[i] + " -- " + links[i]);
          areTheSame = false;
        } 
      }
    } else {
      console.log("cityLinks length is: " + cityLinks.length + " -- links length is: " + links.length);
      areTheSame = false;
    }
  });

  casper.then(function() {
    test.assert(areTheSame, "Cities list of links is OK!!!");
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - '));
  });

   // Collect all Cities links and check number of it
  casper.then(function() {
    specialtiesLinks = this.evaluate(getSpecialistsLinks);
    if (specialtiesLinks.length == 35) {
      test.assert(true, 'Number of specialties Links is OK!!!');
    } else {
      test.assert(false, 'Number of specialties Links is ' + specialtiesLinks.length + ', buth should be 35 !!!');
    }
  });

  casper.run(function() {
    test.done();
  });
});