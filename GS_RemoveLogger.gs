function dletLoggerLines(theSource) {
  var cntentLeft = theSource, newContent="", counter=0;
  var inBetweenContent, ndxOfLogLine;
  var ndxOfNextParen, contentToChk, contentAfterLL, beforeLog, charAfterCloseParen, ndxEndLine, hasNewLine,
      secondCharAfterCloseParen;
  
  //Logger.log('cntentLeft: ' + cntentLeft);
  //Logger.log('cntentLeft.length: ' + cntentLeft.length);
  //Logger.log('ndxOfLogLine: ' + ndxOfLogLine);

  while (cntentLeft.length > 0 && counter < 10000 && ndxOfLogLine !== -1) {
    //Logger.log('it looped');
    counter+=1;
    ndxOfLogLine = cntentLeft.indexOf("Logger.log");
    //Logger.log('ndxOfLogLine: ' + ndxOfLogLine);

    if (ndxOfLogLine===-1){newContent=newContent+cntentLeft;break;};//No new Logger lines found, quit
    //Logger.log(': ' + );
    
    contentToChk = cntentLeft.slice(ndxOfLogLine + 10);//Logger.log is 10 characters long
    ndxOfNextParen = contentToChk.indexOf(")");
    charAfterCloseParen = contentToChk.slice(ndxOfNextParen+1,ndxOfNextParen+2);
    secondCharAfterCloseParen = contentToChk.slice(ndxOfNextParen+2,ndxOfNextParen+3);
    
    //Logger.log('ndxOfLogLine: ' + ndxOfLogLine);
    //Logger.log('contentToChk: ' + contentToChk);
    //Logger.log('ndxOfNextParen: ' + ndxOfNextParen);
    //Logger.log('charAfterCloseParen: ' + charAfterCloseParen);
    //Logger.log('secondCharAfterCloseParen: ' + secondCharAfterCloseParen);
    //Logger.log(charAfterCloseParen === "\n");
    //NOTE!! This code does not delete lines, so removing a log line may show an empty line afterwards
    if (charAfterCloseParen === "\n") {
      ndxEndLine = ndxOfLogLine + 10 + ndxOfNextParen+1;
    } else {
      ndxEndLine = ndxOfLogLine + 10 + ndxOfNextParen+1;
    };

    if (secondCharAfterCloseParen === "\n") {
      ndxEndLine = ndxOfLogLine + 10 + ndxOfNextParen+2;
    };
    
    beforeLog = cntentLeft.slice(0,ndxOfLogLine);
    newContent=newContent + beforeLog;
    //Logger.log('newContent: ' + newContent);
      
    //Logger.log('cntentLeft: ' + cntentLeft);
    cntentLeft=cntentLeft.slice(ndxEndLine);
  };

  //Logger.log(newContent);
  //die53();
  return newContent.trim();
}