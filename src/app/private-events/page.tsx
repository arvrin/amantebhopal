'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, DollarSign, MapPin, MessageSquare, Phone, Mail, Building2, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { toast } from 'react-hot-toast';

export default function PrivateEventsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    eventType: 'Birthday',
    eventDate: '',
    guestCount: '',
    budgetRange: '₹50k-1L',
    spacePreference: 'Any',
    name: '',
    phone: '',
    email: '',
    company: '',
    requirements: '',
    preferredContact: 'Phone',
  });

  const eventTypes = ['Birthday', 'Anniversary', 'Corporate', 'Proposal', 'Celebration', 'Other'];
  const budgetRanges = ['₹50k-1L', '₹1L-2L', '₹2L-5L', '₹5L+'];
  const spacePreferences = ['Private Dining', 'Rooftop Restaurant', 'Banquet Hall', 'Lounge', 'Any'];
  const contactMethods = ['Phone', 'WhatsApp', 'Email'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert guestCount to number
      const submitData = {
        ...formData,
        guestCount: parseInt(formData.guestCount),
      };

      const response = await fetch('/api/private-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setIsSuccess(true);
      toast.success('Event enquiry received! We\'ll contact you within 24 hours.');

      // Reset form
      setFormData({
        eventType: 'Birthday',
        eventDate: '',
        guestCount: '',
        budgetRange: '₹50k-1L',
        spacePreference: 'Any',
        name: '',
        phone: '',
        email: '',
        company: '',
        requirements: '',
        preferredContact: 'Phone',
      });
    } catch (error) {
      console.error('Private event enquiry error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit enquiry. Please try again.');
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
            Event Enquiry Received!
          </h1>

          <p className="font-body text-lg text-amante-charcoal mb-6">
            Thank you for considering Amante for your special event. We've received your enquiry and our events team will contact you within 24 hours to discuss your celebration.
          </p>

          <div className="bg-amante-cream rounded-lg p-6 mb-8">
            <p className="font-body text-amante-charcoal mb-2">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-left space-y-2 font-body text-amante-charcoal">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>Our events team will review your requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>You'll receive a personalized proposal within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>We can schedule a venue tour to see our spaces</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => setIsSuccess(false)}
            >
              Submit Another Enquiry
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
            Private Event Enquiry
          </h1>
          <p className="font-body text-lg text-amante-charcoal max-w-2xl mx-auto">
            Your celebrations deserve spaces designed specifically for them. Share your event vision with us, and we'll create a customized proposal addressing your specific needs.
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
            {/* Event Type & Date */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
                  Event Type
                </label>
                <Select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
                  <Calendar className="inline w-5 h-5 mr-2" />
                  Event Date
                </label>
                <Input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Guest Count & Budget */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
                  <Users className="inline w-5 h-5 mr-2" />
                  Guest Count
                </label>
                <Input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  required
                  min="1"
                  max="500"
                  placeholder="Approximate number of guests"
                />
                <p className="text-sm text-amante-grey mt-1">
                  Estimated guest count (10-500)
                </p>
              </div>

              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
                  <DollarSign className="inline w-5 h-5 mr-2" />
                  Budget Range
                </label>
                <Select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  required
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </Select>
                <p className="text-sm text-amante-grey mt-1">
                  Helps us tailor proposals to your requirements
                </p>
              </div>
            </div>

            {/* Space Preference */}
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
                We'll suggest options based on your needs
              </p>
            </div>

            {/* Contact Information */}
            <div className="border-t border-amante-grey-light pt-6">
              <h3 className="font-heading text-xl text-amante-red mb-4">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
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

                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
                    <Building2 className="inline w-5 h-5 mr-2" />
                    Company/Organization (Optional)
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="If applicable"
                    maxLength={100}
                  />
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block font-body font-semibold text-amante-charcoal mb-2">
                <MessageSquare className="inline w-5 h-5 mr-2" />
                Event Vision & Requirements
              </label>
              <Textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us about your event - theme, menu preferences, special requirements, etc."
                maxLength={1000}
              />
              <p className="text-sm text-amante-grey mt-1">
                {formData.requirements.length}/1000 characters - The more details you share, the better we can customize your proposal
              </p>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block font-body font-semibold text-amante-charcoal mb-2">
                Preferred Contact Method
              </label>
              <Select
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleChange}
                required
              >
                {contactMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </Select>
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
                {isSubmitting ? 'Submitting...' : 'Request Event Proposal'}
              </Button>
            </div>

            <p className="text-sm text-center text-amante-grey mt-4">
              Our events team will review your requirements and send a customized proposal within 24 hours.
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
            Need Help?
          </h3>
          <p className="font-body text-amante-charcoal mb-4">
            For immediate assistance or to schedule a venue tour, please contact our events team:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+919893779100"
              className="flex items-center gap-2 font-body font-semibold text-amante-red hover:text-amante-red-dark transition-colors"
            >
              <Phone className="w-5 h-5" />
              +91 98937 79100
            </a>
            <span className="hidden sm:block text-amante-grey">|</span>
            <a
              href="mailto:events@amante.in"
              className="flex items-center gap-2 font-body font-semibold text-amante-red hover:text-amante-red-dark transition-colors"
            >
              <Mail className="w-5 h-5" />
              events@amante.in
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
