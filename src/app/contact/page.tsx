'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Check } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    inquiryType: 'General',
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const inquiryTypes = ['Reservation', 'Event', 'General', 'Corporate', 'Jobs', 'Press', 'Issue', 'Feedback'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSuccess(true);
      toast.success('Message sent! We\'ll respond within 24 hours.');

      // Reset form
      setFormData({
        inquiryType: 'General',
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
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
            Message Sent!
          </h1>

          <p className="font-body text-lg text-amante-charcoal mb-6">
            Thank you for reaching out to Amante. We've received your message and will respond to your email within 24 hours.
          </p>

          <div className="bg-amante-cream rounded-lg p-6 mb-8">
            <p className="font-body text-amante-charcoal mb-2">
              <strong>Need immediate assistance?</strong>
            </p>
            <p className="font-body text-amante-charcoal">
              For urgent matters, call us directly at +91 98937 79100. We're available daily from 11:00 AM to 11:00 PM.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => setIsSuccess(false)}
            >
              Send Another Message
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
      <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-amante-cream pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl text-amante-red mb-4">
            Get in Touch
          </h1>
          <p className="font-body text-lg text-amante-charcoal max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have questions, need information, or want to share feedback, our team is here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="font-heading text-2xl text-amante-red mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type */}
                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
                    Subject
                  </label>
                  <Select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Name */}
                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
                    Your Name
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

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-6">
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
                </div>

                {/* Message */}
                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
                    <MessageSquare className="inline w-5 h-5 mr-2" />
                    Your Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="How can we help you?"
                    maxLength={2000}
                  />
                  <p className="text-sm text-amante-grey mt-1">
                    {formData.message.length}/2000 characters
                  </p>
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
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>

                <p className="text-sm text-center text-amante-grey mt-4">
                  We typically respond within 24 hours
                </p>
              </form>
            </div>
          </motion.div>

          {/* Contact Information Sidebar - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Phone */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amante-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-amante-red" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-amante-charcoal mb-2">
                    Call Us
                  </h3>
                  <a
                    href="tel:+919893779100"
                    className="font-body text-amante-red hover:text-amante-red-dark transition-colors block"
                  >
                    +91 98937 79100
                  </a>
                  <p className="font-body text-sm text-amante-grey mt-1">
                    Available daily
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amante-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-amante-red" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-amante-charcoal mb-2">
                    Email Us
                  </h3>
                  <a
                    href="mailto:contact.cafeamante@gmail.com"
                    className="font-body text-amante-red hover:text-amante-red-dark transition-colors block text-sm break-all"
                  >
                    contact.cafeamante@gmail.com
                  </a>
                  <p className="font-body text-sm text-amante-grey mt-1">
                    Response within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amante-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-amante-red" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-amante-charcoal mb-2">
                    Visit Us
                  </h3>
                  <p className="font-body text-amante-charcoal">
                    Amante<br />
                    Bhopal, Madhya Pradesh
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-amante-red hover:text-amante-red-dark transition-colors inline-block mt-2"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amante-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-amante-red" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-amante-charcoal mb-2">
                    Hours
                  </h3>
                  <div className="font-body text-amante-charcoal space-y-1">
                    <p className="font-semibold">Open Daily</p>
                    <p className="text-sm">11:00 AM - 12:00 AM</p>
                    <p className="text-sm text-amante-grey">Café opens at 8:00 AM</p>
                    <p className="text-sm text-amante-grey">Club open till 2:00 AM</p>
                    <p className="text-sm text-amante-grey">(Fri & Sat)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-amante-red/5 rounded-xl p-6">
              <h3 className="font-heading text-lg text-amante-charcoal mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="/reservations"
                  className="block font-body text-amante-red hover:text-amante-red-dark transition-colors"
                >
                  → Make a Reservation
                </a>
                <a
                  href="/private-events"
                  className="block font-body text-amante-red hover:text-amante-red-dark transition-colors"
                >
                  → Plan an Event
                </a>
                <a
                  href="/feedback"
                  className="block font-body text-amante-red hover:text-amante-red-dark transition-colors"
                >
                  → Share Feedback
                </a>
                <a
                  href="/careers"
                  className="block font-body text-amante-red hover:text-amante-red-dark transition-colors"
                >
                  → Join Our Team
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
