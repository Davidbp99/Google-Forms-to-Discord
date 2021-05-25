// Config area
var Backupurl = ""; // For backup
var Logo = "";// URL to the logo you want
var bottittle = "";
var colornice = "15745792";
// End of Config area

//System Stuff
var WhatWentWrong = ""; // We need to find out what broke by combinding this with your form reply below.
today_date = Utilities.formatDate(new Date(), "GMT-0", "dd/MM/yyyy");


function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var items = [];

    // To change the bot name (it did not want to be in the config area)
var botname = "Edit This For Your Bot Name";
//

      // We first need to find the discord hook the user will use
  var answer = response[0].getResponse() // The items start at 0 and not 1 (keep that in mind)
  // To get the actual text of the first questions answer, we need to filter the unnecessary characters out using regex.
  try {
    var parts = answer.match(/[\s\S]{1,1024}/g) || [];
  } catch (e) {
    var parts = answer;
  }
  var POST_URL = answer; // We need to update our POST_URL to what the form user typed in
    if (parts == "") {
      // For situations if someone would type nothing or fully forget about it.
      var botname = "The Back Up hook was used";
      var POST_URL = Backupurl;
      var WhatWentWrong = "You Typed Nothing "+answer; 
    }

      // This will then remove the hook being sent over discord
  for (var i = 1; i < response.length; i++) {
    var question = response[i].getItem().getTitle();
    var answer = response[i].getResponse();
    try {
      var parts = answer.match(/[\s\S]{1,1024}/g) || [];
    } catch (e) {
      var parts = answer;
    }
    
    if (answer == "") {
      continue;
    }
    for (var j = 0; j < parts.length; j++) {
      if (j == 0) {
        items.push({
          "name": question,
          "value": parts[j],
          "inline": false
        });
      } else {
        items.push({
          "name": question.concat(" (cont.)"),
          "value": parts[j],
          "inline": false
        });
      }
    }
  }
var name = botname;
   var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({
      "avatar_url": Logo,
      "username": name,
      "content": WhatWentWrong, // This is not an empty string
      "embeds": [{
              "thumbnail": {
      "url": Logo
    },
        "title": bottittle,
        "color": colornice,
        "fields": items,
        "footer": {
          "text": today_date,
          "icon_url": Logo,
          
        }
        
    
      }
      
      ]
    })
    
  };

    UrlFetchApp.fetch(POST_URL, options);
};
