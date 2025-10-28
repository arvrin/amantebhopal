# DATABASE QUICK REFERENCE

**Quick reference card for common database operations**

---

## Import Statements

```typescript
// Supabase clients
import { supabase, getServerClient } from '@/lib/supabase';

// Utility functions
import {
  createReservation,
  createFeedback,
  createCareerApplication,
  getReservationsByDate,
  getPublishedTestimonials,
} from '@/lib/db-utils';

// Types
import type {
  Reservation,
  ReservationInsert,
  Feedback,
  FeedbackInsert,
} from '@/lib/supabase';
```

---

## Client vs Server Usage

### Client Component (Browser)
```typescript
// Uses anon key, respects RLS
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('feedback')
  .select('*')
  .eq('published_on_website', true);
```

### API Route (Server)
```typescript
// Uses service role, bypasses RLS
import { getServerClient } from '@/lib/supabase';

export async function POST(request: Request) {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from('reservations')
    .insert(body);
}
```

---

## Common Queries

### Create Reservation
```typescript
import { createReservation } from '@/lib/db-utils';

const result = await createReservation({
  date: '2025-11-15',
  time: '7:00 PM',
  party_size: 4,
  space_preference: 'Rooftop Restaurant',
  name: 'John Doe',
  phone: '+919876543210',
  email: 'john@example.com',
  agree_to_sms: true,
});

if (result.error) {
  console.error('Error:', result.error.message);
} else {
  console.log('Success:', result.data.id);
}
```

### Get Reservations by Date
```typescript
import { getReservationsByDate } from '@/lib/db-utils';

const result = await getReservationsByDate('2025-11-15');
const reservations = result.data; // Array of reservations
```

### Create Feedback
```typescript
import { createFeedback } from '@/lib/db-utils';

const result = await createFeedback({
  visit_date: '2025-10-25',
  space_visited: 'Café & Bakery',
  overall_rating: 5,
  food_rating: 5,
  service_rating: 5,
  ambiance_rating: 5,
  value_rating: 5,
  what_you_loved: 'Amazing food and service!',
  would_recommend: 'Definitely',
  can_share_publicly: true,
});
```

### Get Published Testimonials
```typescript
import { getPublishedTestimonials } from '@/lib/db-utils';

const result = await getPublishedTestimonials(10); // Get 10 testimonials
const testimonials = result.data;
```

### Upload Resume
```typescript
import { uploadFile } from '@/lib/supabase';

const file = formData.get('resume') as File;
const fileName = `${Date.now()}-${file.name}`;
const url = await uploadFile('resumes', fileName, file);
```

---

## Direct Supabase Queries

### Insert
```typescript
const { data, error } = await supabase
  .from('table_name')
  .insert({ field: 'value' })
  .select()
  .single();
```

### Select All
```typescript
const { data, error } = await supabase
  .from('table_name')
  .select('*');
```

### Select with Filter
```typescript
const { data, error } = await supabase
  .from('reservations')
  .select('*')
  .eq('status', 'pending')
  .gte('date', '2025-11-01');
```

### Update
```typescript
const { data, error } = await supabase
  .from('reservations')
  .update({ status: 'confirmed' })
  .eq('id', reservationId)
  .select()
  .single();
```

### Delete
```typescript
const { error } = await supabase
  .from('reservations')
  .delete()
  .eq('id', reservationId);
```

---

## Using Database Views

### Recent Reservations
```typescript
const { data, error } = await supabase
  .from('recent_reservations_summary')
  .select('*')
  .limit(10);
```

### Feedback Statistics
```typescript
const { data, error } = await supabase
  .from('feedback_statistics')
  .select('*');
```

### Pending Items Dashboard
```typescript
const { data, error } = await supabase
  .from('pending_items_dashboard')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## Using Database Functions

### Get Pending Count
```typescript
import { getPendingItemsCount } from '@/lib/db-utils';

const result = await getPendingItemsCount();
// Returns: [{ form_type: 'reservations', pending_count: 5 }, ...]
```

### Get Today's Reservations
```typescript
import { getTodaysReservations } from '@/lib/db-utils';

const result = await getTodaysReservations();
// Returns array of today's reservations
```

---

## Pagination

```typescript
import { getAllRecords } from '@/lib/db-utils';

const result = await getAllRecords<Reservation>('reservations', {
  page: 1,
  limit: 20,
});

