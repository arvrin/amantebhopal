'use client';

import { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, PartyPopper, MessageSquare, Phone, Mail, User, Check, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      // TEMPORARY MOCK: Simulating API call for preview testing
      // TODO: Replace with Google Form integration
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      console.log('Reservation data (mock):', {
        ...formData,
        partySize: parseInt(formData.partySize),
      });

      setIsSuccess(true);

      // Reset form after showing success
      setTimeout(() => {
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
      }, 3000);
    } catch (error) {
      console.error('Reservation error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors disabled:opacity-50"
                >
                  <X className="w-6 h-6 text-amante-charcoal" />
                </button>

                {isSuccess ? (
                  /* Success State */
                  <div className="p-8 md:p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-success" />
                    </motion.div>

                    <h2 className="font-heading text-3xl md:text-4xl text-amante-red mb-4">
                      Reservation Received!
                    </h2>

                    <p className="font-body text-lg text-amante-charcoal mb-6 max-w-2xl mx-auto">
                      Thank you for choosing Amante! We've received your reservation request and will contact you within 2 hours to confirm your table.
                    </p>

                    <div className="bg-gradient-to-br from-amante-cream to-amante-pink/10 rounded-2xl p-6 mb-8 max-w-xl mx-auto">
                      <p className="font-body text-amante-charcoal mb-3">
                        <strong>What happens next?</strong>
                      </p>
                      <ul className="text-left space-y-2 font-body text-sm text-amante-charcoal">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>Our team will review your details</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>You'll receive confirmation within 2 hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>We'll prepare everything for your visit</span>
                        </li>
                      </ul>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  /* Form State */
                  <div className="max-h-[85vh] overflow-y-auto">
                    {/* Elegant Header */}
                    <div className="relative bg-gradient-to-br from-[#8B1538] to-[#6B0F28] p-6 sm:p-8 overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                          backgroundSize: '20px 20px'
                        }} />
                      </div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Reservation</div>
                          <div className="text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Est. 2025</div>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white text-center mb-2 tracking-tight">
                          Reserve Your Table
                        </h2>
                        <p className="text-white/90 text-center text-sm sm:text-base font-light tracking-wide">
                          Bhopal's finest dining experience awaits
                        </p>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                      {/* Date, Time & Party Size */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-body font-semibold text-amante-charcoal mb-2 text-sm">
                            <Calendar className="inline w-4 h-4 mr-1" />
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
                          <label className="block font-body font-semibold text-amante-charcoal mb-2 text-sm">
                            <Clock className="inline w-4 h-4 mr-1" />
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
                          <label className="block font-body font-semibold text-amante-charcoal mb-2 text-sm">
                            <Users className="inline w-4 h-4 mr-1" />
                            Guests
                          </label>
                          <Input
                            type="number"
                            name="partySize"
                            value={formData.partySize}
                            onChange={handleChange}
                            required
                            min="1"
                            max="20"
                            placeholder="2"
                          />
                        </div>
                      </div>

                      {/* Space & Occasion */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body font-semibold text-amante-charcoal mb-2 text-sm">
                            <MapPin className="inline w-4 h-4 mr-1" />
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
                        </div>

                        <div>
                          <label className="block font-body font-semibold text-amante-charcoal mb-2 text-sm">
                            <PartyPopper className="inline w-4 h-4 mr-1" />
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
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="border-t border-amante-grey-light pt-6">
                        <h3 className="font-heading text-lg text-amante-red mb-4">
                          Contact Information
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <label className="block font-body font-semibold text-amante-charcoal mb-2 text-sm">
                              <User className="inline w-4 h-4 mr-1" />
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

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-body font-semibold text-amante-charcoal mb-2 text-sm">
                                <Phone className="inline w-4 h-4 mr-1" />
                                Phone
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
                              <label className="block font-body font-semibold text-amante-charcoal mb-2 text-sm">
                                <Mail className="inline w-4 h-4 mr-1" />
                                Email
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
                        <label className="block font-body font-semibold text-amante-charcoal mb-2 text-sm">
                          <MessageSquare className="inline w-4 h-4 mr-1" />
                          Special Requests (Optional)
                        </label>
                        <Textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Dietary restrictions, accessibility needs, special arrangements..."
                          maxLength={500}
                        />
                      </div>

                      {/* SMS Consent */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="agreeToSMS"
                          id="agreeToSMS"
                          checked={formData.agreeToSMS}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 text-amante-red border-amante-grey-light rounded focus:ring-amante-red"
                        />
                        <label htmlFor="agreeToSMS" className="font-body text-sm text-amante-charcoal">
                          Send me SMS notifications about my reservation
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
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

                      <p className="text-xs text-center text-amante-grey mt-4">
                        We'll contact you within 2 hours to confirm. For immediate assistance, call +91 98937 79100
                      </p>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}
