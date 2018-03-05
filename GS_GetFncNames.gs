function getFuncNames(fileID, ssID, sh_Name) {
  //Get all server function names in all gs files
  //fileID = "";
  //Logger.log('fileID: ' + fileID);
  
  var allFiles,dataContentAsString,downloadUrl,fileData,i,options,sh,ss,stringToObj,theAccessTkn;
  var ndxOfFunction=0,counter=0, ndxOfEnd=0, functionName="", allFncNames=[], hasSpaces = 0;
  var innerObj, thisFile, fileType = "", thisGS_Content,howManyFiles, allGsContent="";
  
  if (!fileID) {
    return "There is no Apps Script file ID";
  }
  
  theAccessTkn = ScriptApp.getOAuthToken();
  
  downloadUrl = "https://script.google.com/feeds/download/export?id=" + fileID + "&format=json";

  options = {
    "kind": "drive#file",
    "id": fileID,
    "downloadUrl": downloadUrl,
    "headers": {
       'Authorization': 'Bearer ' +  theAccessTkn,
     },
    "contentType": "application/vnd.google-apps.script+json",
    "method" : "GET"
  };

  fileData = "";
  fileData = UrlFetchApp.fetch(downloadUrl, options);
  dataContentAsString = fileData.getContentText();
   
  stringToObj = JSON.parse(dataContentAsString);

  allFiles = stringToObj.files;

  howManyFiles = allFiles.length;
  
  for (i=0;i<howManyFiles;i+=1) {
    thisFile = allFiles[i];
    
    //ll('thisFile',thisFile.name)
    
    if (!thisFile) {continue;}
    
    fileType = thisFile.type;
    
    if (fileType !== "server_js") {continue;}
    
    thisGS_Content = thisFile.source;//source is the key name for the file content
    allGsContent = allGsContent + thisGS_Content;
  }

  while (ndxOfFunction !== -1 || counter < 1000) {
    ndxOfFunction = allGsContent.indexOf("function ");
    
    //ll('ndxOfFunction',ndxOfFunction)
    if (ndxOfFunction === -1) {break};

    allGsContent = allGsContent.slice(ndxOfFunction+9);//Remove everything in front of 'function' first
    
    ndxOfEnd = allGsContent.indexOf("(");
    functionName = allGsContent.slice(0,ndxOfEnd);
    allGsContent = allGsContent.slice(ndxOfEnd+2);//Remove the     
    hasSpaces = functionName.indexOf(" ");
    
    if (hasSpaces !== -1) {continue;}
 
    if (functionName.length < 150) {
      allFncNames.push(functionName);
    }//Any string over 150 long is probably not a function name

    counter +=1;
  };

  //ll('ssID',ssID)
  
  if (ssID) {
    try{
    ss = SpreadsheetApp.openById(ssID);
    sh = ss.getSheetByName(sh_Name);
    
    sh.getRange(2, 1, allFncNames.length,1).setValues(allFncNames);
    }catch(e) {
      //Do nothing
    };
  };
  return allFncNames;
};

function getDupServerFuncNames(fileID, ssID, sh_Name) {
  var allNames,finalName_arr,i,L,thisName;
  
  allNames = getFuncNames(fileID, ssID, sh_Name);
  //ll('JSON.stringify(allNames)', JSON.stringify(allNames));
  
  L = allNames.length;
  
  //ll('L', L);
  
  finalName_arr = [];
  
  //Go through the array and record any dups
  for (i = L-1;i>-1; i--){//Loop from last element to first- not neccessary really
    thisName = allNames[i];
    //ll('thisName',thisName)
    //ll('allNames.indexOf(thisName)',allNames.indexOf(thisName),i)
    if(allNames.indexOf(thisName) !== i){//If the same element is found in another index
      finalName_arr.push(thisName);
    };
  };

  //ll('finalName_arr',finalName_arr);
  
  if (!finalName_arr || finalName_arr.length === 0) {
    finalName_arr = "There are no duplicate function names";
  } else {
    finalName_arr.toString()
  };
  
  if (!finalName_arr) {
    finalName_arr = "There are no duplicate function names";
  };
  
  return finalName_arr;
};