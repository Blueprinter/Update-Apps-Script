# apps-script-update
This Web App is currently not working correctly.  March 5, 2018.  This is the first time that I've uploaded the complete project.
This app no longer uses an OAuth library.  The OAuth library is no longer needed.

Updates an existing Apps Script file (target) with the content of another Apps Script file (source).  This code is an Apps Script project.  You must use Apps Script to implement this code.  https://script.google.com

This program overwrites one Apps Script file with another Apps Script file.  It includes a user interface and a file picker to get the source and target files.  

Test this code on test files that you don't care about before overwritting an important file.  Back up your target file before overwritting it.

This code will update the target Apps Script file from the source Apps Script file.   It WILL create a new file in the target that is currently in the source.  For example, if you had an HTML file in the source that was not in the target file, the target file WILL get the new file.  Also, any files that were previously in the target that are no longer in the source, will be deleted from the target file.

This code is set up to be a "Stand Alone" Apps Script Web App for the oAuth authorization. That means that you must publish the Apps Script as a Web App, and run the code by putting the URL link into your browser address bar.  The doGet() function is what serves the HTML to the browser.  This app has a user interface that asks for a source and target file.  After you have run the authorization, you must refresh the browser tab, and the user interface will be shown.  Choose the file names and click the "Overwrite" button.  If there are files in the source that are not in the target file, the code makes a list of those files, and displays them in the browser.  This avoids needing to manually go through the files to figure out what is missing in the target.

If you are not familiar with GitHub, this README file is only for the purpose of explaining how to use the code.  You don't need to copy or download it.

All the files with a name begining with "GS" are server side ".gs" script files, as opposed to HTML files.

The way that the file is updated, and the content from the files is retrieved is with an HTTP Request made with the fetch() method of the UrlFetchApp Class.  UrlFetchApp.fetch()   And the REST Api for Drive.

Make sure to view the response coming back from the UrlFetchApp.fetch(url) call that gets the source data the first time you run the code.  If you didn't turn on the Google Apps Script API, you will get an error that looks like this:

    "error": {
      "code": 403,
      "message": "Google Apps Script API has not been used in project project-id-123 before or it is disabled. Enable it by visiting   https://console.developers.google.com/apis/api/script.googleapis.com/overview?project=project-id-123 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.",
      "status": "PERMISSION_DENIED",
    
 Use the URL given to go directly to the page that is needed to turn on the Google Apps Script API
