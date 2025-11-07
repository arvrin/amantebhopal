import { google } from 'googleapis';
import path from 'path';

// Initialize Google Sheets API
const getGoogleSheetsClient = async () => {
  try {
    // Check for Base64-encoded credentials first (for production/Vercel - most reliable)
    const base64Credentials = process.env.GOOGLE_CREDENTIALS_BASE64;

    // Check for individual environment variables (backup method)
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    let auth;

    if (base64Credentials) {
      // Use Base64-encoded credentials (most reliable for Vercel)
      console.log('Using Base64-encoded credentials from environment variable');
      const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const credentials = JSON.parse(decodedCredentials);

      console.log('Service account email:', credentials.client_email);
      console.log('Project ID:', credentials.project_id);

      auth = new google.auth.GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    } else if (serviceAccountEmail && privateKey) {
      // Use environment variables (production/Vercel - backup method)
      // Handle both formats: literal \n and actual newlines
      let formattedPrivateKey = privateKey;

      // If the key contains literal \n (as text), replace with actual newlines
      if (privateKey.includes('\\n')) {
        formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
      }

      console.log('Using service account credentials from environment variables');
      console.log('Service account email:', serviceAccountEmail);
      console.log('Private key length:', formattedPrivateKey.length);
      console.log('Private key starts with:', formattedPrivateKey.substring(0, 50));

      auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: serviceAccountEmail,
          private_key: formattedPrivateKey,
          type: 'service_account',
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    } else {
      // Fall back to file-based auth (local development)
      console.log('Using file-based authentication');
      const keyFilePath = path.join(process.cwd(), 'google-service-account.json');
      auth = new google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    }

    const authClient = await auth.getClient();

    // Create sheets client
    const sheets = google.sheets({ version: 'v4', auth: authClient as any });

    return sheets;
  } catch (error: any) {
    console.error('Error initializing Google Sheets client:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack?.substring(0, 500)
    });
    throw new Error('Failed to initialize Google Sheets client');
  }
};

// Sheet names mapping
export const SHEET_NAMES = {
  RESERVATIONS: 'Reservations',
  CONTACT: 'Contact',
  PRIVATE_EVENTS: 'Private Events',
  FEEDBACK: 'Feedback',
  CAREERS: 'Careers',
  USERS: 'Users',
} as const;

// Type for sheet data
type SheetRow = (string | number | boolean)[];

/**
 * Append a row to a specific sheet in the Google Spreadsheet
 */
