var fetcha = (function(po) {
    'use strict';
    // this is namespace object
    var lkcmvaowperuy = {};

    // a function in this namespace
    lkcmvaowperuy.fetch_ = function (po) {
      Logger.log('fetch_ ran')
      var e, payload, options,r,res,w,url;
      
      if (!po.url) {
        errHndl_(undefined,'vnhoa8rylfihads','There is no URL for the HTTPS Request') 
        return false;
      }
      
      url = po.url;
      options = {};
      
      options.muteHttpExceptions = false;//Always set to true
      
      if (po.contentType) {
        options.contentType = po.contentType;
      }
      
      if (po.headers) {
        options.headers = po.headers;
      }
      if (po.payload) {
        options.payload = po.payload;
      }
      
      options.method = po.method;

      try {
        if (options.headers != null) {
          options.headers["User-Agent"] = "Mozilla/5.0 Firefox/26.0";
        }
        
        Logger.log('url: ' + url)
        Logger.log('options: ' + options)
        
        res = UrlFetchApp.fetch(url, options);
        Logger.log('res: ' + res)
      } catch (e) {
        Logger.log('e.message: ' + e.message)
        errHndl_(e,'lkcmvaowperuy.fetch_','Error making HTTPS request')
      }
      try {
        r = JSON.parse(res.getContentText());
      } catch (e) {
        
      }
      return r;
    };  
    return lkcmvaowperuy;
})();

function testIt() {
  var rtrn;
  
  var po = {
    'url':'www.google.com',
    'method':'get'
  }
  
  rtrn = fetcha.fetch_(po);
  
  Logger.log(rtrn)
}