function sendEvaluation() {
  const worksheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 
  var lastRow = worksheet.getLastRow();
  var lastCol = worksheet.getLastColumn();

  var gridName = worksheet.getName();
 

  const htmlTemplate = HtmlService.createTemplateFromFile('email');
  htmlTemplate.gridName = gridName;
  htmlTemplate.lastCol = lastCol;
  htmlTemplate.lastRow = lastRow;
  
  for(var i = 2; i <= lastRow; i++) 
  {
    var headerList = [];
    var scores = []; 
    var currentEmail = worksheet.getRange(i, 1).getValue();
    for(var col = 2; col <= lastCol; col++) {
      var header = worksheet.getRange(1,col).getValue();
      var record = worksheet.getRange(i, col).getValue();
      headerList.push(header);
      scores.push(record);
    }
    var username = currentEmail.substring(0,currentEmail.indexOf("@"));
    var firstname = username.substring(0,username.indexOf("."));
    var lastname = username.substring(username.indexOf(".") + 1);
    htmlTemplate.firstname = firstname;
    htmlTemplate.lastname = lastname;
    htmlTemplate.headerList = headerList;
    htmlTemplate.scores = scores;
    // console.log(currentEmail)
    const htmlFormEmail = htmlTemplate.evaluate().getContent();
    // GmailApp.sendEmail(currentEmail, 'Evaluation','Good luck!', {htmlBody: htmlFormEmail});
    
  }

}

function include(File) {
  return HtmlService.createHtmlOutputFromFile(File).getContent();
}

