# คู่มือการตั้งค่า Google Apps Script สำหรับแบบฟอร์มสำรวจ

เอกสารนี้อธิบายขั้นตอนการตั้งค่าสคริปต์สำหรับ Google Sheet เพื่อรับข้อมูลจากแบบฟอร์มสำรวจความพึงพอใจ โดยสคริปต์จะทำการแยกข้อมูลและบันทึกลงในชีตต่างๆ ตาม "ระดับชั้น" และ "โปรแกรมการเรียน" ที่ผู้ใช้กรอกโดยอัตโนมัติ

## คุณสมบัติหลัก

-   **การแยกชีตอัตโนมัติ**: สร้างและบันทึกข้อมูลลงในชีตที่มีชื่อตามรูปแบบ `[ระดับชั้น] - [โปรแกรมการเรียน]` (เช่น "อนุบาล - ภาษาไทย")
-   **การสร้างหัวตารางอัตโนมัติ**: หากชีตเป้าหมายยังไม่มีหัวตาราง สคริปต์จะสร้างให้โดยอัตโนมัติตามข้อมูลที่ได้รับ
-   **รองรับคำถามที่เปลี่ยนแปลง**: หากมีคำถามในแบบประเมินเพิ่มขึ้น สคริปต์จะเพิ่มคอลัมน์สำหรับคำถามใหม่ในชีตโดยอัตโนมัติ

## ขั้นตอนการติดตั้ง

ทำตามขั้นตอนต่อไปนี้เพื่อติดตั้งและใช้งานสคริปต์

### 1. สร้าง Google Sheet

-   ไปที่ [sheets.google.com](https://sheets.google.com) และสร้าง Spreadsheet ใหม่
-   คุณสามารถลบ "Sheet1" ที่มีอยู่เริ่มต้นได้ สคริปต์จะสร้างชีตใหม่ตามที่ต้องการเอง

### 2. เปิด Apps Script Editor

-   ใน Google Sheet ที่สร้างขึ้นใหม่ ไปที่เมนู **ส่วนขยาย (Extensions)** > **Apps Script**
-   หน้าต่างแก้ไขโค้ดจะเปิดขึ้นในแท็บใหม่

### 3. วางโค้ดสคริปต์

-   ลบโค้ดทั้งหมดที่อยู่ในไฟล์ `Code.gs`
-   คัดลอกโค้ดทั้งหมดด้านล่างนี้และนำไปวางในหน้าต่างแก้ไขโค้ด

```javascript
/**
 * This script is designed to be deployed as a Google Apps Script Web App.
 * It receives POST requests with JSON data from the survey form and appends
 * the data to a specific Google Sheet tab based on the respondent's 
 * "Grade Level" and "Programme".
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
    
    const headerMap = {};
    headers.forEach((header, i) => {
      if(header) {
        headerMap[header] = i + 1; // 1-based index
      }
    });

    if (!headers || !headers[0]) {
      const initialHeaders = [
        "Timestamp", "Role", "Grade Level", "Programme",
        "Positive Feedback", "Improvement Feedback",
        "Activity Suggestions", "Other Suggestions"
      ];
      sheet.getRange(1, 1, 1, initialHeaders.length).setValues([initialHeaders]).setFontWeight("bold");
      initialHeaders.forEach((header, i) => {
        headerMap[header] = i + 1;
      });
    }
    
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

    for (const question in data.ratings) {
      if (!headerMap[question]) {
        const newColumnIndex = sheet.getLastColumn() + 1;
        sheet.getRange(1, newColumnIndex).setValue(question).setFontWeight("bold");
        headerMap[question] = newColumnIndex;
      }
      rowDataByHeader[question] = data.ratings[question];
    }
    
    const finalHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const newRow = finalHeaders.map(header => rowDataByHeader[header] || "");

    sheet.appendRow(newRow);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "sheet": sheetName }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log(error.toString());
    
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

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 4. บันทึกและตั้งชื่อโปรเจกต์

-   คลิกที่ไอคอน **บันทึกโปรเจกต์ (Save project)** (รูปแผ่นดิสก์)
-   ตั้งชื่อโปรเจกต์ของคุณ (เช่น "Survey Data Handler") แล้วคลิก **เปลี่ยนชื่อ (Rename)**

### 5. Deploy สคริปต์เป็น Web App

-   ที่มุมบนขวา คลิกที่ปุ่ม **ทำให้ใช้งานได้ (Deploy)** > **การทำให้ใช้งานได้รายการใหม่ (New deployment)**
-   คลิกที่ไอคอนรูปเฟือง (⚙️) ข้างๆ "เลือกประเภท" และเลือก **เว็บแอป (Web app)**
-   ในการตั้งค่า ให้กำหนดค่าดังนี้:
    -   **คำอธิบาย (Description)**: (ไม่บังคับ) ใส่คำอธิบายสั้นๆ เช่น "รับข้อมูลจากแบบฟอร์มสำรวจ"
    -   **เรียกใช้งานเป็น (Execute as)**: `ฉัน (Me)`
    -   **ผู้ที่มีสิทธิ์เข้าถึง (Who has access)**: **ทุกคน (Anyone)**
-   คลิกปุ่ม **ทำให้ใช้งานได้ (Deploy)**

### 6. ให้สิทธิ์การเข้าถึง (Authorize Access)

-   Google จะขอให้คุณให้สิทธิ์สคริปต์ในการเข้าถึง Google Sheet ของคุณ คลิก **ให้สิทธิ์เข้าถึง (Authorize access)**
-   เลือกบัญชี Google ของคุณ
-   คุณอาจเห็นหน้าต่าง "Google hasn't verified this app" คลิกที่ **ขั้นสูง (Advanced)** แล้วคลิก **ไปที่ [ชื่อโปรเจกต์ของคุณ] (ไม่ปลอดภัย) (Go to [Your Project Name] (unsafe))**
-   คลิก **อนุญาต (Allow)** เพื่อยืนยันการให้สิทธิ์

### 7. คัดลอก Web App URL

-   หลังจาก Deploy สำเร็จ คุณจะได้รับ **URL ของเว็บแอป (Web app URL)**
-   คลิกปุ่ม **คัดลอก (Copy)** เพื่อคัดลอก URL นี้

### 8. นำ URL ไปใช้งาน

-   เปิดไฟล์ `App.tsx` ในโปรเจกต์ของคุณ
-   ค้นหาตัวแปร `SCRIPT_URL` และวาง URL ที่คัดลอกมาแทนที่ค่าเดิม

```typescript
// ในไฟล์ App.tsx
const SCRIPT_URL = 'วาง URL ของคุณที่นี่'; // IMPORTANT: Replace with your actual deployed Google Apps Script URL
```

-   บันทึกไฟล์ `App.tsx`
-   ตอนนี้แอปพลิเคชันของคุณพร้อมที่จะส่งข้อมูลไปยัง Google Sheet ที่กำหนดค่าไว้แล้ว
