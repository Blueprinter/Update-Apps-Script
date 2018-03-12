function getFileData(scriptId,theAccessTkn) {  
  var errMsg,files,options,payload,response,url;

  if (!scriptId) {
    Logger.log('There was an error - No scriptID')
    //Error handling function
    return;
  }

  if (!theAccessTkn) {
    theAccessTkn = ScriptApp.getOAuthToken();
  }
  
  //This is exactly the same URL that is used to update content - But this uses a GET request
  //and no payload
  url = "https://script.googleapis.com/v1/projects/" + scriptId + "/content";

  options = {
    "method" : "GET",
    "muteHttpExceptions": true,
    "headers": {
      'Authorization': 'Bearer ' +  theAccessTkn
    }
  };

  response = UrlFetchApp.fetch(url,options);
  //Logger.log('response 27: ' + response)
  
  response = JSON.parse(response);//The response must be parsed into JSON even though it is an object

  if (typeof response === 'object') {
    errMsg = response.error;
    if (errMsg) {
      errMsg = errMsg.message;
      return 'err' + errMsg;
    }
  }
  
  files = response.files;//Get only the files out of the object
  
  //Logger.log("files 31: " + JSON.stringify(files))
  
  return files;
}

function testGetFiles() {
  getFiles("170wz-l3jR6QEJKs-R-FXrOIUmk_gNfuHvyblEJdbwZLnzf-h8RjsnO0t");
}

