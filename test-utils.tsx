import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Mock providers wrapper
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';

// Mock data factories
export const mockReservationData = () => ({
  date: '2025-11-15',
  time: '7:00 PM',
  partySize: 4,
  name: 'Test User',
  phone: '+919876543210',
  email: 'test@example.com',
  agreeToSMS: true,
  specialRequests: 'Window seat please',
});

export const mockPrivateEventData = () => ({
  eventType: 'Corporate Event',
  date: '2025-12-01',
  time: '6:00 PM',
  guestCount: 50,
  name: 'John Doe',
  email: 'john@company.com',
  phone: '+919876543210',
  requirements: 'AV equipment needed',
  agreeToSMS: true,
});

export const mockBanquetData = () => ({
  eventType: 'Wedding',
  date: '2025-12-15',
  time: '5:00 PM',
  guestCount: 150,
  name: 'Jane Smith',
  email: 'jane@email.com',
  phone: '+919876543210',
  requirements: 'Full catering and decoration',
  agreeToSMS: true,
});

export const mockContactData = () => ({
  name: 'Alice Johnson',
  email: 'alice@email.com',
  phone: '+919876543210',
  subject: 'Inquiry',
  message: 'I have a question about your menu',
  preferredContact: 'email' as const,
});

export const mockFeedbackData = () => ({
  name: 'Bob Wilson',
  email: 'bob@email.com',
  phone: '+919876543210',
  visitDate: '2025-10-20',
  rating: 5,
  foodQuality: 5,
  serviceQuality: 5,
  ambiance: 5,
  feedback: 'Excellent experience!',
  wouldRecommend: true,
});

export const mockCareerData = () => ({
  position: 'Chef',
  name: 'Charlie Brown',
  email: 'charlie@email.com',
  phone: '+919876543210',
  experience: '5 years',
  coverLetter: 'I am passionate about cooking',
  availability: 'Immediate',
});

export const mockEventData = () => ({
  title: 'Wine Tasting Night',
  description: 'Join us for an evening of fine wines',
  date: '2025-11-30',
  startTime: '7:00 PM',
  endTime: '10:00 PM',
  category: 'Special Event',
  price: 2500,
  capacity: 30,
  location: 'Main Dining Hall',
  imageUrl: 'https://example.com/wine-tasting.jpg',
});

// Helper to create NextRequest for API testing
export const createMockRequest = (url: string, options: RequestInit = {}) => {
  return new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
};

// Helper to wait for async operations
export const waitFor = async (callback: () => void, timeout = 1000) => {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    try {
      callback();
      return;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
  callback(); // Final attempt
};
