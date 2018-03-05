function updateFile(argObjOfData) {
  //Main logic branching
  var requestBody,sourceFileData,targetFileData,theAccessTkn,typeOfFiles,updateStatus;

  //DriveApp.createFile(blob)
  
  argObjOfData = JSON.parse(argObjOfData);//Create an object from the stringified object from the client

  theAccessTkn = ScriptApp.getOAuthToken();

  //Logger.log('argObjOfData.idSrcID: ' + argObjOfData.idSrcID);
  //Logger.log('argObjOfData.idTrgetID: ' + argObjOfData.idTrgetID);

  sourceFileData = getFileData(argObjOfData.idSrcID, theAccessTkn);//Get content out of the source file
  //Logger.log('sourceFileData:' + JSON.stringify(sourceFileData));

  targetFileData = getFileData(argObjOfData.idTrgetID, theAccessTkn);
  //Logger.log('targetFileData:' + JSON.stringify(targetFileData));

  //Logger.log('argObjOfData.idOverWriteBoth: ' + argObjOfData.idOverWriteBoth);
  //Logger.log('argObjOfData.idOverWriteGS: ' + argObjOfData.idOverWriteGS);
  
  if (argObjOfData.idOverWriteBoth) {
    typeOfFiles = 'both';
  } else if (argObjOfData.idOverWriteGS) {
    typeOfFiles = 'gs';
  } else if (argObjOfData.idOverWriteHtml) {
    typeOfFiles = 'html';
  } else {
    typeOfFiles = 'both';
  }
  //Logger.log('typeOfFiles: ' + typeOfFiles);
  if (!argObjOfData.idRemoveLogger && !argObjOfData.idDletLead && !argObjOfData.idDletTrail && !argObjOfData.idRemoveComments &&
      !argObjOfData.idLinesBetweenGS && !argObjOfData.idDletSpaces) {
    //requestBody = sourceFileData;
    requestBody = buildNewDataObject(sourceFileData, argObjOfData, typeOfFiles);
  } else {
    requestBody = buildNewDataObject(sourceFileData, argObjOfData, typeOfFiles);
  }
  //Logger.log('requestBody 35:' + JSON.stringify(requestBody));

  //Logger.log('typeof requestBody 37:' + typeof requestBody);
  
  if (typeof requestBody !== 'object' && requestBody.slice(0,3) === 'err') {
    //Logger.log(requestBody);
    return 'err' + "There is a missing file in the target file: " + requestBody.slice(2);
  }

  //Logger.log('argObjOfData.idExportToTxt: ' + argObjOfData.idExportToTxt);
  //Logger.log('argObjOfData.idExportGS_Files: ' + argObjOfData.idExportGS_Files);
  
  if (argObjOfData.idExportToTxt) {
    //srcFileID,fldr,prjktData,typeOfFiles
    
    if (argObjOfData.idBothFiles) {
      typeOfFiles = 'both';
    } else if (argObjOfData.idExportGS_Files) {
      typeOfFiles = 'gs';
    } else if (argObjOfData.idExportHtmlFiles) {
      typeOfFiles = 'html';
    } else {
      typeOfFiles = 'both';
    }
    Logger.log('typeOfFiles: ' + typeOfFiles);
    
    extractTheFiles(undefined,undefined,requestBody,typeOfFiles);
  }
  
  updateStatus = updateContent(argObjOfData.idTrgetID,requestBody, theAccessTkn);
  
  Logger.log(updateStatus)
  
  if (typeof updateStatus !== 'object' && updateStatus.slice(0,3) === 'err') {
    //Logger.log(requestBody);
    return updateStatus;
  }
  
  if (!updateStatus) {
    return false;
  } else {
    return 'good';
  }
};