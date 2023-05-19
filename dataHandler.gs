function post() {

  // hash map of Month abbriviations and their equivalents
  let months = new Map([["Jan", "January"], ["Feb", "February"], ["Mar", "March"], ["Apr", "April"], ["May", "May"], ["Jun", "June"], ["Jul", "July"], ["Aug", "August"], ["Sep", "September"], ["Oct", "October"], ["Nov", "November"], ["Dec", "December"]]);

  // initialize workbook and input sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName("Input");

  // determines which sheet to append based on date submitted
  var date = inputSheet.getRange("B3").getValue();
  date = date.toString();
  var sheetToBeUsed = "";
  sheetToBeUsed = date.substring(4, 7);
  
  // extracts day from the date entered
  var day = date.substring(8,10);

  // extracts  $ amount of the transaction
  var amount = inputSheet.getRange("C3").getValue();

  // extracts spending/earning category 
  var category = inputSheet.getRange("D3").getValue();

  // extracts payment method for expenses
  var paymentMethod = inputSheet.getRange("E3").getValue();

  // extracts description of transaction
  var description = inputSheet.getRange("F3").getValue();

  

    
  
  
  // creates the sheet to be posted (sheet in the same month as date)
  var sheetToPost = ss.getSheetByName(months.get(sheetToBeUsed));
  
  // gets the number of transactions from the sheet to be posted to determine which row to append to
  var numTransactions = sheetToPost.getRange("E66").getValue();
  
  // data starts on row 4 and is adjusted by the number of transactions already recorded
  var rowPosition = numTransactions + 4; 


                
  // determines the transaction type so we know how to post our data and where
  var transactionType = inputSheet.getRange("A3").getValue();

  
  // posts data according to the type of transaction entered in the input sheet
  if (transactionType == "Income") {

    // posts data for income transaction
    sheetToPost.getRange(rowPosition, 1, 1, 1).setValue(day);
    sheetToPost.getRange(rowPosition, 3, 1, 1).setValue(amount);
    sheetToPost.getRange(rowPosition, 4, 1, 1).setValue(category);
    sheetToPost.getRange(rowPosition, 5, 1, 1).setValue(description);


  } else if (transactionType == "Investment") {

    // posts data for investment transaction
    sheetToPost.getRange(rowPosition, 1, 1, 1).setValue(day);
    sheetToPost.getRange(rowPosition, 10, 1, 1).setValue(amount);
    sheetToPost.getRange(rowPosition, 11, 1, 1).setValue(description);

  } else {

    // posts data for expense transaction
    sheetToPost.getRange(rowPosition, 1, 1, 1).setValue(day);
    sheetToPost.getRange(rowPosition, 6, 1, 1).setValue(amount);
    sheetToPost.getRange(rowPosition, 7, 1, 1).setValue(category);
    sheetToPost.getRange(rowPosition, 8, 1, 1).setValue(paymentMethod);
    sheetToPost.getRange(rowPosition, 9, 1, 1).setValue(description);

  }

               

  // increments number of transactions of sheet appended to by 1
  sheetToPost.getRange(66, 5, 1, 1).setValue(numTransactions + 1);

  // clears all data entered in input sheet
  clear();

  


}












// clears all data in input sheet
function clear() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName("Input");
  var rangesCleared = ["A3", "B3", "C3", "D3", "F3"];
  
  for (var i = 0; i < rangesCleared.length; i++) {
    inputSheet.getRange(rangesCleared[i]).clearContent();
  }
}
