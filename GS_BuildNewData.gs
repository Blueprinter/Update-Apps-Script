function buildNewDataObject(sourceFileData, userSettingsObj, typeOfFiles) {
  var arrySourceFiles,arryTrgtFiles,crunchedData,fileType,i,L,
      nmbrOfLeftCurls,nmbrOfRightCurls,thisSrcData,this_SRC_FileObj;

/*  FILE CONTENT STRUCTURE

[
  {"name":"appsscript",
   "type":"JSON",
   "source":"{\n  \"timeZone\": \"America/New_York\",\n  \"dependencies\": {\n  },\n  \"exceptionLogging\": \"STACKDRIVER\"\n}",
   "lastModifyUser":{
       "email":"example@gmail.com",
       "name":"First Last",
       "photoUrl":"https://lh5.googleusercontent.com/-turvkUXNeLo/AAAAAAAAAAI/AAAAAAAAACE/GYPUZmcnodg/h128/photo.jpg"
   },
   "createTime":"2018-03-04T19:37:26.798Z",
   "updateTime":"2018-03-04T19:37:26.798Z",
   "functionSet":{}
  },
  
  {"name":"Code",
   "type":"SERVER_JS",
   "source":"function myFunction() {\n  \n}\n",
   "lastModifyUser":{
     "email":"example@gmail.com",
     "name":"First Last",
     "photoUrl":"https://lh5.googleusercontent.com/-turvkUXNeLo/AAAAAAAAAAI/AAAAAAAAACE/GYPUZmcnodg/h128/photo.jpg"
   },
   "createTime":"2018-03-04T19:49:08.868Z",
   "updateTime":"2018-03-04T19:49:08.871Z",
   "functionSet":{
      "values":[{"name":"myFunction"}]}
   }
]

*/

  /* LOGIC AND PROGRAM FLOW
   * You dont need to match the source file data to the target file data- When the Apps Script API updates a file
   * it overwrites everything- There is no inner file IDs to match -  You dont even need the target file data at all-
   * The source file data becomes the target file data-
   * You dont even care what the source file name is- it doesnt matter- whatever is in the source file is going to be
   * put into the target file no matter what
  
  */

  //Logger.log('sourceFileData: ' + sourceFileData);
  //Logger.log('typeof sourceFileData: ' + typeof sourceFileData);
  //Logger.log('typeOfFiles 25: ' + typeOfFiles);
  //Logger.log('arrySourceFiles: ' + arrySourceFiles)

  L = sourceFileData.length;//Number of elements in the array
  //Logger.log('L: ' + L);
  
  for (i=0;i<L;i+=1) {
    this_SRC_FileObj = sourceFileData[i];//One inner file of data which is a JSON object
    
    fileType = this_SRC_FileObj.type;
    thisSrcData = this_SRC_FileObj.source;
    //Logger.log('fileType 60: ' + fileType);
    //Logger.log('thisSrcData: ' + thisSrcData.slice(0,40));
    
    if (fileType.toLowerCase() === "server_js") {
      //Logger.log('its a server_js 64')
      /*
      nmbrOfLeftCurls = thisSrcData.match(/\{/g);
      nmbrOfRightCurls = thisSrcData.match(/\}/g);
      
      if (nmbrOfLeftCurls.length !== nmbrOfRightCurls.length) {
        //Logger.log('nmbrOfLeftCurls.length 87: ' + nmbrOfLeftCurls.length);
        //Logger.log('nmbrOfRightCurls.length 88: ' + nmbrOfRightCurls.length);
        //Logger.log(' ');
        return 'err' + "There is an error in the file: " + this_SRC_FileObj.name  + " The curly braces do not match.";
      }
      */
      if (typeOfFiles === "gs" || typeOfFiles === "both") {
        //Logger.log('its both types 75')
        crunchedData = crunchGS_Data(userSettingsObj, thisSrcData);
        this_SRC_FileObj.source = crunchedData;//Put the crunched data back into the object for this file
        sourceFileData[i] = this_SRC_FileObj;//Replace the source file data in the array with the new file object 
      } else {
        //Logger.log('just getting the same data back 79')
        continue;//do nothing - the source data will simply remain the same for this file object
      }
      /*FOR DEBUGGING
      if (srcFileName === "GS_CopyToAlt") {
        //Logger.log('crunch it')
        thisSrcData = crunchGS_Data(userSettingsObj, thisSrcData);
      } else {
        //Logger.log('NO crunch')
      };
      */
      
      //nmbrOfLeftCurls = crunchedData.match(/\{/g);
      //nmbrOfRightCurls = crunchedData.match(/\}/g);

      //Logger.log('nmbrOfLeftCurls 107: ' + nmbrOfLeftCurls.length);
      //Logger.log('nmbrOfRightCurls 108: ' + nmbrOfRightCurls.length);
      
      /*
      if (nmbrOfLeftCurls) {
        if (nmbrOfLeftCurls.length !== nmbrOfRightCurls.length) {
          //Logger.log('nmbrOfLeftCurls.length 110: ' + nmbrOfLeftCurls.length);
          //Logger.log('nmbrOfRightCurls.length 111: ' + nmbrOfRightCurls.length);
          //Logger.log(' ');
          //Logger.log('srcFileName: ' + srcFileName);
          return 'err' + "There is an error in the file: " + this_SRC_FileObj.name  + " The content was not parsed correctly.";
        }
      }
      */
    } else if (fileType.toLowerCase() === "html") {//There is also a JSON file which should not be processed so explicitly get html
      Logger.log('going to crunch HTML file')
      if (typeOfFiles === "html" || typeOfFiles === "both") {
        crunchedData = crunch_HTML_File(userSettingsObj, thisSrcData);
        this_SRC_FileObj.source = crunchedData;//Put the crunched data back into the object for this file
        sourceFileData[i] = this_SRC_FileObj;//Replace the source file data in the array with the new file object 
      } else {
        //Logger.log('just getting the same data back 112')
        continue;//do nothing - the source data will simply remain the same for this file object
      }
      //Logger.log('crunchedData html 112: ' + crunchedData)
      this_SRC_FileObj.source = crunchedData;//Put the crunched data back into the object for this file
      sourceFileData[i] = this_SRC_FileObj;//Replace the source file data in the array with the new file object 
    } else if (fileType.toLowerCase === "json") {//The JSON file MUST be put back into the file content
      //Logger.log('it the appsscript file')
      continue;//do nothing - the source data will simply remain the same for this file object
      //Logger.log('crunchedData 120: ' + crunchedData)
    };
    
  };

  //Logger.log('sourceFileData 119: ' + sourceFileData)
  return sourceFileData;
};