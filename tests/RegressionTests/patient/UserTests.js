var helper = require("./../../../helper.js");
var patient = require('./../../helper_methods/patient');

ARZTTERMINE_HOMEPAGE = "http://arzttermine.de";

DEFAULT_USER_FIRST_NAME = "TestNebojsa";
DEFAULT_USER_LAST_NAME = "TestJogric";
DEFAULT_USER_EMAIL = "nebojsajogric+arztterminetest@gmail.com";
DEFAULT_USER_MOBILE = "+381604536787";

/*
* --- TEST ---
*
* A simple test which checks login and logout of default user
*
*/
casper.test.begin("Login/Logout with test user", function suite(test){
  casper.start('https://www.arzttermine.de/patienten-login');
  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  casper.then(function() {
      casper.loginTestUser();
  })

  casper.then(function() {
      casper.logoutUser();
  })

  casper.run(function() {
    test.done();
  });
});

/*
* --- TEST ---
*
* Test Description
*
*/
// casper.test.begin("Search for doctors of variant profiles Test", function suite(test){
//   casper.start('https://www.arzttermine.de');
//   casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

//   casper.then(function() {
//     doSearchDoctors("Diabetologe", "Berlin", "gesetzlich");
//     casper.capture('searchform.png');
//   })

//   casper.run(function() {
//     test.done();
//   });
// });


/*
* --- TEST ---
*
* Login with default user 'TestNebojsa' on user account
* Check user details on 'Mein Profil' page
* In the menu on left side check all menu items and compare it with checkpoint
*
*/
casper.test.begin("Check Default user 'Main Profile'", function suite(test){
  var menuitems;
  var menuLinks = ["https://www.arzttermine.de/patienten/account", "https://www.arzttermine.de/patienten/account_bearbeitung", "https://www.arzttermine.de/patienten/termine", "https://www.arzttermine.de/patienten/rewards"];
  var areTheSame = true;

  // Grab links from menu 
  function getLinks() {
    menuitems = document.querySelectorAll('.dashboard_left_panel a');
    return Array.prototype.map.call(menuitems, function(e) {
        return e.getAttribute('href');
    });
  }

  casper.start("http://www.arzttermine.de/patienten-login");
  casper.viewport(casper.at.VIEWPORT.width, casper.at.VIEWPORT.height);

  casper.then(function() {
      casper.loginTestUser();
  })

  // On Mein Profil page check user detail
  casper.then(function() {
    test.assertTextExists("Herr", 'Anrede: Herr exist in user details.');
    test.assertTextExists(DEFAULT_USER_FIRST_NAME, 'Vorname: TestNebojsa - exist in user details.');
    test.assertTextExists(DEFAULT_USER_LAST_NAME, 'Nachname: TestJogric - exist in user details.');
    test.assertTextExists(DEFAULT_USER_EMAIL, 'E-Mail: nebojsajogric+arztterminetest@gmail.com - exist in user details.');
    test.assertTextExists(DEFAULT_USER_MOBILE, 'Mobil: +381604536787 - exist in user details.');
    test.assertTextExists("gesetzlich versichert", 'Versicherungsart: gesetzlich versichert - exist in user details.');
  })

  // Greb links from left side menu items
  casper.then(function() {
    menuitems = this.evaluate(getLinks);
  })

  // Compare menu items links with checkpoint array
  casper.then(function() {
    if (menuLinks.length == menuitems.length) {
      for (var i = 0; i < menuLinks.length; i++) {
        if (menuLinks[i] != menuitems[i]) {
          console.log("Elements are not the same: " + menuLinks[i] + " -- " + menuitems[i]);
          areTheSame = false;
        } 
      }
    } else {
      console.log("menuLinks length is: " + menuLinks.length + " -- menuitems length is: " + menuitems.length);
      areTheSame = false;
    }
  })

  casper.then(function() {
    test.assert(areTheSame, "Menu items links are OK!!!");
  });
  
  casper.then(function() {
      casper.logoutUser();
  })

  casper.run(function() {
    test.done();
  });  
});