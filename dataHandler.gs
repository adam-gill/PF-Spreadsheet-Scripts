function post() {

  let months = new Map([["Jan", "January"], ["Feb", "February"], ["Mar", "March"], ["Apr", "April"], ["May", "May"], ["Jun", "June"], ["Jul", "July"], ["Aug", "August"], ["Sep", "September"], ["Oct", "October"], ["Nov", "November"], ["Dec", "December"]]);

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName("Input");

  var date = inputSheet.getRange("B3").getValue();

  console.log(typeof(date));

  date.toString();

  console.log(typeof(date));


  console.log(date);

  var sheetToBeUsed = "";

  
  sheetToBeUsed = date.substring(4, 7);

  console.log(sheetToBeUsed);
    
  
  

  var sheetToPost = ss.getSheetByName(months.get(sheetToBeUsed));
  console.log(sheetToBeUsed);


  var values = [[inputSheet.getRange("A3").getValue(),
                 inputSheet.getRange("B3").getValue(),
                 inputSheet.getRange("C3").getValue(),
                 inputSheet.getRange("D3").getValue(),
                 inputSheet.getRange("E3").getValue(),
                 inputSheet.getRange("F3").getValue()]];
  
  sheetToPost.getRange(sheetToPost.getLastRow()+1, 1, 1, 6).setValues(values);

  clear();

  


}




function clear() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName("Input");
  var rangesCleared = ["A3", "B3", "C3", "D3", "F3"];
  
  for (var i = 0; i < rangesCleared.length; i++) {
    inputSheet.getRange(rangesCleared[i]).clearContent();
  }
}
