/**
 * API Testing Script
 *
 * Comprehensive testing script for all API endpoints
 * Run with: npx tsx scripts/test-api.ts
 */

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

interface TestResult {
  endpoint: string;
  method: string;
  status: 'PASS' | 'FAIL';
  statusCode?: number;
  error?: string;
  duration?: number;
}

const results: TestResult[] = [];

/**
 * Log test result
 */
function logResult(result: TestResult) {
  results.push(result);
  const icon = result.status === 'PASS' ? '✅' : '❌';
  const duration = result.duration ? ` (${result.duration}ms)` : '';
  console.log(
    `${icon} ${result.method} ${result.endpoint} - ${result.status}${duration}`
  );
  if (result.error) {
    console.log(`   Error: ${result.error}`);
  }
}

/**
 * Make API request
 */
async function makeRequest(
  endpoint: string,
  method: string,
  body?: any,
  isFormData: boolean = false
): Promise<TestResult> {
  const startTime = Date.now();

  try {
    const options: RequestInit = {
      method,
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    };

    if (body) {
      options.body = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const duration = Date.now() - startTime;
    const data = await response.json();

    if (response.ok && data.success) {
      return {
        endpoint,
        method,
        status: 'PASS',
        statusCode: response.status,
        duration,
      };
    } else {
      return {
        endpoint,
        method,
        status: 'FAIL',
        statusCode: response.status,
        error: data.error?.message || 'Unknown error',
        duration,
      };
    }
  } catch (error) {
    return {
      endpoint,
      method,
      status: 'FAIL',
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Test Reservations API
 */
async function testReservations() {
  console.log('\n📋 Testing Reservations API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Valid reservation
  const result = await makeRequest('/reservations', 'POST', {
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '7:00 PM',
    partySize: 4,
    spacePreference: 'Rooftop Restaurant',
    occasion: 'Birthday',
    name: 'Test User',
    phone: '+919876543210',
    email: 'test@example.com',
    specialRequests: 'Window seat preferred',
    agreeToSMS: true,
  });
  logResult(result);

  // Invalid phone number
  const invalidPhone = await makeRequest('/reservations', 'POST', {
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '7:00 PM',
    partySize: 4,
    spacePreference: 'Rooftop Restaurant',
    name: 'Test User',
    phone: '1234567890', // Invalid format
    email: 'test@example.com',
    agreeToSMS: true,
  });
  console.log('   Expected validation error for invalid phone:', invalidPhone.status === 'FAIL' ? '✅' : '❌');

  // Missing required field
  const missingField = await makeRequest('/reservations', 'POST', {
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '7:00 PM',
    partySize: 4,
    spacePreference: 'Rooftop Restaurant',
    name: 'Test User',
    // Missing phone
    email: 'test@example.com',
    agreeToSMS: true,
  });
  console.log('   Expected validation error for missing field:', missingField.status === 'FAIL' ? '✅' : '❌');
}

/**
 * Test Private Events API
 */
async function testPrivateEvents() {
  console.log('\n🎉 Testing Private Events API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const result = await makeRequest('/private-events', 'POST', {
    eventType: 'Corporate',
    eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    guestCount: 30,
    budgetRange: '₹1L-2L',
    spacePreference: 'Private Dining',
    name: 'Test Corporate User',
    phone: '+919876543210',
    email: 'corporate@example.com',
    company: 'Test Company Pvt Ltd',
    requirements: 'Need AV equipment for presentation and vegetarian catering options.',
    preferredContact: 'Email',
  });
  logResult(result);
}

/**
 * Test Banquets API
 */
async function testBanquets() {
  console.log('\n💒 Testing Banquets API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const result = await makeRequest('/banquets', 'POST', {
    eventType: 'Wedding',
    eventDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    alternateDate: new Date(Date.now() + 97 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    guestCount: 200,
    timingFrom: '18:00',
    timingTo: '23:00',
    requirements: ['Catering', 'Decoration', 'Photography', 'DJ'],
    name: 'Test Wedding User',
    phone: '+919876543210',
    email: 'wedding@example.com',
    city: 'Bhopal',
    hearAboutUs: 'Referral',
    additionalNotes: 'Looking for traditional Rajasthani theme',
    requestType: 'Both',
  });
  logResult(result);
}

/**
 * Test Contact API
 */
async function testContact() {
  console.log('\n📧 Testing Contact API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const result = await makeRequest('/contact', 'POST', {
    inquiryType: 'General',
    name: 'Test Contact User',
    phone: '+919876543210',
    email: 'contact@example.com',
    message: 'I would like to know more about your catering services for outdoor events.',
  });
  logResult(result);
}

/**
 * Test Feedback API
 */
async function testFeedback() {
  console.log('\n⭐ Testing Feedback API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const result = await makeRequest('/feedback', 'POST', {
    visitDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    spaceVisited: 'Rooftop Restaurant',
    overallRating: 5,
    foodRating: 5,
    serviceRating: 4,
    ambianceRating: 5,
    valueRating: 4,
    whatYouLoved: 'The view from the rooftop is absolutely stunning! The food was delicious.',
    improvements: 'Service could be a bit faster during peak hours.',
    wouldRecommend: 'Definitely',
    name: 'Test Feedback User',
    email: 'feedback@example.com',
    canSharePublicly: true,
  });
  logResult(result);
}

/**
 * Test Careers API
 */
async function testCareers() {
  console.log('\n👔 Testing Careers API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚠️  Skipping file upload test (requires actual file)');
  console.log('   Manual test required for complete validation');
}

/**
 * Test Events API
 */
async function testEvents() {
  console.log('\n📅 Testing Events API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Get all events
  const result = await makeRequest('/events', 'GET');
  logResult(result);

  // Get events with limit
  const limited = await makeRequest('/events?limit=10', 'GET');
  logResult({ ...limited, endpoint: '/events?limit=10' });

  // Get events with filters
  const filtered = await makeRequest('/events?type=Live Music&space=Lounge', 'GET');
  logResult({ ...filtered, endpoint: '/events?type=Live Music&space=Lounge' });
}

/**
 * Test Rate Limiting
 */
async function testRateLimiting() {
  console.log('\n🚦 Testing Rate Limiting');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Sending 12 rapid requests to test rate limit...');

  let rateLimited = false;
  for (let i = 0; i < 12; i++) {
    const result = await makeRequest('/events', 'GET');
    if (result.statusCode === 429) {
      rateLimited = true;
      console.log(`✅ Rate limit triggered after ${i + 1} requests`);
      break;
    }
  }

  if (!rateLimited) {
    console.log('⚠️  Rate limit not triggered (may need adjustment)');
  }
}

/**
 * Print summary
 */
function printSummary() {
  console.log('\n');
  console.log('═══════════════════════════════════════════');
  console.log('           TEST SUMMARY');
  console.log('═══════════════════════════════════════════');

  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const total = results.length;

  console.log(`Total Tests: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

  if (failed > 0) {
    console.log('\nFailed Tests:');
    results
      .filter((r) => r.status === 'FAIL')
      .forEach((r) => {
        console.log(`  - ${r.method} ${r.endpoint}: ${r.error}`);
      });
  }

  console.log('═══════════════════════════════════════════\n');
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('\n');
  console.log('═══════════════════════════════════════════');
  console.log('      AMANTE API TEST SUITE');
  console.log('═══════════════════════════════════════════');
  console.log(`Testing API at: ${API_BASE_URL}`);
  console.log('');

  try {
    await testReservations();
    await testPrivateEvents();
    await testBanquets();
    await testContact();
    await testFeedback();
    await testCareers();
    await testEvents();
    await testRateLimiting();

    printSummary();
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run tests
runTests();
