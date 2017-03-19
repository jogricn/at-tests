
//----------------------HELEPER FUNCTIONS---------------------------//

function getDoctorClinics () {
  var docClinics = document.querySelectorAll('.location');
  return docClinics;
}

function getDoctorClinicsLinks () {
  var docClinicsLinks = document.querySelectorAll('.location-description > div > div.name > a');
  return Array.prototype.map.call(docClinicsLinks, function(e) {
    return e.innerHTML;
  });
}


//----------------------DOCTOR PAGE HELEPER TESTS---------------------------//

checkDefaultDoctorPageElements = function checkDefaultDoctorPageElements(test) {
  test.assertVisible('.breadcrumbs', 'Breadcrumbs are visible.');
  test.assertVisible('h1', 'Doctor name is visible');
  test.assertVisible('div.headline.justified-blocks > div', 'Doctor phone number is visible');
  test.assertVisible('.insurance-selector', 'Insurance selector is visible');
  test.assertVisible('a.insurance-selector-button.public', '  - Public insurance selector is visible.');
  test.assertVisible('a.insurance-selector-button.private', '  - Private insurance selector is visible.');
}

checkRatingElements = function checkRatingElements(test) {
  test.assertVisible('div.ratings', 'Ratings element is visible!');

  test.assertVisible('div.ratings > div:nth-child(2)', '  - "Behandlung" rating element is visible!');
  test.assertVisible('div.ratings > div:nth-child(3)', '  - "Wartezeit" rating element is visible!');
  test.assertVisible('div.ratings > div:nth-child(4)', '  - "Gesamtbewertung" rating element is visible!');
}

checkDoctorCalendars = function checkDoctorCalendars(test) {
  test.assertVisible('div.calendar', 'Doctor calendar is visible!');
}

chechRaitingsReviewsSection = function chechRaitingsReviewsSection(test, minNumOfRaitings) {
  test.assertVisible('#reviews', 'Ratings reviews section is visible!');
  test.assertVisible('#reviews > div > section:nth-child(1)', '  - First rating review element is visible.');
  test.assertVisible('section.review .rating', '  - Rating components with a stars are visible in rating review section.');
}

getNumOfRaitings = function getNumOfRaitings() {
  var raitings = document.querySelectorAll('#reviews > div > section');
  return raitings;
}

checkNumOfRatings = function checkNumOfRatings(test) {
  var numOfRaitings = casper.evaluate(getNumOfRaitings);
  //casper.echo("Number of ratings reviews is " + numOfRaitings.length);

  if (numOfRaitings.length >= 1) {
    test.assert(true, 'Number of ratings reviews is '  + numOfRaitings.length);
  } else {
    test.assert(false, 'Something is wrong with a number of ratings reviews. Number is '  + numOfRaitings.length);
  }
}

checkDoctorClinics = function checkDoctorClinics(test, numOfClinics) {
  var doctorClinicsArray = casper.evaluate(getDoctorClinics);
  if (doctorClinicsArray.length >= numOfClinics) {
    test.assert(true, 'Number of doctor cliniks is Ok!');
  } else {
    test.assert(false, 'Something is wrong with a number of doctor cliniks!');
  };
}

checkDoctorClinicsLinks = function checkDoctorClinicsLinks(test) {
  var doctorClinicsArray = casper.evaluate(getDoctorClinicsLinks);

  casper.echo('<<< Doctor cliniks are:');
  casper.echo('  - ' + doctorClinicsArray.join('\n  - '));
}