console.log(result.data.data); // Array of 20 reservations
console.log(result.data.totalPages); // Total number of pages
console.log(result.data.count); // Total record count
```

---

## Search Operations

### Search by Email
```typescript
import { searchByEmail } from '@/lib/db-utils';

const result = await searchByEmail<Reservation>(
  'reservations',
  'john@example.com'
);
```

### Search by Phone
```typescript
import { searchByPhone } from '@/lib/db-utils';

const result = await searchByPhone<Reservation>(
  'reservations',
  '+919876543210'
);
```

### Search by Name
```typescript
import { searchByName } from '@/lib/db-utils';

const result = await searchByName<Reservation>(
  'reservations',
  'John Doe'
);
```

---

## Error Handling Pattern

```typescript
const result = await createReservation(data);

if (result.error) {
  // Handle error
  console.error('Database error:', result.error.message);
  return NextResponse.json(
    { error: 'Failed to create reservation' },
    { status: 500 }
  );
}

// Success
return NextResponse.json({ data: result.data });
```

---

## Status Values Reference

### Reservations
- `pending` - New reservation
- `confirmed` - Restaurant confirmed
- `cancelled` - Cancelled by customer/restaurant
- `completed` - Customer showed up
- `no_show` - Customer didn't show up

### Private Events
- `pending` - New enquiry
- `contacted` - Restaurant reached out
- `quoted` - Quote sent
- `confirmed` - Event confirmed
- `cancelled` - Event cancelled
- `completed` - Event completed

### Banquets
- `pending` - New enquiry
- `site_visit_scheduled` - Site visit scheduled
- `quote_sent` - Quote sent
- `negotiating` - In negotiation
- `confirmed` - Booking confirmed
- `cancelled` - Booking cancelled
- `completed` - Event completed

### Contact Submissions
- `new` - Unread
- `in_progress` - Being handled
- `resolved` - Resolved
- `closed` - Closed

### Career Applications
- `received` - New application
- `screening` - Under review
- `interview_scheduled` - Interview scheduled
- `interviewed` - Interview completed
- `selected` - Candidate selected
- `rejected` - Application rejected
- `offer_sent` - Offer sent
- `joined` - Candidate joined

---

## Environment Variables

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Testing

```bash
# Run database tests
npm run test:db

# Expected: All tests pass
```

---

## Common Pitfalls

### ❌ Don't: Use admin client in client components
```typescript
// WRONG - Exposes service role key
import { supabaseAdmin } from '@/lib/supabase';

export default function MyComponent() {
  const { data } = await supabaseAdmin.from('reservations').select('*');
}
```

### ✅ Do: Use public client in client components
```typescript
// CORRECT - Uses anon key
import { supabase } from '@/lib/supabase';

export default function MyComponent() {
  const { data } = await supabase.from('feedback').select('*');
}
```

### ❌ Don't: Forget error handling
```typescript
// WRONG - No error handling
const { data } = await supabase.from('reservations').insert(data);
return data;
```

### ✅ Do: Always handle errors
```typescript
// CORRECT - Proper error handling
const { data, error } = await supabase.from('reservations').insert(data);
if (error) throw error;
return data;
```

### ❌ Don't: Select all fields when not needed
```typescript
// WRONG - Gets all fields
const { data } = await supabase.from('reservations').select('*');
```

### ✅ Do: Select only needed fields
```typescript
// CORRECT - Only gets needed fields
const { data } = await supabase
  .from('reservations')
  .select('id, name, date, time');
```

---

## Useful SQL Queries (Run in Supabase SQL Editor)

### Check table sizes
```sql
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Count all records
```sql
SELECT
  'reservations' as table,
  COUNT(*) as count
FROM reservations
UNION ALL
SELECT 'private_events', COUNT(*) FROM private_events
UNION ALL
SELECT 'banquets', COUNT(*) FROM banquets
UNION ALL
SELECT 'contact', COUNT(*) FROM contact_submissions
UNION ALL
SELECT 'feedback', COUNT(*) FROM feedback
UNION ALL
SELECT 'careers', COUNT(*) FROM career_applications;
```

### Get pending items across all tables
```sql
SELECT * FROM pending_items_dashboard
ORDER BY created_at DESC
LIMIT 50;
```

---

**Quick Reference Complete** 📚

For detailed documentation, see:
- `DATABASE_README.md` - Complete overview
- `SUPABASE_SETUP.md` - Setup guide
- `API_ROUTES_SPEC.md` - API specifications
