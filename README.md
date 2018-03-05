# apps-script-update
This Web App is currently not working correctly.  March 5, 2018.  This is the first time that I've uploaded the complete project.
This app no longer uses an OAuth library.  The OAuth library is no longer needed.

Updates an existing Apps Script file (target) with the content of another Apps Script file (source).  This code is an Apps Script project.  You must use Apps Script to implement this code.  https://script.google.com

This program overwrites one Apps Script file with another Apps Script file.  It includes a user interface and a file picker to get the source and target files.  

Test this code on test files that you don't care about before overwritting an important file.  Back up your target file before overwritting it.

This code will update the target Apps Script file from the source Apps Script file, with one issue.   It can not create a new file in the target that is currently in the source.  For example, if you had an HTML file in the source that was not in the target file.  So, you must manually create any new file in the target that is missing.  For example, if you create a new HTML file in the source file, and don't create a new HTML file with the same name in the target file, the code will fail.  But the code will show you a list of files that are missing from the target.  You don't need to add any initial content to the new file in the target.

You can delete a file out of the source Apps Script file, leave the file of the same name IN the target, and the code will still run successfully.  The file that is in the target won't be deleted.  So, in that situation, there will be a mismatch of the number of files in both Apps Script projects.  So, it's possible to have more files in the target than are in the source, but it's not possible to have files in the source that aren't in the target.

This code is set up to be a "Stand Alone" Apps Script Web App for the oAuth authorization. That means that you must publish the Apps Script as a Web App, and run the code by putting the URL link into your browser address bar.  The doGet() function is what serves the HTML to the browser.  This app has a user interface that asks for a source and target file.  After you have run the authorization, you must refresh the browser tab, and the user interface will be shown.  Choose the file names and click the "Overwrite" button.  If there are files in the source that are not in the target file, the code makes a list of those files, and displays them in the browser.  This avoids needing to manually go through the files to figure out what is missing in the target.

If you are not familiar with GitHub, this README file is only for the purpose of explaining how to use the code.  You don't need to copy or download it.

All the files with a name begining with "GS" are server side ".gs" script files, as opposed to HTML files.

The way that the file is updated, and the content from the files is retrieved is with an HTTP Request made with the fetch() method of the UrlFetchApp Class.  UrlFetchApp.fetch()   And the REST Api for Drive.
