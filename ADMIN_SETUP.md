# Admin Panel Setup Guide

## 📋 Google Sheets Setup

### 1. Add "Users" Sheet to Your Google Spreadsheet

Open your Google Spreadsheet (ID: `13Rzfi5DNBqTe6se8Fa2aMAzhf8bdsmqvtCRdC2_LmuE`) and create a new sheet named **"Users"** with the following columns:

| Phone Number     | Name          | Role    | Access Level | Status | Added Date | Last Login |
|------------------|---------------|---------|--------------|--------|------------|------------|
| +91 98937 79100  | Owner Name    | Owner   | Full         | Active | 2025-01-07 |            |
| +91 XXXXX XXXXX  | Manager Name  | Manager | Full         | Active | 2025-01-07 |            |

### Column Descriptions:

- **Phone Number**: Full phone number with country code (e.g., +91 98937 79100)
- **Name**: Full name of the user
- **Role**: Owner / Manager / Staff
- **Access Level**: Full / View-Only (currently only Full is implemented)
- **Status**: Active / Inactive (only Active users can log in)
- **Added Date**: Date when user was added
- **Last Login**: Can be left empty (for future use)

---

## 🔐 Environment Variables

Ensure these are set in your `.env.local` file:

```env
GOOGLE_SHEET_ID=13Rzfi5DNBqTe6se8Fa2aMAzhf8bdsmqvtCRdC2_LmuE
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**Important**: Change `JWT_SECRET` to a strong random string in production!

---

## 🚀 How to Access Admin Panel

### Option 1: Direct URL
Navigate to: `http://localhost:3000/admin` (or your production domain)

### Option 2: Discreet Footer Link
Scroll to the bottom of any page and click the small bullet point (•) after "All rights reserved"

---

## 📱 Login Process

1. Enter your whitelisted phone number (must match exactly with Google Sheet)
2. Click "Access Admin Panel"
3. If authorized, you'll be redirected to the dashboard

**Note**: Only phone numbers marked as "Active" in the Users sheet can log in.

---

## 📊 Dashboard Features

### KPI Cards (Top Section)
- **Today's Reservations**: Count of reservations for today
- **Upcoming Events (7d)**: Events in the next 7 days
- **Recent Feedback**: Last 10 feedback entries
- **New Applications**: Last 10 career applications

### Today's Overview
- **Today's Reservations**: Full details with time, guests, space, phone
- **Today's Events**: Event type, guest count, organizer details

### Recent Activity
- **Recent Feedback**: Shows rating, space, and comments
- **Recent Applications**: Shows position, name, experience, email

---

## 🧭 Navigation

Use the sidebar to navigate between:
- **Dashboard**: Business snapshot (current page)
- **Reservations**: View all reservations (coming soon)
- **Events**: View all private events (coming soon)
- **Feedback**: View all feedback (coming soon)
- **Careers**: View all applications (coming soon)
- **Contact**: View all inquiries (coming soon)

---

## 🔒 Security Features

✅ Phone number whitelist authentication
✅ JWT tokens with 7-day expiration
✅ HTTP-only cookies (prevents XSS attacks)
✅ Server-side authentication verification
✅ No passwords needed (phone-based access control)

---

## 📝 Adding New Admin Users

1. Open your Google Sheet
2. Go to the "Users" tab
3. Add a new row with:
   - Phone Number (with country code)
   - Name
   - Role (Owner/Manager/Staff)
   - Access Level: Full
   - Status: Active
   - Added Date: Today's date
4. Save the sheet
5. The new user can now log in immediately!

---

## 🔧 Troubleshooting

### "Access denied. Phone number not authorized"
- Check if the phone number exactly matches the one in Google Sheets (including country code)
- Verify the Status is set to "Active"
- Ensure there are no extra spaces in the phone number

### "Failed to load dashboard data"
- Check if Google Sheets API credentials are properly configured
- Verify GOOGLE_SHEET_ID environment variable is correct
- Check the browser console for detailed errors

### "Unauthorized" error
- Your session may have expired (7 days max)
- Log out and log in again
- Clear your browser cookies if the issue persists

---

## 🎯 Next Steps

The basic admin panel is now functional! Future enhancements can include:

1. Detailed view pages for each section
2. Search and filter functionality
3. Export to Excel
4. Real-time notifications
5. User activity logs
6. Multi-factor authentication
7. Role-based permissions

---

## 📞 Support

For any issues or questions, contact the development team.

Built with ❤️ for Amante
