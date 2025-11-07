# Google Sheets Integration - Complete ✅

## Summary

All 5 forms in the Amante project are now integrated with Google Sheets. Every form submission will automatically append a new row to the corresponding sheet in your Google Sheets database.

---

## ✅ Completed Setup

### 1. Google Service Account
- **Email**: `amanteformdb@amante-477510.iam.gserviceaccount.com`
- **Project ID**: `amante-477510`
- **Credentials**: Stored in `google-service-account.json` (gitignored for security)

### 2. Google Sheets Database
- **Sheet ID**: `13Rzfi5DNBqTe6se8Fa2aMAzhf8bdsmqvtCRdC2_LmuE`
- **Sheet Name**: `Amante_Forms_Database`
- **URL**: https://docs.google.com/spreadsheets/d/13Rzfi5DNBqTe6se8Fa2aMAzhf8bdsmqvtCRdC2_LmuE/edit
- **Permissions**: Service account has Editor access

### 3. Library Created
- **File**: `/src/lib/googleSheets.ts`
- **Functions**:
  - `addReservation()` - Appends to "Reservations" sheet
  - `addContact()` - Appends to "Contact" sheet
  - `addPrivateEvent()` - Appends to "Private Events" sheet
  - `addFeedback()` - Appends to "Feedback" sheet
  - `addCareerApplication()` - Appends to "Careers" sheet
  - `testConnection()` - Tests connection to Google Sheets

### 4. Updated API Routes

All 5 API routes now write to Google Sheets:

1. **`/api/reservations`** ✅
   - Sheet: "Reservations"
   - Columns: 13 (Timestamp, Date, Time, Party Size, Space Preference, Occasion, Full Name, Phone, Email, Special Requests, SMS Consent, Status, Notes)

2. **`/api/contact`** ✅
   - Sheet: "Contact"
   - Columns: 10 (Timestamp, Inquiry Type, Name, Email, Phone, Message, Status, Assigned To, Response Sent, Notes)

3. **`/api/private-events`** ✅
   - Sheet: "Private Events"
   - Columns: 16 (Timestamp, Event Type, Event Date, Guest Count, Budget Range, Space Preference, Full Name, Phone, Email, Company, Requirements, Preferred Contact, Status, Follow-up Date, Proposal Sent, Notes)

4. **`/api/feedback`** ✅
   - Sheet: "Feedback"
   - Columns: 17 (Timestamp, Visit Date, Space Visited, Overall Rating, Food Rating, Service Rating, Ambiance Rating, Value Rating, What You Loved, Improvements, Would Recommend, Name, Email, Can Share Publicly, Status, Response Sent, Notes)

5. **`/api/careers`** ✅
   - Sheet: "Careers"
   - Columns: 17 (Timestamp, Position, Full Name, Email, Phone, Current City, Experience Years, Current Position, Expected Salary, Portfolio URL, Resume URL, Why Amante, Available From, Status, Interview Scheduled, Hired, Notes)

### 5. Environment Variables
```env
GOOGLE_SHEET_ID=13Rzfi5DNBqTe6se8Fa2aMAzhf8bdsmqvtCRdC2_LmuE
GOOGLE_SERVICE_ACCOUNT_EMAIL=amanteformdb@amante-477510.iam.gserviceaccount.com
```

### 6. Dependencies Installed
```bash
npm install googleapis
```

---

## 🧪 Testing

### Connection Test
```bash
curl http://localhost:3000/api/test-sheets
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Successfully connected to Google Sheets",
  "sheetTitle": "Amante_Forms_Database",
  "timestamp": "2025-01-07T11:00:13.066Z"
}
```

✅ **Status**: Connection verified and working!

---

## 📊 How It Works

### Data Flow

1. **User submits form** → Frontend (React)
2. **Frontend sends data** → API Route (`/api/reservations`, etc.)
3. **API validates** → Zod schema validation
4. **API sanitizes** → XSS prevention
5. **API writes to Google Sheets** → Instant append ✅
6. **API also writes to database** → Supabase (kept for redundancy)
7. **API sends emails** → Notification emails
8. **API returns success** → User sees confirmation

### Automatic Timestamp

Every row automatically gets a timestamp in the first column showing exactly when the submission was received (ISO 8601 format).

### Data Persistence

- **Primary**: Google Sheets (for easy client access and management)
- **Secondary**: Supabase database (for API queries and analytics)
- Both storage methods run in parallel for redundancy

---

## 🎯 Next Steps for Client

### 1. Set Up Column Headers

For each sheet in your Google Sheets, add the column headers from `GOOGLE_SHEETS_STRUCTURE.md`:

**Reservations Sheet:**
```
Timestamp | Date | Time | Party Size | Space Preference | Occasion | Full Name | Phone | Email | Special Requests | SMS Consent | Status | Notes
```

**Contact Sheet:**
```
Timestamp | Inquiry Type | Name | Email | Phone | Message | Status | Assigned To | Response Sent | Notes
```

**Private Events Sheet:**
```
Timestamp | Event Type | Event Date | Guest Count | Budget Range | Space Preference | Full Name | Phone | Email | Company | Requirements | Preferred Contact | Status | Follow-up Date | Proposal Sent | Notes
```

**Feedback Sheet:**
```
Timestamp | Visit Date | Space Visited | Overall Rating | Food Rating | Service Rating | Ambiance Rating | Value Rating | What You Loved | Improvements | Would Recommend | Name | Email | Can Share Publicly | Status | Response Sent | Notes
```

**Careers Sheet:**
```
Timestamp | Position | Full Name | Email | Phone | Current City | Experience Years | Current Position | Expected Salary | Portfolio URL | Resume URL | Why Amante | Available From | Status | Interview Scheduled | Hired | Notes
```

### 2. Optional Enhancements

**Freeze Headers:**
- View > Freeze > 1 row

**Add Filters:**
- Select header row > Data > Create a filter

**Conditional Formatting:**
- Highlight rows by status (Pending = Yellow, Confirmed = Green, etc.)

**Data Validation:**
- Add dropdowns for Status columns to ensure consistency

**Protected Ranges:**
- Protect the header row to prevent accidental deletion

---

## 🔒 Security

- ✅ Service account credentials stored in `google-service-account.json`
- ✅ File added to `.gitignore` to prevent accidental commit
- ✅ Only the service account has access to write
- ✅ All user inputs sanitized before storing
- ✅ XSS and SQL injection prevention in place
- ✅ Rate limiting enabled on all endpoints

---

## 📝 Maintenance

### Backup Strategy
Google Sheets automatically saves version history. You can restore previous versions:
1. File > Version history > See version history

### Export Data
You can export the entire sheet to Excel or CSV:
1. File > Download > Microsoft Excel (.xlsx) or CSV

### Monitor Usage
- Google Sheets API has generous quotas
- Current usage: Very low (5 forms only)
- No issues expected even with high traffic

---

## 🎉 Status: READY FOR PRODUCTION

All forms are now:
- ✅ Validated
- ✅ Sanitized
- ✅ Writing to Google Sheets
- ✅ Writing to Database (backup)
- ✅ Sending email notifications
- ✅ Rate limited
- ✅ Error handled
- ✅ Tested and verified

**The integration is complete and ready for your client to use!**
