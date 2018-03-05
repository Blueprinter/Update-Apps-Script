function getFilesGS_Code(whatFldr) {
  var ssFiles,allFldrs,i=0,thisFile,strData="",arrayOfFldrs=[],L;
  
  if (whatFldr === undefined || whatFldr === "DDZQRF111") {
    allFldrs = DriveApp.getRootFolder();
    arrayOfFldrs.push(allFldrs);
  } else {
    allFldrs = DriveApp.getFoldersByName(whatFldr);
    while (allFldrs.hasNext()){arrayOfFldrs.push(allFldrs.next());};
  }

  L=arrayOfFldrs.length;
  for (i=0;i<L;i+=1) {
    ssFiles = arrayOfFldrs[i].getFilesByType(MimeType.GOOGLE_APPS_SCRIPT);

    while (ssFiles.hasNext()) {
      thisFile=ssFiles.next();
      strData = strData + '<div class="flPkrLine" onmouseup="pkThisFile(this)">' +
      '<div class="flPkNameCell">' + thisFile.getName() + '</div>' +
         '<div style="display:none">' + thisFile.getId() + '</div></div>';
    };
  }
  return strData;
};

function getUsrFldrs() {
  var allFldrs,fldrNames="",thisFldr,nameOf,arryToExclude = ['css','fonts','images','js','scss','less','cs','bootstrap','font-awesome'];
  allFldrs = DriveApp.getFolders();
  
  while (allFldrs.hasNext()){
    thisFldr=allFldrs.next();
    nameOf=thisFldr.getName();
    if (arryToExclude.indexOf(nameOf)!== -1){continue;};
    
    if (fldrNames===""){fldrNames='<option>'+nameOf+'</option>';}else{
      fldrNames = fldrNames + '<option>' + nameOf + '</option>';}
  };
  return fldrNames;
};