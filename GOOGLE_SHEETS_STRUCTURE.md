# Amante Forms - Google Sheets Structure

This document provides the exact structure for your Google Sheets database. Create a single Google Sheet called "Amante Forms Database" with 5 separate sheets (tabs).

---

## Sheet 1: Reservations

**Column Headers (Row 1):**

```
Timestamp | Date | Time | Party Size | Space Preference | Occasion | Full Name | Phone | Email | Special Requests | SMS Consent | Status | Notes
```

**Column Details:**
- **Timestamp**: Auto-generated submission time
- **Date**: Reservation date
- **Time**: Time slot selected
- **Party Size**: Number of guests (1-20)
- **Space Preference**: Any / Rooftop Restaurant / Lounge / Café & Bakery / Club / Private Dining
- **Occasion**: Birthday / Anniversary / Date Night / Business Meeting / Celebration / Other / Just Dining
- **Full Name**: Guest name
- **Phone**: Contact number
- **Email**: Email address
- **Special Requests**: Dietary restrictions, accessibility needs, etc.
- **SMS Consent**: TRUE / FALSE
- **Status**: Pending / Confirmed / Cancelled (manually updated by staff)
- **Notes**: Staff notes (manually added)

---

## Sheet 2: Contact

**Column Headers (Row 1):**

```
Timestamp | Inquiry Type | Name | Email | Phone | Message | Status | Assigned To | Response Sent | Notes
```

**Column Details:**
- **Timestamp**: Auto-generated submission time
- **Inquiry Type**: Reservation / Event / General / Corporate / Jobs / Press / Issue / Feedback
- **Name**: Contact name
- **Email**: Email address
- **Phone**: Contact number
- **Message**: Full message content
- **Status**: New / In Progress / Resolved (manually updated)
- **Assigned To**: Staff member handling (manually added)
- **Response Sent**: TRUE / FALSE (manually updated)
- **Notes**: Staff notes (manually added)

---

## Sheet 3: Private Events

**Column Headers (Row 1):**

```
Timestamp | Event Type | Event Date | Guest Count | Budget Range | Space Preference | Full Name | Phone | Email | Company | Requirements | Preferred Contact | Status | Follow-up Date | Proposal Sent | Notes
```

**Column Details:**
- **Timestamp**: Auto-generated submission time
- **Event Type**: Birthday / Anniversary / Corporate / Proposal / Celebration / Other
- **Event Date**: Planned event date
- **Guest Count**: Number of guests (1-500)
- **Budget Range**: ₹50k-1L / ₹1L-2L / ₹2L-5L / ₹5L+
- **Space Preference**: Private Dining / Rooftop Restaurant / Banquet Hall / Lounge / Any
- **Full Name**: Client name
- **Phone**: Contact number
- **Email**: Email address
- **Company**: Company/Organization name (optional)
- **Requirements**: Event vision and requirements
- **Preferred Contact**: Phone / WhatsApp / Email
- **Status**: New / Contacted / Proposal Sent / Confirmed / Cancelled (manually updated)
- **Follow-up Date**: Next follow-up date (manually added)
- **Proposal Sent**: TRUE / FALSE (manually updated)
- **Notes**: Staff notes (manually added)

---

## Sheet 4: Feedback

**Column Headers (Row 1):**

```
Timestamp | Visit Date | Space Visited | Overall Rating | Food Rating | Service Rating | Ambiance Rating | Value Rating | What You Loved | Improvements | Would Recommend | Name | Email | Can Share Publicly | Status | Response Sent | Notes
```

**Column Details:**
- **Timestamp**: Auto-generated submission time
- **Visit Date**: Date of visit
- **Space Visited**: Café & Bakery / Rooftop Restaurant / Lounge / Club / Private Dining / Banquet
- **Overall Rating**: 1-5 stars
- **Food Rating**: 1-5 stars
- **Service Rating**: 1-5 stars
- **Ambiance Rating**: 1-5 stars
- **Value Rating**: 1-5 stars
- **What You Loved**: Positive feedback text
- **Improvements**: Suggestions for improvement
- **Would Recommend**: Definitely / Probably / Maybe / No
- **Name**: Guest name (optional)
- **Email**: Email address (optional)
- **Can Share Publicly**: TRUE / FALSE
- **Status**: New / Reviewed / Action Taken (manually updated)
- **Response Sent**: TRUE / FALSE (manually updated)
- **Notes**: Management notes (manually added)

