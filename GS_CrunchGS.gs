function crunchGS_Data(objOfData, srcFileData) {//Branching control for which options to run
  var tempStr;
  if (objOfData.idRemoveLogger) {//If the user checked the box to remove Logger log lines
    tempStr = dletLoggerLines(srcFileData);
    if (!tempStr) {return "//Nothing Left";}
    srcFileData = tempStr;
  }
  if (objOfData.idDletLead) {srcFileData = dletBegSpaces(srcFileData);}
  //Logger.log('objOfData.idDletTrail: ' + objOfData.idDletTrail)
  if (objOfData.idDletTrail) {srcFileData = removeTrailingSpaces(srcFileData);}
  
  if (objOfData.idRemoveComments) {
    tempStr = fncCommentsDlet(srcFileData);
    if (!tempStr) {return "//Nothing Left";}
    srcFileData = tempStr;
  }
  
  if (objOfData.idLinesBetweenGS) {
    tempStr = fncRemoveBlankLines(srcFileData);
    if (!tempStr || tempStr === " ") {return "//Nothing Left";}
    srcFileData = tempStr;
  }
  //Logger.log('removeLinesGS: ' + removeLinesGS);

  if (objOfData.idDletSpaces) {srcFileData = removeSpaces(srcFileData);};
  //if (objOfData.idConsolidateEnd) {srcFileData = crunchEndBlocks(srcFileData);};

  //var d_date = new Date().toString().slice(0,10);
  //var doc = DriveApp.createFile(d_date, srcFileData) 
  //Logger.log('srcFileData comments deleted: ' + srcFileData);
  if (!srcFileData) {srcFileData = "//Nothing Left"};
  return srcFileData;
};