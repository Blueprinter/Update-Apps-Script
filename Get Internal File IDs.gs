function doShit() {

  if (!driveService.hasAccess()) {
    var authorizationUrl = driveService.getAuthorizationUrl();
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Refresh the page when authorization complete.');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    return page;
  } else {

    var scriptID = "1MIpnWP7-K4jdomuo8WV0FYKrohYQb6E17HeJTe85Yr02WHMO_WDalJGJ";
         //GET https://www.googleapis.com/drive/v3/files/0B9jNhSvVjoIVM3dKcGRKRmVIOVU?alt=media
    //var url = "https://www.googleapis.com/drive/v3/files/" + scriptID + "?alt=media";
    var downloadUrl = "https://script.google.com/feeds/download/export?id=" + scriptID + "&format=json";

    var options = {
      "kind": "drive#file",
      "id": scriptID,
      "downloadUrl": downloadUrl,
      "headers": {
         'Authorization': 'Bearer ' +  ScriptApp.getOAuthToken(),
       },
      "contentType": "application/vnd.google-apps.script+json",
      "method" : "GET"
    };

    //var response = UrlFetchApp.fetch(exportURL);
    //Logger.log(response)
    var response = UrlFetchApp.fetch(downloadUrl, options);
    //Logger.log(response)
    //return HtmlService.createHtmlOutput(response.getContentText());
  };
};