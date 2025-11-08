const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function testGoogleSheets() {
  try {
    console.log('📝 Testing Google Sheets connection...\n');

    // Load credentials from file
    const keyFilePath = path.join(__dirname, 'google-service-account.json');
    const credentials = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

    console.log('✅ Credentials loaded');
    console.log('   Service Account:', credentials.client_email);
    console.log('   Project ID:', credentials.project_id);
    console.log('   Key ID:', credentials.private_key_id);

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    console.log('\n✅ Auth client created');

    // Create sheets client
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    console.log('✅ Sheets API client created');

    const spreadsheetId = '13Rzfi5DNBqTe6se8Fa2aMAzhf8bdsmqvtCRdC2_LmuE';

    // First, get spreadsheet metadata
    console.log('\n📊 Getting spreadsheet metadata...');
    const metadata = await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
    });

    console.log('✅ Spreadsheet found:', metadata.data.properties.title);
    console.log('   Sheets in spreadsheet:');
    metadata.data.sheets.forEach(sheet => {
      console.log('   -', sheet.properties.title);
    });

    // Try to read Users sheet
    console.log('\n📖 Reading Users sheet...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'Users!A:G',
    });

    const rows = response.data.values || [];
    console.log('✅ Users sheet found!');
    console.log('   Total rows:', rows.length);

    if (rows.length > 0) {
      console.log('   Headers:', rows[0].join(' | '));
      if (rows.length > 1) {
        console.log('   Existing users:', rows.length - 1);
        for (let i = 1; i < rows.length; i++) {
          console.log('   User ' + i + ':', rows[i][0], '-', rows[i][1], '-', rows[i][4]);
        }
      }
    }

    // Try to add a test user
    console.log('\n➕ Adding test user...');
    const testUser = [
      '+919999999999',           // Phone Number
      'Test User Claude',        // Name
      'Staff',                   // Role
      'Full',                    // Access Level
      'Active',                  // Status
      '2025-11-07',             // Added Date
      ''                        // Last Login
    ];

    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: 'Users!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [testUser],
      },
    });

    console.log('✅ Test user added successfully!');
    console.log('   Updated range:', appendResponse.data.updates.updatedRange);
    console.log('   Updated rows:', appendResponse.data.updates.updatedRows);

    console.log('\n🎉 All tests passed! Google Sheets connection is working locally!');
    console.log('\n📝 Now check your Google Sheet to see the test user.');

  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('   Message:', error.message);
    if (error.code) console.error('   Code:', error.code);
    if (error.status) console.error('   Status:', error.status);
    if (error.errors) {
      console.error('   Details:', JSON.stringify(error.errors, null, 2));
    }

    // Check for specific error types
    if (error.message && error.message.includes('invalid_grant')) {
      console.error('\n⚠️  INVALID GRANT ERROR detected!');
      console.error('   This means the service account credentials are not valid.');
      console.error('   The service account may have been:');
      console.error('   - Deleted from Google Cloud Console');
      console.error('   - Disabled');
      console.error('   - The key was revoked');
      console.error('\n   Please check: https://console.cloud.google.com/iam-admin/serviceaccounts?project=amante-477510');
    }
  }
}

testGoogleSheets();
