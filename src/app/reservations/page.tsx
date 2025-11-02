'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, PartyPopper, MessageSquare, Phone, Mail, User, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';

export default function ReservationsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    partySize: '',
    spacePreference: 'Any',
    occasion: '',
    name: '',
    phone: '',
    email: '',
    specialRequests: '',
    agreeToSMS: false,
  });

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM'
  ];

  const spacePreferences = [
    'Any',
    'Rooftop Restaurant',
    'Lounge',
    'Café & Bakery',
    'Club',
    'Private Dining'
  ];

  const occasions = [
    'Just Dining',
    'Birthday',
    'Anniversary',
    'Date Night',
    'Business Meeting',
    'Celebration',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert partySize to number
      const submitData = {
        ...formData,
        partySize: parseInt(formData.partySize),
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit reservation');
      }

      setIsSuccess(true);

      // Reset form
      setFormData({
        date: '',
        time: '',
        partySize: '',
        spacePreference: 'Any',
        occasion: '',
        name: '',
        phone: '',
        email: '',
        specialRequests: '',
        agreeToSMS: false,
      });
    } catch (error) {
      console.error('Reservation error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-amante-cream flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>

          <h1 className="font-heading text-3xl md:text-4xl text-amante-red mb-4">
            Reservation Request Received!
          </h1>

          <p className="font-body text-lg text-amante-charcoal mb-6">
            Thank you for choosing Amante! We've received your reservation request and will contact you within 2 hours to confirm your table.
          </p>

          <div className="bg-amante-cream rounded-lg p-6 mb-8">
            <p className="font-body text-amante-charcoal mb-2">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-left space-y-2 font-body text-amante-charcoal">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>Our team will review your reservation details</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>You'll receive a confirmation call or message within 2 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>We'll prepare everything to make your experience special</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => setIsSuccess(false)}
            >
              Make Another Reservation
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amante-cream py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl text-amante-red mb-4">
            Reserve Your Table
          </h1>
          <p className="font-body text-lg text-amante-charcoal max-w-2xl mx-auto">
            Experience Bhopal's finest multi-concept dining destination. Book your table and let us create unforgettable moments for you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date, Time & Party Size */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
                  <Calendar className="inline w-5 h-5 mr-2" />
                  Date
                </label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
                  <Clock className="inline w-5 h-5 mr-2" />
                  Time
                </label>
                <Select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
                  <Users className="inline w-5 h-5 mr-2" />
                  Party Size
                </label>
                <Input
                  type="number"
                  name="partySize"
                  value={formData.partySize}
                  onChange={handleChange}
                  required
                  min="1"
                  max="20"
                  placeholder="Number of guests"
                />
                <p className="text-sm text-amante-grey mt-1">
                  For parties over 20, please contact us
                </p>
              </div>
            </div>

            {/* Space Preference & Occasion */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
                  <MapPin className="inline w-5 h-5 mr-2" />
                  Space Preference
                </label>
                <Select
                  name="spacePreference"
                  value={formData.spacePreference}
                  onChange={handleChange}
                  required
                >
                  {spacePreferences.map((space) => (
                    <option key={space} value={space}>
                      {space}
                    </option>
                  ))}
                </Select>
                <p className="text-sm text-amante-grey mt-1">
                  We'll do our best to accommodate your preference
                </p>
              </div>

              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
                  <PartyPopper className="inline w-5 h-5 mr-2" />
                  Occasion (Optional)
                </label>
                <Select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                >
                  <option value="">Select occasion</option>
                  {occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion}
                    </option>
                  ))}
                </Select>
                <p className="text-sm text-amante-grey mt-1">
                  Help us make your visit extra special
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-amante-grey-light pt-6">
              <h3 className="font-heading text-xl text-amante-red mb-4">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
                    <User className="inline w-5 h-5 mr-2" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body font-semibold text-amante-charcoal mb-2">
                      <Phone className="inline w-5 h-5 mr-2" />
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98937 79100"
                      pattern="[+]?[0-9]{10,15}"
                    />
                  </div>

                  <div>
                    <label className="block font-body font-semibold text-amante-charcoal mb-2">
                      <Mail className="inline w-5 h-5 mr-2" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block font-body font-semibold text-amante-charcoal mb-2">
                <MessageSquare className="inline w-5 h-5 mr-2" />
                Special Requests (Optional)
              </label>
              <Textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                placeholder="Any dietary restrictions, accessibility needs, or special arrangements..."
                maxLength={500}
              />
              <p className="text-sm text-amante-grey mt-1">
                {formData.specialRequests.length}/500 characters
              </p>
            </div>

            {/* SMS Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeToSMS"
                id="agreeToSMS"
                checked={formData.agreeToSMS}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-amante-red border-amante-grey-light rounded focus:ring-amante-red"
              />
              <label htmlFor="agreeToSMS" className="font-body text-sm text-amante-charcoal">
                I agree to receive SMS notifications about my reservation (confirmation, reminders, updates)
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
              </Button>
            </div>

            <p className="text-sm text-center text-amante-grey mt-4">
              We'll contact you within 2 hours to confirm your reservation. For immediate assistance, call us at +91 98937 79100
            </p>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-md"
        >
          <h3 className="font-heading text-xl text-amante-red mb-4">
            Reservation Guidelines
          </h3>
          <div className="grid md:grid-cols-2 gap-6 font-body text-amante-charcoal">
            <div>
              <h4 className="font-semibold mb-2">Timing</h4>
              <ul className="space-y-1 text-sm">
                <li>• Café: 8:00 AM - 11:00 PM</li>
                <li>• Restaurant: 11:00 AM - 11:00 PM</li>
                <li>• Lounge: 12:00 PM - 12:00 AM</li>
                <li>• Club: 8:00 PM - 2:00 AM (Fri & Sat)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Policies</h4>
              <ul className="space-y-1 text-sm">
                <li>• Please arrive within 15 minutes of your reservation</li>
                <li>• Tables held for 15 minutes past reservation time</li>
                <li>• Cancellations: 2 hours advance notice appreciated</li>
                <li>• For large groups (20+), advance deposit may apply</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-amante-grey-light">
            <p className="font-body text-sm text-amante-charcoal">
              <strong>Need help?</strong> Contact our reservations team at{' '}
              <a href="tel:+919893779100" className="text-amante-red hover:text-amante-red-dark">
                +91 98937 79100
              </a>
              {' '}or email{' '}
              <a href="mailto:contact.cafeamante@gmail.com" className="text-amante-red hover:text-amante-red-dark">
                contact.cafeamante@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
