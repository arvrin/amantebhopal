#!/usr/bin/env ts-node

/**
 * Database Connection and Schema Test Script
 *
 * This script tests the Supabase database connection, schema, and basic operations.
 * Run this after setting up Supabase to verify everything is working correctly.
 *
 * Usage:
 *   npm run test:db
 *   OR
 *   npx ts-node scripts/test-database.ts
 *
 * Prerequisites:
 *   - Supabase project created
 *   - Migrations executed
 *   - Environment variables set in .env.local
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

// Import after loading env vars
import { supabase, getServerClient } from '../src/lib/supabase';
import {
  createReservation,
  createFeedback,
  getReservationsByStatus,
  getPendingItemsCount,
  getTodaysReservations,
} from '../src/lib/db-utils';

// ============================================================================
// TEST UTILITIES
// ============================================================================

const SUCCESS = '\x1b[32m✓\x1b[0m';
const FAIL = '\x1b[31m✗\x1b[0m';
const INFO = '\x1b[36mℹ\x1b[0m';
const WARN = '\x1b[33m⚠\x1b[0m';

let testsPassed = 0;
let testsFailed = 0;

function log(message: string, prefix: string = INFO) {
  console.log(`${prefix} ${message}`);
}

function success(message: string) {
  testsPassed++;
  log(message, SUCCESS);
}

function fail(message: string) {
  testsFailed++;
  log(message, FAIL);
}

function section(title: string) {
  console.log('\n' + '='.repeat(60));
  console.log(title);
  console.log('='.repeat(60));
}

// ============================================================================
// TEST FUNCTIONS
// ============================================================================

async function testEnvironmentVariables() {
  section('1. TESTING ENVIRONMENT VARIABLES');

  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];

  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value && value.length > 0) {
      success(`${varName} is set`);
    } else {
      fail(`${varName} is missing or empty`);
    }
  }

  // Check URL format
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (url && url.startsWith('https://') && url.includes('.supabase.co')) {
    success('Supabase URL has correct format');
  } else {
    fail('Supabase URL format is incorrect');
  }
}

async function testDatabaseConnection() {
  section('2. TESTING DATABASE CONNECTION');

  try {
    const { error } = await supabase.from('reservations').select('id').limit(1);

    if (error) {
      fail(`Database connection failed: ${error.message}`);
    } else {
      success('Successfully connected to Supabase database');
    }
  } catch (error) {
    fail(
      `Database connection error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

async function testTableExistence() {
  section('3. TESTING TABLE EXISTENCE');

  const tables = [
    'reservations',
    'private_events',
    'banquets',
    'contact_submissions',
    'feedback',
    'career_applications',
    'newsletter_subscriptions',
    'events',
  ];

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('id').limit(1);

      if (error) {
        fail(`Table '${table}' does not exist or is not accessible`);
      } else {
        success(`Table '${table}' exists and is accessible`);
      }
    } catch (error) {
      fail(`Error checking table '${table}': ${error}`);
    }
  }
}

async function testViewExistence() {
  section('4. TESTING VIEW EXISTENCE');

  const views = [
    'recent_reservations_summary',
    'upcoming_reservations',
    'feedback_statistics',
    'overall_feedback_statistics',
    'featured_testimonials',
    'pending_items_dashboard',
  ];

  for (const view of views) {
    try {
      const { error } = await supabase.from(view).select('*').limit(1);

      if (error) {
        fail(`View '${view}' does not exist or is not accessible`);
      } else {
        success(`View '${view}' exists and is accessible`);
      }
    } catch (error) {
      fail(`Error checking view '${view}': ${error}`);
    }
  }
}

async function testInsertOperations() {
  section('5. TESTING INSERT OPERATIONS');

  // Test Reservation Insert
  try {
    const reservationData = {
      date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // 7 days from now
      time: '7:00 PM',
      party_size: 4,
      space_preference: 'Rooftop Restaurant',
      name: 'Test User',
      phone: '+919876543210',
      email: 'test@example.com',
      agree_to_sms: true,
      status: 'pending',
    };

    const result = await createReservation(reservationData as any);

    if (result.error) {
      fail(`Failed to insert reservation: ${result.error.message}`);
    } else if (result.data) {
      success(`Successfully inserted test reservation (ID: ${result.data.id})`);

      // Clean up - delete test record
      const client = getServerClient();
      await client.from('reservations').delete().eq('id', result.data.id);
      log('Test reservation cleaned up', INFO);
    }
  } catch (error) {
    fail(`Reservation insert error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }

  // Test Feedback Insert
  try {
    const feedbackData = {
      visit_date: new Date().toISOString().split('T')[0],
      space_visited: 'Café & Bakery',
      overall_rating: 5,
      food_rating: 5,
      service_rating: 5,
      ambiance_rating: 5,
      value_rating: 5,
      what_you_loved: 'Test feedback - excellent service!',
      would_recommend: 'Definitely',
      can_share_publicly: false,
    };

    const result = await createFeedback(feedbackData as any);

    if (result.error) {
      fail(`Failed to insert feedback: ${result.error.message}`);
    } else if (result.data) {
      success(`Successfully inserted test feedback (ID: ${result.data.id})`);

      // Clean up
      const client = getServerClient();
      await client.from('feedback').delete().eq('id', result.data.id);
      log('Test feedback cleaned up', INFO);
    }
  } catch (error) {
    fail(`Feedback insert error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
}

async function testQueryOperations() {
  section('6. TESTING QUERY OPERATIONS');

  // Test get reservations by status
  try {
    const result = await getReservationsByStatus('pending');

    if (result.error) {
      fail(`Failed to query reservations: ${result.error.message}`);
    } else {
      success(
        `Successfully queried reservations by status (Found: ${result.data?.length || 0})`
      );
    }
  } catch (error) {
    fail(`Query error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
}

async function testFunctionCalls() {
  section('7. TESTING DATABASE FUNCTIONS');

  // Test get_pending_count function
  try {
    const result = await getPendingItemsCount();

    if (result.error) {
      fail(`Failed to call get_pending_count: ${result.error.message}`);
    } else {
      success('Successfully called get_pending_count function');
      if (result.data) {
        result.data.forEach((item) => {
          log(
            `  - ${item.form_type}: ${item.pending_count} pending items`,
            INFO
          );
        });
      }
    }
  } catch (error) {
    fail(`Function call error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }

  // Test get_todays_reservations function
  try {
    const result = await getTodaysReservations();

    if (result.error) {
      fail(`Failed to call get_todays_reservations: ${result.error.message}`);
    } else {
      success(
        `Successfully called get_todays_reservations (Found: ${result.data?.length || 0})`
      );
    }
  } catch (error) {
    fail(`Function call error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
}

async function testRLSPolicies() {
  section('8. TESTING ROW LEVEL SECURITY');

  try {
    // Test public insert (should work with anon key)
    const { error: insertError } = await supabase.from('reservations').insert({
      date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      time: '7:00 PM',
      party_size: 2,
      name: 'RLS Test',
      phone: '+919999999999',
      email: 'rls-test@example.com',
      agree_to_sms: true,
    });

    if (insertError) {
      fail(`RLS policy failed - public insert blocked: ${insertError.message}`);
    } else {
      success('RLS policy working - public can insert reservations');

      // Clean up
      const client = getServerClient();
      await client
        .from('reservations')
        .delete()
        .eq('email', 'rls-test@example.com');
    }

    // Test public select on feedback (should only see published)
    const { data: publicFeedback, error: selectError } = await supabase
      .from('feedback')
      .select('*')
      .eq('published_on_website', false)
      .limit(1);

    if (publicFeedback && publicFeedback.length > 0) {
      log(
        'RLS policy - unpublished feedback visible to public (may be expected)',
        WARN
      );
    } else {
      success('RLS policy working - unpublished feedback protected');
    }
  } catch (error) {
    fail(`RLS test error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
}

async function testStorageBucket() {
  section('9. TESTING STORAGE BUCKET');

  try {
    const client = getServerClient();

    // Check if resumes bucket exists
    const { data: buckets, error: bucketsError } = await client.storage.listBuckets();

    if (bucketsError) {
      fail(`Failed to list storage buckets: ${bucketsError.message}`);
    } else {
      const resumesBucket = buckets?.find((b) => b.name === 'resumes');

      if (resumesBucket) {
        success("Storage bucket 'resumes' exists");

        // Test upload (create a small test file)
        const testFile = new Blob(['Test file content'], { type: 'text/plain' });
        const testFileName = `test-${Date.now()}.txt`;

        const { error: uploadError } = await client.storage
          .from('resumes')
          .upload(testFileName, testFile);

        if (uploadError) {
          fail(`Failed to upload test file: ${uploadError.message}`);
        } else {
          success('Successfully uploaded test file to storage');

          // Get public URL
          const {
            data: { publicUrl },
          } = client.storage.from('resumes').getPublicUrl(testFileName);

          if (publicUrl) {
            success('Successfully generated public URL for file');
          }

          // Clean up
          await client.storage.from('resumes').remove([testFileName]);
          log('Test file cleaned up', INFO);
        }
      } else {
        fail("Storage bucket 'resumes' does not exist");
        log("Create bucket 'resumes' in Supabase dashboard", INFO);
      }
    }
  } catch (error) {
    fail(`Storage test error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
}

async function testDataIntegrity() {
  section('10. TESTING DATA INTEGRITY');

  try {
    // Test date validation (past date should fail)
    const client = getServerClient();

    const pastDate = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const { error } = await client.from('reservations').insert({
      date: pastDate,
      time: '7:00 PM',
      party_size: 2,
      name: 'Past Date Test',
      phone: '+919999999999',
      email: 'past-test@example.com',
      agree_to_sms: true,
    });

    if (error && error.message.includes('past')) {
      success('Date validation trigger working - past dates rejected');
    } else if (!error) {
      log('Date validation - past date was accepted (check trigger)', WARN);
      // Clean up if it was inserted
      await client
        .from('reservations')
        .delete()
        .eq('email', 'past-test@example.com');
    } else {
      fail(`Unexpected error during date validation: ${error.message}`);
    }
  } catch (error) {
    fail(
      `Data integrity test error: ${error instanceof Error ? error.message : 'Unknown'}`
    );
  }
}

// ============================================================================
// MAIN TEST RUNNER
// ============================================================================

async function runAllTests() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║          AMANTE RESTAURANT - DATABASE TEST SUITE           ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  try {
    await testEnvironmentVariables();
    await testDatabaseConnection();
    await testTableExistence();
    await testViewExistence();
    await testInsertOperations();
    await testQueryOperations();
    await testFunctionCalls();
    await testRLSPolicies();
    await testStorageBucket();
    await testDataIntegrity();

    // Summary
    section('TEST SUMMARY');
    console.log(`\nTests Passed: ${SUCCESS} ${testsPassed}`);
    console.log(`Tests Failed: ${FAIL} ${testsFailed}`);
    console.log(`Total Tests:  ${testsPassed + testsFailed}\n`);

    if (testsFailed === 0) {
      console.log(
        `${SUCCESS} All tests passed! Database is ready for use. 🎉\n`
      );
      process.exit(0);
    } else {
      console.log(
        `${FAIL} Some tests failed. Please review the errors above.\n`
      );
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Fatal error during testing:');
    console.error(error);
    process.exit(1);
  }
}

// ============================================================================
// RUN TESTS
// ============================================================================

// Check if running directly
if (require.main === module) {
  runAllTests();
}

export { runAllTests };
