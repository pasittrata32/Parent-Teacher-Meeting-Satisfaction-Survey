/**
 * This script is designed to be deployed as a Google Apps Script Web App.
 * It receives POST requests with JSON data from the survey form and appends
 * the data to a specific Google Sheet tab based on the respondent's 
 * "Grade Level" and "Programme".
 *
 * How to use:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this entire code into the script editor.
 * 4. Save the project.
 * 5. Click Deploy > New deployment.
 * 6. Select Type: Web app.
 * 7. Set 'Who has access' to 'Anyone'.
 * 8. Deploy and authorize the script.
 * 9. Copy the generated Web app URL and paste it into the SCRIPT_URL constant in App.tsx.
 */

function doPost(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  try {
    const data = JSON.parse(e.postData.contents);

    // 1. Determine the target sheet name from form data.
    const gradeLevel = data.gradeLevel;
    const programme = data.programme;

    if (!gradeLevel || !programme) {
      // If essential classification data is missing, log to a default sheet.
      const incompleteSheetName = "Incomplete Submissions";
      let incompleteSheet = spreadsheet.getSheetByName(incompleteSheetName);
      if (!incompleteSheet) {
        incompleteSheet = spreadsheet.insertSheet(incompleteSheetName);
        incompleteSheet.getRange(1, 1, 1, 3).setValues([["Timestamp", "Error", "Raw Data"]]).setFontWeight("bold");
      }
      incompleteSheet.appendRow([new Date(), "Missing Grade Level or Programme", e.postData.contents]);
      return ContentService.createTextOutput(JSON.stringify({ "result": "logged as incomplete" })).setMimeType(ContentService.MimeType.JSON);
    }

    const sheetName = `${gradeLevel} - ${programme}`;

    // 2. Get the sheet by name, or create it if it doesn't exist.
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }

    // 3. Get existing headers from the first row of the target sheet.
    const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn() > 0 ? sheet.getLastColumn() : 1);
    const headers = headerRange.getValues()[0];
    
    // Create a map for quick header-to-column-index lookup.
    const headerMap = {};
    headers.forEach((header, i) => {
      if(header) {
        headerMap[header] = i + 1; // 1-based index
      }
    });

    // If the sheet is completely empty, initialize default headers.
    if (!headers || !headers[0]) {
      const initialHeaders = [
        "Timestamp", "Role", "Grade Level", "Programme",
        "Positive Feedback", "Improvement Feedback",
        "Activity Suggestions", "Other Suggestions"
      ];
      sheet.getRange(1, 1, 1, initialHeaders.length).setValues([initialHeaders]).setFontWeight("bold");
      // Re-populate the header map after creation
      initialHeaders.forEach((header, i) => {
        headerMap[header] = i + 1;
      });
    }
    
    // 4. Prepare the row data based on current headers.
    const rowDataByHeader = {
      "Timestamp": new Date(),
      "Role": data.role,
      "Grade Level": data.gradeLevel,
      "Programme": data.programme,
      "Positive Feedback": data.positiveFeedback,
      "Improvement Feedback": data.improvementFeedback,
      "Activity Suggestions": data.activitySuggestions,
      "Other Suggestions": data.otherSuggestions
    };

    // Add rating data. The keys in data.ratings are the full question texts.
    for (const question in data.ratings) {
      if (!headerMap[question]) {
        // If a question header doesn't exist, add it to the sheet and our map.
        const newColumnIndex = sheet.getLastColumn() + 1;
        sheet.getRange(1, newColumnIndex).setValue(question).setFontWeight("bold");
        headerMap[question] = newColumnIndex;
      }
      rowDataByHeader[question] = data.ratings[question];
    }
    
    // 5. Convert the mapped row data object into an array in the correct column order.
    const finalHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const newRow = finalHeaders.map(header => rowDataByHeader[header] || "");

    // Append the new row to the sheet.
    sheet.appendRow(newRow);

    // Return a success response.
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "sheet": sheetName }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log any errors for debugging in the Apps Script console.
    Logger.log(error.toString());
    
    // Also attempt to log the error to a dedicated "Script Errors" sheet.
    try {
        const errorSheetName = "Script Errors";
        let errorSheet = spreadsheet.getSheetByName(errorSheetName);
        if(!errorSheet) {
            errorSheet = spreadsheet.insertSheet(errorSheetName);
            errorSheet.getRange(1, 1, 1, 3).setValues([["Timestamp", "Error Message", "Request Data"]]).setFontWeight("bold");
        }
        errorSheet.appendRow([new Date(), error.toString(), e.postData ? e.postData.contents : "N/A"]);
    } catch (logError) {
        Logger.log("Failed to log error to sheet: " + logError.toString());
    }

    // Return an error response to the client.
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
