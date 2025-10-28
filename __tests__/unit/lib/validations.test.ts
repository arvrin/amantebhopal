import { describe, it, expect } from 'vitest';
import {
  reservationSchema,
  privateEventSchema,
  banquetSchema,
  contactSchema,
  feedbackSchema,
  careerSchema,
  sanitizeString,
  sanitizeObject,
  formatPhoneNumber,
  isValidIndianPhone,
  validateResumeFile,
} from '@/lib/validations';

describe('Validation Schemas', () => {
  describe('reservationSchema', () => {
    it('validates correct reservation data', () => {
      const validData = {
        date: '2025-12-01',
        time: '7:00 PM',
        partySize: 4,
        spacePreference: 'Rooftop Restaurant',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@example.com',
        agreeToSMS: true,
      };

      const result = reservationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejects invalid phone number', () => {
      const invalidData = {
        date: '2025-12-01',
        time: '7:00 PM',
        partySize: 4,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: 'invalid',
        email: 'john@example.com',
        agreeToSMS: true,
      };

      const result = reservationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects party size over 20', () => {
      const invalidData = {
        date: '2025-12-01',
        time: '7:00 PM',
        partySize: 25,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@example.com',
        agreeToSMS: true,
      };

      const result = reservationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects when SMS agreement is false', () => {
      const invalidData = {
        date: '2025-12-01',
        time: '7:00 PM',
        partySize: 4,
        spacePreference: 'Any',
        name: 'John Doe',
        phone: '+919876543210',
        email: 'john@example.com',
        agreeToSMS: false,
      };

      const result = reservationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('contactSchema', () => {
    it('validates correct contact data', () => {
      const validData = {
        inquiryType: 'General',
        name: 'Alice Johnson',
        phone: '+919876543210',
        email: 'alice@email.com',
        message: 'This is a test message with enough characters',
      };

      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejects message shorter than 10 characters', () => {
      const invalidData = {
        inquiryType: 'General',
        name: 'Alice Johnson',
        phone: '+919876543210',
        email: 'alice@email.com',
        message: 'Short',
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects message longer than 2000 characters', () => {
      const invalidData = {
        inquiryType: 'General',
        name: 'Alice Johnson',
        phone: '+919876543210',
        email: 'alice@email.com',
        message: 'a'.repeat(2001),
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('feedbackSchema', () => {
    it('validates correct feedback data', () => {
      const validData = {
        visitDate: '2025-10-20',
        spaceVisited: 'Rooftop Restaurant',
        overallRating: 5,
        foodRating: 5,
        serviceRating: 5,
        ambianceRating: 5,
        valueRating: 5,
        whatYouLoved: 'Everything was perfect and amazing!',
        wouldRecommend: 'Definitely',
        canSharePublicly: true,
      };

      const result = feedbackSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejects rating below 1', () => {
      const invalidData = {
        visitDate: '2025-10-20',
        spaceVisited: 'Rooftop Restaurant',
        overallRating: 0,
        foodRating: 5,
        serviceRating: 5,
        ambianceRating: 5,
        valueRating: 5,
        whatYouLoved: 'Test feedback',
        wouldRecommend: 'Definitely',
        canSharePublicly: true,
      };

      const result = feedbackSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects rating above 5', () => {
      const invalidData = {
        visitDate: '2025-10-20',
        spaceVisited: 'Rooftop Restaurant',
        overallRating: 6,
        foodRating: 5,
        serviceRating: 5,
        ambianceRating: 5,
        valueRating: 5,
        whatYouLoved: 'Test feedback',
        wouldRecommend: 'Definitely',
        canSharePublicly: true,
      };

      const result = feedbackSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('careerSchema', () => {
    it('validates correct career data', () => {
      const validData = {
        position: 'Chef',
        fullName: 'Charlie Brown',
        email: 'charlie@email.com',
        phone: '+919876543210',
        currentCity: 'Mumbai',
        experienceYears: 5,
        whyAmante: 'I am passionate about creating exceptional dining experiences and want to be part of a team that values innovation and creativity in the culinary arts.',
        availableToJoin: '2025-11-01',
        resumeUrl: 'https://example.com/resume.pdf',
      };

      const result = careerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejects whyAmante shorter than 50 characters', () => {
      const invalidData = {
        position: 'Chef',
        fullName: 'Charlie Brown',
        email: 'charlie@email.com',
        phone: '+919876543210',
        currentCity: 'Mumbai',
        experienceYears: 5,
        whyAmante: 'Too short',
        availableToJoin: '2025-11-01',
        resumeUrl: 'https://example.com/resume.pdf',
      };

      const result = careerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects invalid resume URL', () => {
      const invalidData = {
        position: 'Chef',
        fullName: 'Charlie Brown',
        email: 'charlie@email.com',
        phone: '+919876543210',
        currentCity: 'Mumbai',
        experienceYears: 5,
        whyAmante: 'I am passionate about creating exceptional dining experiences and want to be part of a team.',
        availableToJoin: '2025-11-01',
        resumeUrl: 'not-a-url',
      };

      const result = careerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

describe('Utility Functions', () => {
  describe('sanitizeString', () => {
    it('removes angle brackets', () => {
      const input = 'Hello <script>alert("xss")</script> World';
      const result = sanitizeString(input);
      expect(result).toBe('Hello scriptalert("xss")/script World');
    });

    it('removes javascript: protocol', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizeString(input);
      expect(result).toBe('alert("xss")');
    });

    it('removes event handlers', () => {
      const input = 'onclick=alert("xss")';
      const result = sanitizeString(input);
      expect(result).toBe('alert("xss")');
    });

    it('trims whitespace', () => {
      const input = '  Hello World  ';
      const result = sanitizeString(input);
      expect(result).toBe('Hello World');
    });
  });

  describe('sanitizeObject', () => {
    it('sanitizes all string fields', () => {
      const input = {
        name: '<script>test</script>',
        email: 'test@example.com',
        age: 25,
      };

      const result = sanitizeObject(input);
      expect(result.name).toBe('scripttest/script');
      expect(result.email).toBe('test@example.com');
      expect(result.age).toBe(25);
    });

    it('sanitizes array of strings', () => {
      const input = {
        tags: ['<script>tag1</script>', 'tag2'],
      };

      const result = sanitizeObject(input);
      expect(result.tags[0]).toBe('scripttag1/script');
      expect(result.tags[1]).toBe('tag2');
    });
  });

  describe('formatPhoneNumber', () => {
    it('formats Indian phone number correctly', () => {
      const phone = '+919876543210';
      const result = formatPhoneNumber(phone);
      expect(result).toBe('+91 98765 43210');
    });

    it('returns unchanged for non-Indian format', () => {
      const phone = '+12025551234';
      const result = formatPhoneNumber(phone);
      expect(result).toBe('+12025551234');
    });
  });

  describe('isValidIndianPhone', () => {
    it('validates correct Indian phone number', () => {
      expect(isValidIndianPhone('+919876543210')).toBe(true);
      expect(isValidIndianPhone('+918765432109')).toBe(true);
      expect(isValidIndianPhone('+917654321098')).toBe(true);
      expect(isValidIndianPhone('+916543210987')).toBe(true);
    });

    it('rejects invalid Indian phone numbers', () => {
      expect(isValidIndianPhone('+915432109876')).toBe(false); // starts with 5
      expect(isValidIndianPhone('+91876543210')).toBe(false); // only 9 digits
      expect(isValidIndianPhone('+9198765432109')).toBe(false); // 11 digits
      expect(isValidIndianPhone('9876543210')).toBe(false); // missing +91
      expect(isValidIndianPhone('+1234567890')).toBe(false); // wrong country code
    });
  });

  describe('validateResumeFile', () => {
    it('validates correct PDF file', () => {
      const file = new File(['content'], 'resume.pdf', { type: 'application/pdf' });
      const result = validateResumeFile(file);
      expect(result.valid).toBe(true);
    });

    it('validates correct DOC file', () => {
      const file = new File(['content'], 'resume.doc', { type: 'application/msword' });
      const result = validateResumeFile(file);
      expect(result.valid).toBe(true);
    });

    it('validates correct DOCX file', () => {
      const file = new File(['content'], 'resume.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const result = validateResumeFile(file);
      expect(result.valid).toBe(true);
    });

    it('rejects file larger than 5MB', () => {
      const largeContent = new Array(6 * 1024 * 1024).fill('a').join('');
      const file = new File([largeContent], 'resume.pdf', { type: 'application/pdf' });
      const result = validateResumeFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('5MB');
    });

    it('rejects invalid file type', () => {
      const file = new File(['content'], 'resume.txt', { type: 'text/plain' });
      const result = validateResumeFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('PDF or DOC');
    });
  });
});
