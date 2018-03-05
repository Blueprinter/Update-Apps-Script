function dletBegSpaces(srcData) {
  var cntentLeft,thisLine,newContent,counter,
      ndxOfNewLine, thisChar, startIndex, endContent="";

  cntentLeft = srcData;
  thisLine="";
  newContent="";
  counter=0;
  
  //Logger.log('cntentLeft: ' + cntentLeft);
  //Logger.log('ndxOfNewLine: ' + ndxOfNewLine);

  ndxOfNewLine = cntentLeft.indexOf("\n");//This must be initialized for the WHILE loop to run
  //Logger.log('ndxOfNewLine at Begin: ' + ndxOfNewLine);

  while (cntentLeft.length > 0 && counter < 100000 && ndxOfNewLine !== -1) {
    //Logger.log('it looped');
    counter+=1;
    ndxOfNewLine = cntentLeft.indexOf("\n");
    thisLine = cntentLeft.slice(0, ndxOfNewLine);
    //Logger.log('thisLine: ' + thisLine);

    if (ndxOfNewLine===-1){newContent=newContent+cntentLeft;break;};//No new lines found, quit

    cntentLeft=cntentLeft.slice(ndxOfNewLine+1);
    //Logger.log('cntentLeft: ' + cntentLeft.slice(0,10));
    endContent = "";

    for (var i=0;i<thisLine.length;i+=1) {
      thisChar = thisLine.charAt(i);
      if (thisChar==="\n") {
        endContent = "\n";
        break;
      }
      //Logger.log('thisChar: ' + thisChar);
      if (thisChar !== " ") {
        endContent = thisLine.slice(i);
        break;
      }
    }

    //Logger.log('endContent: ' + endContent);
    newContent = newContent + endContent + "\n";

    //Logger.log('newContent: ' + newContent);
    //Logger.log('startIndex: ' + ndxOfNextNewLine.toString());

    //Logger.log('counter: ' + counter);
    //Logger.log(counter>3);

    /*if (counter>18) {Logger.log('its over');
      //Logger.log(newContent);
      return newContent;       

    };*/
  };
 
  //Logger.log(newContent);

  return newContent.trim();
};