function removeSpaces(argData) {
  //What this code does.
  //First, find a space
  //If the space is directly behind a var, typeof, return, or function keyname then ignore it.
  var oldContentLeft = argData,  thisLine="", newContent="", counter=0,
      startNdx = 0, ndxOfNewLine, modifiedLine, txtInFrontOfSpace;

  //Logger.log('ndxOfNewLine at Begin: ' + ndxOfNewLine);

  while (oldContentLeft.length > 0 && counter < 100000 && ndxOfNewLine !== -1) {
    //Logger.log('it looped');
    counter+=1;
    ndxOfNewLine = oldContentLeft.indexOf("\n");
    thisLine = oldContentLeft.slice(0, ndxOfNewLine);
    //Logger.log('thisLine: ' + thisLine);

    if (ndxOfNewLine===-1){newContent=newContent+oldContentLeft;break;};//No new lines found, quit

    oldContentLeft=oldContentLeft.slice(ndxOfNewLine+1);
    //Logger.log('oldContentLeft: ' + oldContentLeft.slice(0,10));

    modifiedLine = thisLine;//To begin, the modifiedLine and original line are the same.  The original line
    //never gets changed.

    for (var i=thisLine.length-1;i>-1;i-=1) {//Must start at the end and work backwards to delete spaces
      //if (thisChar==="\n") {continue};
      //Logger.log('thisLine.charAt(i): ' + thisLine.charAt(i));
      if (thisLine.charAt(i) === " ") {
        startNdx = i<9?0:i-8;//The strategy here is to get a certain number of characters
        //before the space.  Get the number of characters equal to the longest key word that needs a space in front
        //of it.  But I don't want the start index to be a negative number.
        txtInFrontOfSpace = thisLine.slice(startNdx,i);
        //Logger.log('txtInFrontOfSpace: ' + txtInFrontOfSpace);

        if (!isKeyWordInContent(txtInFrontOfSpace)) {//Only delete space if there is no key word
          //If the code gets to here, then a keywork was not found, the space should be deleted
          modifiedLine = modifiedLine.slice(0,i) + modifiedLine.slice(i+1);//Delete the space
        };
      };
    };

    newContent = newContent + modifiedLine + "\n";
    
    /*if (counter > 4) {
      Logger.log('newContent: ' + newContent);
      //return newContent;
      
    };*/
  };
 
  return newContent;
};

function isKeyWordInContent(str) {
  var kw = ['var', 'typeof', 'return', 'function', 'else'];//keywordsThatNeedA_Space
  //else if can't have a space in it.
  //Check the content in front of the space, if it contains a key word that needs a space, don't delete the
  //space, update the updatedContent and then loop again.
  var thisElmt;

  for (var i=0;i<kw.length;i+=1) {
    thisElmt = kw[i];
    if (str.indexOf(thisElmt) !== -1) {
      if (thisElmt==='var') {
        if (str.slice(-3) === 'var') {
          return true;
        } else {
          return false
        };
      };
      
      return true;
    };//A key word was found.  Don't delete the space
  };
  
  return false;
};