function fncCommentsDlet(content) {
try{
  var atEnd,cleanContent,counter,dx,hazDataImg,hazHTTPS,L,lastEnd,lastStart,ndxOfDblSlashes,ndxOfThisEnd,
      srch,thisLine,thisLineCleanedUp,thisLineHasDataImg,thisLineHzDataImg;
  if (!content) {
    //Logger.log('no content error 6')
    return "";
  }//If a falsy value for content was passed in then quit and return empty string

  //Ive had trouble with a RegExp solution so Im going to first parse just comments behind a double backslash
  //Just find the first double back slash and remove everything until you find an end of line or falsy value at end of file
  //Go through each line - line by line - have a seperate function that cleans up this line
  
  /* IMPORTANT!!!!
  *  Trouble Areas - URLs with HTTPS://
  
  */
  
  L = content.length;
  cleanContent = "";
  counter = 0;
  lastStart = 0;
  lastEnd = 0;
  
  //Logger.log('L 22: ' + L)
  hazDataImg = content.indexOf("data:image");//Search for a data url
  hazDataImg = hazDataImg !== -1;
  
  hazHTTPS = content.indexOf("https://");//Search for a data url
  hazHTTPS = hazHTTPS !== -1;

  //Logger.log('hazDataImg: ' + hazDataImg)
  //Logger.log('hazHTTPS: ' + hazHTTPS)
  
  while (counter < L) {
    counter+=1;
    //Logger.log('counter: ' + counter)
    
    ndxOfThisEnd = content.indexOf("\n",lastEnd + 1);//Get the next index of the next newline character
    //If you have multiple lines with no content then willl you have back to back new line characters    
    //Logger.log('ndxOfThisEnd: ' + ndxOfThisEnd)
    
    if (ndxOfThisEnd === -1) {
      ndxOfThisEnd = L;
      atEnd = true;
    }
    
    thisLine = content.slice(lastEnd,ndxOfThisEnd);//Get the next line in the content
    //Logger.log('thisLine 45: ' + thisLine)
    
    lastEnd = ndxOfThisEnd;//Update the variable to new value after it has been used
    
    if (!thisLine && atEnd) {//No new content found
      break;//The content is already correct.  Don't need to do anything.
    }
    
    srch = new RegExp("\/\/");//Find double backslashes
    
    ndxOfDblSlashes = thisLine.search(srch);//Find the first double slashes in the content that is left
    //Logger.log('ndxOfDblSlashes 56: ' + ndxOfDblSlashes);
    //Logger.log('ndxOfDblSlashes: ' + ndxOfDblSlashes);

    if (ndxOfDblSlashes !== -1) {//There are double slashes found in this line
      //Logger.log('ndxOfDblSlashes are found 63: ');
      thisLineHasDataImg = thisLine.indexOf("data:image");
      thisLineCleanedUp = "";//Reset so that it can be checked for falsy in case something fails
      if (!hazDataImg && !hazHTTPS) {
        //Logger.log('doesnt have data image or URL');
        thisLineCleanedUp = thisLine.slice(0,ndxOfDblSlashes);//Slice out the beginning part
        //Logger.log(thisLine)
        //Logger.log(thisLineCleanedUp)
      } else if (hazHTTPS && !hazDataImg) {
        thisLineCleanedUp = cleanIt(thisLine,ndxOfDblSlashes);
      } else if (hazDataImg && !hazHTTPS) {
        //Logger.log('true for hazDataImg && !hazHTTPS 66')
        if (thisLineHasDataImg) {
          thisLineCleanedUp = thisLine;//Do NOT try to find any more double backslashes in the data url- just return
        } else {
          thisLineCleanedUp = cleanIt(thisLine,ndxOfDblSlashes);
        }
        //the line- It is extremely unlikely that there will be a comment after a data image string
      } else if (hazDataImg && hazHTTPS) {
        thisLineCleanedUp = cleanBoth(thisLine,ndxOfDblSlashes);
      }
      
      if (thisLineCleanedUp) {
        cleanContent = cleanContent + thisLineCleanedUp;
      } else {
        cleanContent = cleanContent + thisLine;
      }
      continue;
    } else {
      cleanContent = cleanContent + thisLine;
      continue;
    }
  }

  cleanContent = removeMultilineComments(cleanContent);
  //Logger.log(cleanContent === content)
  
  if (!cleanContent) {cleanContent = " "};
  //DriveApp.createFile('test output', newContent);
  //ll('newContent: ',newContent);
  return cleanContent;
}catch(e){
  Logger.log('error: ' + e.message + " stack: " + e.stack)
  return "err" + e.message + " stack: " + e.stack;
}
};

function cleanIt(thisLine,ndxOfDblSlashes) {
  var c,dx;
  
  dx = thisLine.indexOf("https://");//Search for 
  
  if (dx !== -1) {
    dx = thisLine.indexOf("//",dx + 8);
    if (dx === -1) {//did not find another double slash
      return thisLine;
    }
    ndxOfDblSlashes = dx;
    c = thisLine.slice(0,ndxOfDblSlashes);//Slice out the beginning part
    return c;
  }
  
  c = thisLine.slice(0,ndxOfDblSlashes);//Slice out the beginning part
  //Logger.log('c: ' + c)
  return c;
}

function cleanBoth(thisLine,ndxOfDblSlashes) {
  var c,dx,imgDex;
  
  dx = thisLine.indexOf("https://");//Search for 
  imgDex = thisLine.indexOf("data:image");
  
  if (dx !== -1 && imgDex === -1) {//There is https but no data url
    dx = thisLine.indexOf("//",dx + 8);

    if (dx === -1) {//did not find another double slash
      return thisLine;
    }
    //another double backslash was found
    c = thisLine.slice(0,dx);//Slice out the beginning part
    return c;
  } else if (dx === -1 && imgDex !== -1) {
    return thisLine;//Dont do anything just return the line
    //Do NOT try to find any more double backslashes in the data url- just return
    //the line- It is extremely unlikely that there will be a comment after a data image string
  } else {
    return thisLine;
  }
}

function removeMultilineComments(content) {
  var begOfWhatsLeftToSlashes,endPart,ndxOfEnd,ndxOfSlashAsterix;
  
  while (ndxOfSlashAsterix !== -1) {//This loop is for multi line comments
    //ll('newContent.length;: ',content.length)
    content = content.trim();
    ndxOfSlashAsterix = content.indexOf("/*");
    ndxOfEnd = content.indexOf("*/");

    //ll('ndxOfSlashAsterix: ',ndxOfSlashAsterix)
    //ll('ndxOfEnd: ',ndxOfEnd)

    if (ndxOfSlashAsterix===0) {//There is a comment right at the beginning
      content = content.slice(ndxOfEnd+2);
      continue;
    }

    if (ndxOfSlashAsterix !== -1) {
      begOfWhatsLeftToSlashes = content.slice(0, ndxOfSlashAsterix-1);
      endPart = content.slice(ndxOfEnd+2);
      content = begOfWhatsLeftToSlashes + endPart;
      
      //ll('begOfWhatsLeftToSlashes: ',begOfWhatsLeftToSlashes)
      
      //ll('ndxOfEnd: ',ndxOfEnd)
      
      
    } else {
      //ll('End of first processing: ',content)
      break;
    }
  };
  
  return content;
}