require("./../../../helper.js");
require('./../../helper_methods/patient.js');
require('./../../helper_methods/doctors.js');

/*
*
* TEST DESCRIPTION
*
*/
casper.test.begin("Check booking email Test", function suite(test){
    
	// Mail service URL: https://temp-mail.ru/en/
	// Service API doc: http://api.temp-mail.ru/
	
	// MD5 Hash of 'arzttermine@binka.me' email address
    email_hash = "0fc7b6a89af496a59e4e4992ff378531";
    web_url = "http://api.temp-mail.ru/request/mail/id/" + email_hash + "/format/json/";
 
    casper.start().viewport(1200, 1000).thenOpen(web_url, function(){
		
    });

    casper.then(function() {
		
		var is_received = false;
		var is_inbox_empty = true;
		
		var currentURL = this.getCurrentUrl();
		
		this.echo('URL: ' + currentURL);
		var json_string = JSON.parse(this.getPageContent());
		//require('utils').dump(json_string);
		casper.echo("--- json_string error is : " + json_string.error);

		if (json_string.error == "There are no emails yet") {
			casper.echo("There are no emails yet");
		}
		else {
			is_inbox_empty = false;
			casper.echo("Inbox is not empty !!!!!!!!!!");
		}
		casper.wait(10000);

		if (is_inbox_empty) {
			casper.echo("*** SAD CE RELOAAAD");
			casper.reload(function(){
				
				casper.echo("******* Page reloaded!!!");
				json_string = JSON.parse(this.getPageContent());
			});
		}
		else {
			for (var i=0; i < json_string.length; i++) {

				expected_subject = "Terminanfrage für Dr. Jürgen Ranft, M.Sc."
				casper.echo("Mail subject is: " + json_string[i].mail_subject);
				
				//casper.echo("Mail " + json_string[i]);
				//casper.echo("Mail " + json_string[i]);
				
				mail_subject = json_string[i].mail_subject;
				
				if (mail_subject == expected_subject) {
					
					this.echo("Subject is OK");
				}
				else {
					test.fail("E-mail subject is not OK. Expected value is: '" + expected_subject + "', but current value is : " + mail_subject);
				}
				
				mail_from = json_string[i].mail_from;
				casper.echo("Mail received from : " + mail_from);
				
				is_received = true;
				
				//"Arzttermine.de <buchung@arzttermine.de>"
			}
			casper.wait(10000);			
		}
		test.assert(is_received, 'Booking mail received!!!');		

    });

    casper.run(function() {
        test.done();
    });
});

