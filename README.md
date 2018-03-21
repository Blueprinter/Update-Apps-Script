# apps-script-update
 
 * Overwrites an existing (Target) Apps Script file with content coming from a source Apps Script file.

This repository is Apps Script code.  You must use the Apps Script code editor: https://script.google.com

You must somehow get the code in this repository into an Apps Script file that you own, then publish the Apps Script file as a web app.

You can fork this repository into your Git Hub account, then from the Apps Script code editor, use the "Git Hub Assistant" Chome Extension to pull this code into your Apps Script file.  From your Chrome Browser, choose "More Tools" then "Extensions"  Scroll down, and click the "Get more extensions" link.  Search for github assistant.  Install the Google Apps Script Github Assistant.

After you get this code into your Apps Script file, you can publish it as a Web App.  In the code editor, choose the "Publish" menu and click the menu item "Deploy as web app"

Publish -> Deploy as web app

This Web App does not use an OAuth library.  The OAuth library is not needed.  You do not need to do anything in your Google Cloud Console to get this web app to use the Google Apps Script API.

This version uses the new Google Apps Script API.  [https://developers.google.com/apps-script/api/](https://developers.google.com/apps-script/api/)

Some of the options and features in this Web App may not work, but I use the options to remove blank lines, remove comments, and remove leading spaces and that has been working.

This Apps Script Web App will update an existing Apps Script file (target) with the content of another Apps Script file (source).  This code is an Apps Script project.  You must use Apps Script to implement this code.  https://script.google.com

There are other features and options that I've been working on that I don't use, are under developement, are still kind of rough, and may or may not work.  If anyone wants to provide improvements to the code, email me at the Google Plus Community:  

https://plus.google.com/communities/108983987381241798015

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

You must edit your manifest file.  In the code editor, choose "View" - "Show manifest file"

    {
      "timeZone": "Your time zone here",
      "oauthScopes": [
        "https://www.googleapis.com/auth/script.projects",
        "https://www.googleapis.com/auth/script.external_request",
      ],
      "dependencies": {
      },
      "exceptionLogging": "STACKDRIVER"
    }

Actually, all the scopes used by the web app are:

    "oauthScopes": [
        "https://www.googleapis.com/auth/script.projects", 
        "https://www.googleapis.com/auth/drive.scripts", 
        "https://mail.google.com/", 
        "https://www.googleapis.com/auth/drive", 
        "https://www.googleapis.com/auth/forms", 
        "https://www.googleapis.com/auth/script.container.ui", 
        "https://www.googleapis.com/auth/script.external_request", 
        "https://www.googleapis.com/auth/script.scriptapp", 
        "https://www.googleapis.com/auth/spreadsheets", 
        "https://www.googleapis.com/auth/userinfo.email"
      ]
      
You can choose whether to add them all, or just the ones you want.  

One important thing to know, is that the mainifest file is always overwritten, and the manifest file, which is JSON type and named appsscript.json MUST be in the source data to update the target file.

The "update" method of the Apps Script API can and does always replace the manifest file.  So, you can do things like change the library version to another version in this way.

The main function is in the file GS_Main.  Start there.

The main function controls the program flow for the entire process.

The structure of the JSON object data is critical to understand.

You must turn on a button in the developer console to allow the Apps Script file to change your Apps Script files.

You must enable the Google Apps Script API in the Google Cloud platform developer console. 

From the Apps Script code editor:

* "Resources" menu
* Cloud Platform project
* View API console
* Enable APIs and Services
* Search for: Google Apps Script

FILE CONTENT STRUCTURE

The file content is not directly associated with any key, like an inner file ID.  So you can't retrieve file content directly by file name.  Of course, you can know what content is associated with that file name, but the code must first find the object with that file name.
Each file content object is an element in an array of files.  The array maintains the original file order, but you can't access elements in an array by anything but the index number, or loop through the entire array, check each inner object for the file name.

    [
      {"name":"appsscript",
       "type":"JSON",
       "source":"{\n  \"timeZone\": \"America/New_York\",\n  \"dependencies\": {\n  },\n  \"exceptionLogging\": \"STACKDRIVER\"\n}",
       "lastModifyUser":{
           "email":"example@gmail.com",
           "name":"First Last",
           "photoUrl":"https://lh5.googleusercontent.com/123/h128/photo.jpg"
       },
       "createTime":"2018-03-04T19:37:26.798Z",
       "updateTime":"2018-03-04T19:37:26.798Z",
       "functionSet":{}
      },
  
      {"name":"Code",
       "type":"SERVER_JS",
       "source":"function myFunction() {\n  \n}\n",
       "lastModifyUser":{
               "email":"example@gmail.com",
               "name":"First Last",
               "photoUrl":"https://lh5.googleusercontent.com/123/h128/photo.jpg"
       },
       "createTime":"2018-03-04T19:49:08.868Z",
       "updateTime":"2018-03-04T19:49:08.871Z",
       "functionSet":{
          "values":[{"name":"myFunction"}]}
       }
    ]


