require("./../../../helper.js");
require('./../../helper_methods/patient.js');
require('./../../helper_methods/doctors.js');

/*
*
* TEST DESCRIPTION
*
*/
casper.test.begin("Check booking email Test", function suite(test){
    
	// MD5 Hash of 'arzttermine@binka.me' email address
    email_hash = "0fc7b6a89af496a59e4e4992ff378531";
    web_url = "http://api.temp-mail.ru/request/mail/id/" + email_hash + "/format/json/";
 
    casper.start().viewport(1200, 1000).thenOpen(web_url, function(){
		
    });

    casper.then(function() {
		
		var currentURL = this.getCurrentUrl();
		this.echo('URL: ' + currentURL);
		var json_string = JSON.parse(this.getPageContent());
		//require('utils').dump(json_string);
		casper.echo("--- json_string je : " + json_string);
		if (json_string) {
			for (var i=0; i < json_string.length; i++) {
			
				expected_subject = "Terminanfrage für Dr. Jürgen Ranft, M.Sc."
				casper.echo("html_url: " + json_string[i].mail_subject);
				casper.echo("html_url owner: " + json_string[i].email_id);
				mail_subject = json_string[i].mail_subject;
				if (mail_subject == expected_subject) {
					is_received = true;
					this.echo("Subject is OK");
				}
				else {
					test.fail("E-mail subject is not OK. Expected value is: '" + expected_subject + "', but current value is : " + mail_subject)
				}
				
				"Arzttermine.de <buchung@arzttermine.de>"
					
			}
			
		}
		
		
		
    });
	
	
    casper.run(function() {
        test.done();
    });
});

