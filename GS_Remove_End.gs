function removeTrailingSpaces(srcData) {
  var cntentLeft, newContent, counter, cnt2,ndxOfNewLine, thisChar, startIndex,
      endNdx, startContent,contentLeftLngth;

  cntentLeft = srcData;
  contentLeftLngth = srcData.length;
  startContent="";
  newContent="";
  counter=0;
  
  //Logger.log('cntentLeft: ' + cntentLeft);
  //Logger.log('cntentLeft.length: ' + cntentLeft.length);
  //Logger.log('ndxOfNewLine: ' + ndxOfNewLine);

  ndxOfNewLine = cntentLeft.indexOf("\n");
  if (ndxOfNewLine === 0) {//If the very first row has a new line as the first character
    cntentLeft = cntentLeft.slice(1);//remove the very first character in the content which is a newline
  }

  while (cntentLeft.length > 0 && counter < 100000 && ndxOfNewLine !== -1) {
    //Logger.log('it looped');
    counter++;
    ndxOfNewLine = cntentLeft.indexOf("\n");
    //ll('ndxOfNewLine: ' + ndxOfNewLine);

    if (ndxOfNewLine===-1) {//There are no newline characters remaining in this content
      //Logger.log('final end ran');
      newContent=newContent+cntentLeft;
      break;//No new lines found, quit
    }

    endNdx = ndxOfNewLine;
    thisChar = cntentLeft.charAt(endNdx-1);//Initialize the variable thisChart OUTSIDE of the loop to begin
    //If the very first character checked is NOT a space, then the while loop will never run.  And the endNdx
    //will be correct without adding 1 back, because?

    while (thisChar===" ") {
      //Logger.log('Inner loop looped');
      endNdx--;//Start at newline and work backwards
      thisChar = cntentLeft.charAt(endNdx);
      //Logger.log('thisChar: ' + thisChar)
      //Logger.log('endNdx: ' + endNdx)

      //The endNdx CAN get to zero!!!  A line with nothing but spaces in it
      //The ndxOfNewLine is the index of the CONTENT LEFT. cntentLeft.  Not the original content.
      if (endNdx < 1) {//There is nothing but spaces in this line if it gets to zero without finding anything
        //other than a space
        /*if (endNdx === 0 && thisChar !== " ") {//If there is actually content at index zero, endNdx must be adjusted
          endNdx+=1;//
        };*/
        //endNdx+=1;
        break;//If endNdx is less than 1, the loop MUST break no matter what.
      }

      if (thisChar !== " ") {
        endNdx++;//There IS something at this index, SO, to include it in the slice, add one
        //Logger.log('its not a space')
        break;
      }
    }

    startContent = "";
    if (endNdx > -1) {
      //Logger.log('ndxOfNewLine: ' + ndxOfNewLine);
      startContent = cntentLeft.slice(0,endNdx) + "\n";//Add a newline back in. 
      //If there are spaces in
      //front of the newline, then you can't include the newline in the slice.  To make this work for BOTH spaces in front
      //of the newline, and no spaces in front of the newline, exclude the newline from the startContent, then add the newline
      //back in.
      newContent = newContent + startContent;
    }

    //Logger.log('newContent: ' + newContent);
    //Logger.log('endNdx: ' + endNdx.toString());

    cntentLeft=cntentLeft.slice(ndxOfNewLine+1);
    //Logger.log('counter: ' + counter);
    //Logger.log(counter>3);

    //if (counter>6);
  };
  //Logger.log(newContent);

  return newContent.trim();
};