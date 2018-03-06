function updateContent(scriptId,content,theAccessTkn) {
//try{
  var options,payload,response,url;

  if (!content) {
    //Error handling function
    return;
  }
  
  if (!theAccessTkn) {
    theAccessTkn = ScriptApp.getOAuthToken();
  }
  
  //https://developers.google.com/apps-script/api/reference/rest/v1/projects/updateContent
  url = "https://script.googleapis.com/v1/projects/" + scriptId + "/content";

  options = {
    "method" : "PUT",
    "muteHttpExceptions": true,
    "headers": {
      'Authorization': 'Bearer ' +  theAccessTkn
     },
    "contentType": "application/json",//If the content type is set then you can stringify the payload
    "payload": JSON.stringify(content)
  };
  
  response = UrlFetchApp.fetch(url,options);
  response = JSON.parse(response);//Must be parsed even though it shows as coming back as an object
  
  Logger.log('typeof response: ' + typeof response)
  
  Logger.log('response 29 in file GS_Update: ' + JSON.stringify(response).slice(0,45))

  return response;
//} catch(e) {
  //Logger.log(response)
//}
};

