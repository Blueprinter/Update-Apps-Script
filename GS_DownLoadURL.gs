function getDownloadURL() {
  //Get the download URL of the file that you want to download
  //NOTE - This uses the advanced Drive API which you must enable
  
  var fileId,fileMetaData;
  
  fileId = "1MIpnWP7-K4jdomuo8WV0FYKrohYQb6E17HeJTe85Yr02WHMO_WDalJGJ";//Paste file ID
  fileMetaData = Drive.Files.get(fileId);
  
  //Logger.log(fileMetaData.exportLinks);
}