---

## Sheet 5: Careers

**Column Headers (Row 1):**

```
Timestamp | Position | Full Name | Email | Phone | Current City | Experience Years | Current Position | Expected Salary | Portfolio URL | Resume URL | Why Amante | Available From | Status | Interview Scheduled | Hired | Notes
```

**Column Details:**
- **Timestamp**: Auto-generated submission time
- **Position**: Chef / Sous Chef / Bartender / Server / Host / Manager / Housekeeping / Kitchen Staff / Security / Other
- **Full Name**: Applicant name
- **Email**: Email address
- **Phone**: Contact number
- **Current City**: City of residence
- **Experience Years**: Years of experience (0-50)
- **Current Position**: Current/most recent job title
- **Expected Salary**: Monthly salary expectation in INR
- **Portfolio URL**: LinkedIn or portfolio link
- **Resume URL**: Link to uploaded resume file
- **Why Amante**: Motivation and value proposition
- **Available From**: Date available to join
- **Status**: New / Under Review / Shortlisted / Rejected / On Hold (manually updated)
- **Interview Scheduled**: Date/Time (manually added)
- **Hired**: TRUE / FALSE (manually updated)
- **Notes**: HR notes (manually added)

---

## Setup Instructions

### Step 1: Create the Google Sheet
1. Go to Google Sheets (sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"Amante Forms Database"**

### Step 2: Create Sheet Tabs
1. Rename "Sheet1" to **"Reservations"**
2. Create 4 more sheets and name them:
   - **"Contact"**
   - **"Private Events"**
   - **"Feedback"**
   - **"Careers"**

### Step 3: Add Headers
For each sheet, copy the column headers from above into Row 1.

**Important formatting:**
- Make Row 1 **bold**
- Apply a background color (e.g., light blue or light gray)
- Freeze Row 1 (View > Freeze > 1 row)
- Auto-resize columns to fit content

### Step 4: Optional - Data Validation
You can add dropdown validation for manually-updated columns like "Status" to ensure consistency.

### Step 5: Get Sheet ID
After setup, you'll need the Google Sheet ID for API integration. It's in the URL:
```
https://docs.google.com/spreadsheets/d/[SHEET_ID_HERE]/edit
```

---

## Next Steps

Once you've created the sheets with these exact column headers:

1. Share the sheet with edit permissions to the service account email (we'll set this up)
2. Copy the Sheet ID
3. We'll integrate each form to append data to the corresponding sheet

---

## Sample Data (for testing)

### Reservations Sample Row:
```
2025-01-07 14:30:00 | 2025-01-15 | 7:00 PM | 4 | Rooftop Restaurant | Anniversary | John Doe | +919893779100 | john@example.com | Window seat preferred | TRUE | Pending |
```

### Contact Sample Row:
```
2025-01-07 14:30:00 | General | Jane Smith | jane@example.com | +919893779100 | What are your opening hours? | New | | FALSE |
```

### Private Events Sample Row:
```
2025-01-07 14:30:00 | Corporate | 2025-02-14 | 50 | ₹2L-5L | Banquet Hall | Rajesh Kumar | +919893779100 | rajesh@company.com | ABC Corp | Team annual party with DJ | WhatsApp | New | | FALSE |
```

### Feedback Sample Row:
```
2025-01-07 14:30:00 | 2025-01-06 | Café & Bakery | 5 | 5 | 5 | 4 | 4 | Amazing coffee and pastries! | Could have more vegan options | Definitely | Priya Sharma | priya@example.com | TRUE | New | FALSE |
```

### Careers Sample Row:
```
2025-01-07 14:30:00 | Chef | Amit Verma | amit@example.com | +919893779100 | Bhopal | 5 | Sous Chef at XYZ Hotel | 45000 | https://linkedin.com/in/amit | https://drive.google.com/file/xyz | Passionate about fusion cuisine | 2025-02-01 | New | | FALSE |
```

---

## Google Sheets Tips

### Auto-numbering (Optional)
Add a column A before Timestamp with formula: `=ROW()-1`

### Conditional Formatting
Highlight rows based on status:
- Status = "Pending" → Yellow
- Status = "Confirmed" → Green
- Status = "Cancelled" → Red

### Filters
Add filters to Row 1 for easy searching and sorting.

### Protection
Protect the header row (Row 1) from accidental editing.
