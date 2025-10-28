# AMANTE API - QUICK REFERENCE CARD

**For Frontend Team (Agent 6)**

---

## ENDPOINTS AT A GLANCE

### 1. Reservations
```
POST /api/reservations
→ Table reservation requests
→ Returns confirmation ID
```

### 2. Private Events
```
POST /api/private-events
→ Private event enquiries
→ Stores event requirements
```

### 3. Banquets
```
POST /api/banquets
→ Wedding/banquet bookings
→ High-priority processing
```

### 4. Contact
```
POST /api/contact
→ General contact form
→ Routes to appropriate inbox
```

### 5. Feedback
```
POST /api/feedback
→ Customer reviews/feedback
→ Multi-rating system
```

### 6. Careers
```
POST /api/careers
→ Job applications
→ Includes file upload
```

### 7. Events Calendar
```
GET /api/events
→ Published upcoming events
→ Supports filtering
```

---

## REQUEST FORMAT

All POST endpoints expect JSON (except careers which uses FormData):

```javascript
const response = await fetch('/api/reservations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
});

const result = await response.json();
```

---

## RESPONSE FORMAT

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "message": "Success message"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {
      "fieldName": ["Error description"]
    }
  }
}
```

---

## COMMON VALIDATION RULES

### Phone Number
```
Format: +91XXXXXXXXXX
Regex: /^\+91[6-9]\d{9}$/
Example: +919876543210
```

### Email
```
Standard email validation
Max length: 100 characters
```

### Dates
```
Format: YYYY-MM-DD
Reservations: Must be future date
Feedback: Cannot be future date
```

### Party Size
```
Reservations: 1-20 guests
Private Events: 1-500 guests
Banquets: Minimum 50 guests
```

---

## EXAMPLE USAGE

### Basic Form Submission
```javascript
async function submitReservation(formData) {
  try {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      // Show success message
      alert(result.data.message);
      resetForm();
    } else {
      // Handle errors
      displayErrors(result.error);
    }
  } catch (error) {
    // Handle network errors
    alert('Network error. Please try again.');
  }
}
```

### File Upload (Careers)
```javascript
const formData = new FormData();
formData.append('position', 'Chef');
formData.append('fullName', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '+919876543210');
formData.append('currentCity', 'Mumbai');
formData.append('experienceYears', '5');
formData.append('resume', fileInput.files[0]);
formData.append('whyAmante', textAreaValue);
formData.append('availableToJoin', '2025-11-01');

const response = await fetch('/api/careers', {
  method: 'POST',
  body: formData  // Don't set Content-Type header
});
```

### GET Request with Filters
```javascript
const params = new URLSearchParams({
  limit: '20',
  offset: '0',
  type: 'Live Music',
  space: 'Lounge'
});

const response = await fetch(`/api/events?${params}`);
const result = await response.json();

if (result.success) {
  const events = result.data.events;
  // Render events
}
```

---

## ERROR HANDLING

### Display Validation Errors
```javascript
function displayErrors(error) {
  if (error.details) {
    // Field-specific errors
    Object.entries(error.details).forEach(([field, messages]) => {
      const input = document.querySelector(`[name="${field}"]`);
      showFieldError(input, messages[0]);
    });
  } else {
    // Generic error
    showToast(error.message, 'error');
  }
}
```

### Handle Rate Limiting
```javascript
async function submitWithRetry(url, data, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.status === 429) {
      // Rate limited
      const retryAfter = response.headers.get('Retry-After');
      await new Promise(r => setTimeout(r, retryAfter * 1000));
      continue;
    }

    return response.json();
  }

  throw new Error('Max retries exceeded');
}
```

---

## LOADING STATES

```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

async function handleSubmit(data) {
  setLoading(true);
  setError(null);

  try {
    const result = await submitReservation(data);

    if (result.success) {
      showSuccess(result.data.message);
    } else {
      setError(result.error.message);
    }
  } catch (err) {
    setError('Something went wrong');
  } finally {
    setLoading(false);
  }
}
```

---

## PHONE NUMBER INPUT

```javascript
// Format as user types
function formatPhone(value) {
  // Remove non-digits
  const digits = value.replace(/\D/g, '');

  // Ensure starts with 91
  if (!digits.startsWith('91')) {
    return '+91';
  }

  // Limit to 12 digits (91 + 10)
  const limited = digits.slice(0, 12);

  return `+${limited}`;
}

// Validation
function validatePhone(phone) {
  return /^\+91[6-9]\d{9}$/.test(phone);
}
```

---

## DATE PICKER SETUP

```javascript
// Minimum date: today
const today = new Date().toISOString().split('T')[0];

// Maximum date: 90 days from now
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 90);
const max = maxDate.toISOString().split('T')[0];

<input
  type="date"
  min={today}
  max={max}
  required
/>
```

---

## TIME SLOT OPTIONS

```javascript
const timeSlots = [
  '11:00 AM',
  '1:00 PM',
  '3:00 PM',
  '7:00 PM',
  '9:00 PM',
  '11:00 PM'
];

<select name="time" required>
  {timeSlots.map(time => (
    <option key={time} value={time}>{time}</option>
  ))}
</select>
```

---

## SPACE OPTIONS

```javascript
const spaces = [
  'Rooftop Restaurant',
  'Lounge',
  'Café',
  'Any'
];

const banquetSpaces = [
  'Private Dining',
  'Rooftop Restaurant',
  'Banquet Hall',
  'Lounge',
  'Any'
];
```

---

## RATING INPUT

```javascript
function StarRating({ value, onChange, name }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(name, star)}
          className={star <= value ? 'filled' : ''}
        >
          ⭐
        </button>
      ))}
    </div>
  );
}
```

---

## FILE UPLOAD VALIDATION

```javascript
function validateResume(file) {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return 'Please select a file';
  }

  if (!validTypes.includes(file.type)) {
    return 'Only PDF and DOC files are allowed';
  }

  if (file.size > maxSize) {
    return 'File size must be under 5MB';
  }

  return null;
}
```

---

## TESTING CHECKLIST

Before deploying:

- [ ] All form submissions work
- [ ] Validation errors display correctly
- [ ] Success messages show after submission
- [ ] Loading states work
- [ ] Phone number formatting works
- [ ] Date picker restricts invalid dates
- [ ] File upload validates correctly
- [ ] Error handling works for network failures
- [ ] Rate limiting handled gracefully
- [ ] Mobile responsive forms

---

## COMMON ISSUES

### Issue: CORS Error
**Solution:** Endpoint includes CORS headers, check browser console for actual error

### Issue: Validation Fails
**Solution:** Check field names match exactly (case-sensitive), verify data types

### Issue: File Upload Fails
**Solution:** Use FormData, don't set Content-Type header manually

### Issue: Date Validation Fails
**Solution:** Ensure date format is YYYY-MM-DD, check min/max dates

### Issue: Phone Validation Fails
**Solution:** Verify format +91XXXXXXXXXX with exactly 10 digits after +91

---

## NEED HELP?

1. Check `API_IMPLEMENTATION.md` for full documentation
2. Run test script: `npm run test:api`
3. Check browser console for detailed errors
4. Test with cURL to isolate frontend issues
5. Verify environment variables are set

---

**Quick Links:**
- Full API Docs: `API_IMPLEMENTATION.md`
- Database Docs: `DATABASE_README.md`
- Email Architecture: `EMAIL_ARCHITECTURE.md`

**Status:** ✅ Ready for Integration

---

*Generated for Amante Restaurant Project*
*Backend Engineer Agent - 2025-10-25*