export async function appendToSheet(sheetName: string, values: SheetRow): Promise<boolean> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID environment variable not set');
    }

    // Append timestamp as first column
    const timestamp = new Date().toISOString();
    const rowData = [timestamp, ...values];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`, // Append to columns A through Z
      valueInputOption: 'USER_ENTERED', // Parse values (dates, numbers, formulas)
      requestBody: {
        values: [rowData],
      },
    });

    console.log(`✅ Successfully appended row to ${sheetName}:`, response.data);
    return true;
  } catch (error) {
    console.error(`❌ Error appending to ${sheetName}:`, error);
    throw error;
  }
}

/**
 * Append reservation data to Reservations sheet
 */
export async function addReservation(data: {
  date: string;
  time: string;
  partySize: number;
  spacePreference: string;
  occasion: string;
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
  agreeToSMS: boolean;
}) {
  const row: SheetRow = [
    data.date,
    data.time,
    data.partySize,
    data.spacePreference,
    data.occasion || '',
    data.name,
    data.phone,
    data.email,
    data.specialRequests || '',
    data.agreeToSMS,
    'Pending', // Status
    '', // Notes (empty, will be filled by staff)
  ];

  return appendToSheet(SHEET_NAMES.RESERVATIONS, row);
}

/**
 * Append contact inquiry to Contact sheet
 */
export async function addContact(data: {
  inquiryType: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  const row: SheetRow = [
    data.inquiryType,
    data.name,
    data.email,
    data.phone,
    data.message,
    'New', // Status
    '', // Assigned To
    false, // Response Sent
    '', // Notes
  ];

  return appendToSheet(SHEET_NAMES.CONTACT, row);
}

/**
 * Append private event inquiry to Private Events sheet
 */
export async function addPrivateEvent(data: {
  eventType: string;
  eventDate: string;
  guestCount: number;
  budgetRange: string;
  spacePreference: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  requirements: string;
  preferredContact: string;
}) {
  const row: SheetRow = [
    data.eventType,
    data.eventDate,
    data.guestCount,
    data.budgetRange,
    data.spacePreference,
    data.name,
    data.phone,
    data.email,
    data.company || '',
    data.requirements,
    data.preferredContact,
    'New', // Status
    '', // Follow-up Date
    false, // Proposal Sent
    '', // Notes
  ];

  return appendToSheet(SHEET_NAMES.PRIVATE_EVENTS, row);
}

/**
 * Append feedback to Feedback sheet
 */
export async function addFeedback(data: {
  visitDate: string;
  spaceVisited: string;
  overallRating: number;
  foodRating: number;
  serviceRating: number;
  ambianceRating: number;
  valueRating: number;
  whatYouLoved: string;
  improvements: string;
  wouldRecommend: string;
  name: string;
  email: string;
  canSharePublicly: boolean;
}) {
  const row: SheetRow = [
    data.visitDate,
    data.spaceVisited,
    data.overallRating,
    data.foodRating,
    data.serviceRating,
    data.ambianceRating,
    data.valueRating,
    data.whatYouLoved,
    data.improvements || '',
    data.wouldRecommend,
    data.name || 'Anonymous',
    data.email || '',
    data.canSharePublicly,
    'New', // Status
    false, // Response Sent
    '', // Notes
  ];

  return appendToSheet(SHEET_NAMES.FEEDBACK, row);
}

/**
 * Append career application to Careers sheet
 */
export async function addCareerApplication(data: {
  position: string;
  fullName: string;
  email: string;
  phone: string;
  currentCity: string;
  experienceYears: number;
  currentPosition: string;
  expectedSalary?: number;
  portfolioUrl: string;
  resumeUrl: string;
  whyAmante: string;
  availableToJoin: string;
}) {
  const row: SheetRow = [
    data.position,
    data.fullName,
    data.email,
    data.phone,
    data.currentCity,
    data.experienceYears,
    data.currentPosition || '',
    data.expectedSalary || '',
    data.portfolioUrl || '',
    data.resumeUrl,
    data.whyAmante,
    data.availableToJoin,
    'New', // Status
    '', // Interview Scheduled
    false, // Hired
    '', // Notes
  ];

  return appendToSheet(SHEET_NAMES.CAREERS, row);
}

/**
 * Test connection to Google Sheets
 */
export async function testConnection(): Promise<{
  success: boolean;
  message: string;
  sheetTitle?: string;
}> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      return {
        success: false,
        message: 'GOOGLE_SHEET_ID environment variable not set',
      };
    }

    // Get spreadsheet metadata
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    return {
      success: true,
      message: 'Successfully connected to Google Sheets',
      sheetTitle: response.data.properties?.title || undefined,
    };
  } catch (error: any) {
    console.error('Connection test failed:', error);
    return {
      success: false,
      message: error.message || 'Failed to connect to Google Sheets',
    };
  }
}

/**
 * Read all rows from a specific sheet
 */
export async function readSheet(sheetName: string): Promise<any[]> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID environment variable not set');
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`, // Read all columns
    });

    const rows = response.data.values || [];

    if (rows.length === 0) {
      return [];
    }

    // First row is headers
    const headers = rows[0];
    const dataRows = rows.slice(1);

    // Convert to array of objects
    return dataRows.map(row => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
  } catch (error) {
    console.error(`Error reading sheet ${sheetName}:`, error);
    throw new Error(`Failed to read sheet ${sheetName}`);
  }
}

/**
 * Find a user by phone number in Users sheet
 */
export async function findUserByPhone(phone: string): Promise<any | null> {
  try {
    const users = await readSheet(SHEET_NAMES.USERS);

    if (users.length === 0) {
      console.error('Users sheet is empty or does not exist. Please create the "Users" sheet with proper headers.');
      return null;
    }

    // Log all users for debugging (without sensitive info)
    console.log(`Found ${users.length} users in Users sheet`);

    // Normalize phone number by removing '+' sign for comparison
    const normalizedPhone = phone.replace(/^\+/, '');
    console.log(`Searching for normalized phone: ${normalizedPhone}`);

    // Find user by comparing normalized phone numbers
    const user = users.find(u => {
      const userPhone = u['Phone Number']?.replace(/^\+/, '');
      const isMatch = userPhone === normalizedPhone;
      const isActive = u['Status'] === 'Active';

      if (isMatch) {
        console.log(`Found matching phone: ${userPhone}, Active: ${isActive}`);
      }

      return isMatch && isActive;
    });

    if (!user) {
      console.log(`User not found or inactive for phone: ${phone}`);
      // Log available phone numbers (first 4 digits only for security)
      const availablePhones = users.map(u => u['Phone Number']?.substring(0, 7) + 'XXX');
      console.log('Available phone prefixes:', availablePhones);
    }

    return user || null;
  } catch (error: any) {
    console.error('Error finding user:', error);
    if (error.message?.includes('Unable to parse range')) {
      console.error('The "Users" sheet may not exist. Please create it in your Google Spreadsheet.');
    }
    return null;
  }
}
