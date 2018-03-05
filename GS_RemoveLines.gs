function fncRemoveBlankLines(fileKontent) {//Remove blank lines from files

  if (!fileKontent || fileKontent === " ") {return " "};
  
  fileKontent = fileKontent.replace(/^\s*\n/gm,"");//https://stackoverflow.com/a/16369725/2946873
  
  return fileKontent.trim();
  /*
  
  var cntentLeft = fileKontent, newContent="", counter=0,
      inBetweenContent, ndxOfNewLine, ndxOfNextNewLine, contentAfterFirstNewLine;
      
  while (cntentLeft.length > 0 && counter < 10000 && ndxOfNewLine !== -1) {//This section finds blank lines
    counter+=1;
    ndxOfNewLine = cntentLeft.indexOf("\n\n");//Double new lines, no spaces
    //Logger.log('ndxOfNewLine: ' + ndxOfNewLine);

    if (ndxOfNewLine !== -1) {
      newContent = newContent + cntentLeft.slice(0,ndxOfNewLine);
      cntentLeft = cntentLeft.slice(ndxOfNewLine+1);
    } else {
      newContent = newContent + cntentLeft;
      break;
    };
  };
  
  counter = 0; //reset
  cntentLeft = newContent;
  ndxOfNewLine = 0; //reset
  newContent = "";//This MUST be reset!!  The program goes back through all the data from the begining, again.
  
  //Logger.log('cntentLeft: ' + cntentLeft);
  //Logger.log('cntentLeft.length: ' + cntentLeft.length);
  //Logger.log('ndxOfNewLine: ' + ndxOfNewLine);
  
  while (cntentLeft.length > 0 && counter < 10000 && ndxOfNewLine !== -1) {
    //Logger.log('it looped');

    counter+=1;
    ndxOfNewLine = cntentLeft.indexOf("\n");
    //Logger.log('ndxOfNewLine: ' + ndxOfNewLine);
    
    if (ndxOfNewLine===-1){newContent=newContent+cntentLeft;break;};//No new lines found, quit
    
    contentAfterFirstNewLine = cntentLeft.slice(ndxOfNewLine+1);

    //Logger.log('contentAfterFirstNewLine: ' + contentAfterFirstNewLine);

    ndxOfNextNewLine = contentAfterFirstNewLine.indexOf("\n");
    //Logger.log('ndxOfNextNewLine: ' + ndxOfNextNewLine);
    
    inBetweenContent = "";//Reset.  Because if the condition isn't true, it contains the old value

    if (ndxOfNextNewLine !== -1) {
      //Logger.log('ndxOfNewLine: ' + ndxOfNewLine);
      //Logger.log((ndxOfNewLine + ndxOfNextNewLine + 1).toString());

      inBetweenContent = cntentLeft.slice(ndxOfNewLine+1, ndxOfNewLine + ndxOfNextNewLine + 2);
      //Logger.log("inBetweenContent: " + inBetweenContent);
    } else {//Must have an else condition here.  Below processing doesn't need to be done if this part runs
      newContent = newContent + cntentLeft;//.slice(0,ndxOfNewLine);
      return newContent.trim();
    };

    var hasContent = false;
    //Logger.log("inBetweenContent.length: " + inBetweenContent.length);
    //If the content on the line with the new line is nothing but empty spaces, the delete that line
    for (var i=0;i<inBetweenContent.length;i+=1) {
      //Logger.log("inBetweenContent[i]: " + inBetweenContent[i]);
      //Logger.log(inBetweenContent[i] !== " ");

      if (inBetweenContent[i] !== " ") {
        //Logger.log('inBetweenContent[i] === "\n": ' + inBetweenContent[i] === "\n");
        if (inBetweenContent[i] === "\n") {continue};//A new line is okay
        //Logger.log('Its not new line and its not blank.  What is it?');
        hasContent = true;
        break;
      };
    };
    
    if (hasContent===true) {
      newContent=newContent + cntentLeft.slice(0,ndxOfNewLine+1);
      cntentLeft=cntentLeft.slice(ndxOfNewLine + 1);
      continue;
    };

    //Logger.log('hasContent: ' + hasContent);

    if (hasContent===false) {//it's nothing but blank spaces
      //Logger.log('hasContent===false');
      //Logger.log('ndxOfNewLine: ' + ndxOfNewLine);

      newContent=newContent + cntentLeft.slice(0,ndxOfNewLine);
      //Logger.log('newContent: ' + newContent);
      
      //Logger.log('cntentLeft: ' + cntentLeft);
      cntentLeft=cntentLeft.slice(ndxOfNewLine + ndxOfNextNewLine + 1);
      //Logger.log('cntentLeft: ' + cntentLeft);
    };
  };

  //Logger.log(newContent);
  return newContent.trim();
  
  */
};