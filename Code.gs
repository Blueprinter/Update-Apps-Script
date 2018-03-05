//This code does NOT require an OAuth library or any set up in the Cloud Platform

function doGet() {//Serves the HTML to the browser
  return HtmlService.createTemplateFromFile('HTML_Index').evaluate().setTitle('Over_Write')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
};

function evalTpmlt_(fileName){
  var h;
try{
  h = HtmlService.createTemplateFromFile(fileName).evaluate().getContent();
  return h;
}catch(e){
  //sendMsg(e,'evalTpmlt',undefined,'There was a error making the HTML: '+fileName);
  return '<div>Error getting Template Content!</div>';};
};

