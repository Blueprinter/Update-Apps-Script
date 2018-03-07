function updateFile(argObjOfData) {
  //Main logic branching
  var newContent,errMsg,requestBody,sourceFileData,targetFileData,theAccessTkn,typeOfFiles,updateStatus;  
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
    newContent = sourceFileData;
    //newContent = buildNewDataObject(sourceFileData, argObjOfData, typeOfFiles);
  } else {
    newContent = buildNewDataObject(sourceFileData, argObjOfData, typeOfFiles);
  }
  //Logger.log('typeof newContent 36: ' + typeof newContent);
  //Logger.log('newContent 35:' + JSON.stringify(newContent).slice(0,40));

  //Logger.log('typeof newContent 37:' + typeof newContent);
  
  if (typeof newContent !== 'object' && newContent.slice(0,3) === 'err') {
    //Logger.log(newContent);
    return 'err' + "There is a missing file in the target file: " + newContent.slice(2);
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
    //Logger.log('typeOfFiles 60: ' + typeOfFiles);
    
    extractTheFiles(undefined,undefined,newContent,typeOfFiles);
  }
  
  requestBody = {};
  requestBody.files = newContent;
  Logger.log('requestBody 68: ' + JSON.stringify(requestBody).slice(0,40));
  
  updateStatus = updateContent(argObjOfData.idTrgetID,requestBody,theAccessTkn);
  
  Logger.log('updateStatus 71 in file GS_MainFile: ' + JSON.stringify(updateStatus).slice(0,300))
  
  if (typeof updateStatus !== 'object' && updateStatus.slice(0,3) === 'err') {
    return updateStatus;
  } else {
    errMsg = updateStatus.error;
    if (errMsg) {
      errMsg = errMsg.message;
      return 'err' + errMsg;
    }
  }
  
  if (!updateStatus) {
    return false;
  } else {
    return 'good';
  }
};