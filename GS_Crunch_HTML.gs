function crunch_HTML_File(objOfData, srcFileData, fileName) {
  var cache,hazScrplet,howManyLoops,rawContent,rgX_pttrn,tempStr;

  //cache = CacheService.getScriptCache();

  if (objOfData.idRemoveComments) {
    try{
      //howManyLoops = cache.get('loops');
      //if (!howManyLoops) {howManyLoops===0};
      //howManyLoops = Number(howManyLoops)+1;

      //howManyLoops = howManyLoops.toString();      
      //cache.put('loops', howManyLoops)
      
      //if (howManyLoops === '1') {
        //ll('srcFileData one',srcFileData)
      //};
      
      hazScrplet = srcFileData.indexOf("<?") !== -1;
      //ll('hazScrplet',hazScrplet);
      //ll('fileName',fileName);
      
      if (!hazScrplet) {
        tempStr = HtmlService.createHtmlOutput(srcFileData).getContent();//This strips out the comments
        if (objOfData.idLinesBetweenGS) {//If the check box was checked to remove blank lines
          tempStr = fncRemoveBlankLines(tempStr);
        }
        return tempStr;
      }

      //first replace the beginning scriptlet characters <? with zq*~
      rgX_pttrn = new RegExp("\<\\?","g");
      
      //ll('got here');
      
      rawContent = srcFileData.replace(rgX_pttrn,'"zqqpz');//Now there will not be an error evaluating HTML
      //Must put double quotation marks at front so that it is seen as text
      rgX_pttrn = new RegExp("\\?\>","g");
      rawContent = rawContent.replace(rgX_pttrn,'qqpzzz"');//Must replace the ending ?> part of scriptlet
      
      //if (howManyLoops === '1') {
        //ll('rawContent one',rawContent)
      //};
      rawContent = HtmlService.createHtmlOutput(rawContent).getContent();//This strips out the comments
      
      //if (howManyLoops === '1') {
        //ll('rawContent two',rawContent)
      //};
      
      rgX_pttrn = new RegExp('"zqqpz',"g");
      tempStr = rawContent.replace(rgX_pttrn,'<?');//Put the scriptlet beginning back in
      rgX_pttrn = new RegExp('qqpzzz"',"g");
      tempStr = tempStr.replace(rgX_pttrn,'?>');//Put the scriptlet ending back in
      
      //if (howManyLoops === '1') {
        //ll('tempStr',tempStr)
      //};
    }catch(e) {//
      //ll('error creating html output', e.message);
    }
    //ll('tempStr',tempStr)
    if (!tempStr) {return srcFileData;}
    srcFileData = tempStr;
  };

  if (objOfData.idLinesBetweenGS) {
    //ll('passed test to delete empty lines')
    tempStr = fncRemoveBlankLines(srcFileData);
    if (!tempStr || tempStr === " ") {return "//Nothing Left"};
    srcFileData = tempStr;
  }

  return srcFileData;
};