casper.test.begin("Login/Logout with test user", function suite(test){
  var menuitems;
  var menuLinks = ["http://www.arzttermine.de/patienten/account", "http://www.arzttermine.de/patienten/account_bearbeitung", "http://www.arzttermine.de/patienten/termine"];
  var areTheSame = true;

  // Grab links from menu 
  function getLinks() {
    menuitems = document.querySelectorAll('.dashboard_left_panel a');
    return Array.prototype.map.call(menuitems, function(e) {
        return e.getAttribute('href');
    });
  }

  casper.start("http://arzttermine.de");

  casper.then(function(){
    this.click("#patient-reg-top a.quick-login");
  });

  casper.then(function() {
    // Fill Login form and  and click on Login button
    this.fill('#login_form', {
      'email': 'nebojsajogric+arztterminetest@gmail.com',
      'password': 'nesa123456'
    }, true);
  })

  // On Mein Profil page check user detail
  casper.then(function() {
    test.assertTextExists("Herr", 'Anrede: Herr exist in user details.');
    test.assertTextExists("TestNebojsa", 'Vorname: TestNebojsa - exist in user details.');
    test.assertTextExists("TestJogric", 'Nachname: TestJogric - exist in user details.');
    test.assertTextExists("nebojsajogric+arztterminetest@gmail.com", 'E-Mail: nebojsajogric+arztterminetest@gmail.com - exist in user details.');
    test.assertTextExists("+381604536787", 'Mobil: +381604536787 - exist in user details.');
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

  // Logoff from user account
  casper.then(function() {
    this.click(".right > a:nth-child(1)");    
  });

  casper.then(function() {
    var url = "http://www.arzttermine.de/patienten-login";
    this.test.assert(this.getCurrentUrl() === url, 'User is leged out.');
  });

  casper.run(function() {
    test.done();
  });
});