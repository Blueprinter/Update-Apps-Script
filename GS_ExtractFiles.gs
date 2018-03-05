function extractTheFiles(srcFileID,fldr,prjktData,typeOfFiles) {
try{
  var allFiles,exportHTMLs,exportGS,fileData,i,L,name,oldFiles,trgtFldr,
      theAccessTkn,thisFileObj,thisOldFile;
  if (!srcFileID) {
    return 'noID';
  }

  if (typeOfFiles === 'html') {
    exportHTMLs = true; 
  }
  if (typeOfFiles === 'server_js' || typeOfFiles === 'both') {
    exportGS = true;
  }
  
  Logger.log('exportHTMLs: ' + exportHTMLs);
  
  theAccessTkn = ScriptApp.getOAuthToken();
  
  //Logger.log('srcFileID: ' + srcFileID);
  //Logger.log('fldr: ' + fldr);
  if (!prjktData) {
    prjktData = getFileData(srcFileID, theAccessTkn);
    //Logger.log('prjktData:' + prjktData);
  }
  
  allFiles = prjktData.files;
  L = allFiles.length;
  //Logger.log('L : ' + L)
  
  if (fldr) {
    trgtFldr = DriveApp.getFolderById(fldr);
  
    if (!trgtFldr) {return 'noFldr';}
    
    oldFiles = trgtFldr.getFiles();
  }

  if (oldFiles) {
    while (oldFiles.hasNext()) {
      thisOldFile = oldFiles.next();
      thisOldFile.setTrashed(true);
    }
  }
  
  for (i=0;i<L;i++) {
    thisFileObj = allFiles[i];
    fileData = thisFileObj.source;
    name = thisFileObj.name;
    
    //Logger.log('name: ' + name)
    //Logger.log('thisFileObj.type: ' + thisFileObj.type)
    
    if (thisFileObj.type === 'html' && exportHTMLs) {
      //Logger.log('it is html')
      if (trgtFldr) {
        trgtFldr.createFile(name, fileData, MimeType.HTML);
      } else {
        DriveApp.createFile(name, fileData, MimeType.HTML);
      }
    } else if (thisFileObj.type === 'server_js' && exportGS) {
      //Logger.log('it is html')
      if (trgtFldr) {
        trgtFldr.createFile(name, fileData, MimeType.HTML);
      } else {
        DriveApp.createFile(name, fileData, MimeType.HTML);
      }
    } else {
      if (trgtFldr) {
        trgtFldr.createFile(name, fileData, MimeType.JAVASCRIPT);
      } else {
        DriveApp.createFile(name, fileData, MimeType.JAVASCRIPT);
      }
      
    }
  }
  
  return true;  
}catch(e) {
  Logger.log('err: ' + e.message + ' stack ' + e.stack)
  return false;
}
}

