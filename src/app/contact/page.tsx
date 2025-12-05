'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Check, Headphones, Zap, Shield, Heart } from 'lucide-react';
import Image from 'next/image';
import HeaderGlobal from '@/components/layout/HeaderGlobal';
import Footer from '@/components/layout/Footer';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

      // Close modal after delay
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportFeatures = [
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our team is here to assist you every day of the week',
    },
    {
      icon: Zap,
      title: 'Quick Response',
      description: 'Get responses to your inquiries within 24 hours or less',
    },
    {
      icon: Shield,
      title: 'Secure Communication',
      description: 'Your information is safe and protected with us',
    },
    {
      icon: Heart,
      title: 'Personalized Service',
      description: 'Every inquiry receives individual attention from our team',
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 98937 79100',
      subtext: 'Available daily',
      link: 'tel:+919893779100',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'contact.cafeamante@gmail.com',
      subtext: 'Response within 24 hours',
      link: 'mailto:contact.cafeamante@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Amante, Bhopal',
      subtext: 'Madhya Pradesh, India',
      link: 'https://maps.google.com',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: '11:00 AM - 12:00 AM',
      subtext: 'Open daily',
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <HeaderGlobal />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/hero2.jpg"
            alt="Contact Amante"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-amante-pink text-sm uppercase tracking-[0.3em] border border-white/20">
                  We're Here to Help
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-tight"
              >
                Get in
                <br />
                <span className="text-amante-pink">Touch</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Have questions, feedback, or special requests? Our team is ready to assist you with anything you need.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="px-10 py-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30"
                >
                  Send Us a Message
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+919893779100"
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-bold text-lg rounded-full transition-all duration-300"
                >
                  <Phone className="inline w-5 h-5 mr-2" />
                  Call Now
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Support Features Section */}
      <div className="relative bg-gradient-to-b from-black via-amante-charcoal/20 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              Why <span className="text-amante-pink">Contact Us</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
              Experience exceptional customer service that goes beyond expectations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amante-pink/30 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amante-pink/20 to-amante-red/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-amante-pink" />
                </div>
                <h3 className="font-heading text-xl text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="relative bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              Contact <span className="text-amante-pink">Information</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
              Multiple ways to reach us - choose what works best for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amante-pink/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amante-pink/20 to-amante-red/20 rounded-xl flex items-center justify-center mb-6">
                  <info.icon className="w-7 h-7 text-amante-pink" />
                </div>
                <h3 className="font-heading text-lg text-white mb-3">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block text-amante-pink hover:text-amante-pink/80 transition-colors mb-2 break-words"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-white mb-2">{info.content}</p>
                )}
                <p className="text-white/50 text-sm">{info.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="relative bg-gradient-to-b from-black via-amante-charcoal/20 to-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10"
          >
            <h3 className="font-heading text-3xl text-white mb-6 text-center">
              Quick Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/reservations"
                className="group flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amante-pink/30 rounded-xl transition-all duration-300"
              >
                <span className="text-amante-pink text-2xl group-hover:translate-x-1 transition-transform">→</span>
                <span className="text-white font-body">Make a Reservation</span>
              </a>
              <a
                href="/private-events"
                className="group flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amante-pink/30 rounded-xl transition-all duration-300"
              >
                <span className="text-amante-pink text-2xl group-hover:translate-x-1 transition-transform">→</span>
                <span className="text-white font-body">Plan an Event</span>
              </a>
              <a
                href="/feedback"
                className="group flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amante-pink/30 rounded-xl transition-all duration-300"
              >
                <span className="text-amante-pink text-2xl group-hover:translate-x-1 transition-transform">→</span>
                <span className="text-white font-body">Share Feedback</span>
              </a>
              <a
                href="/careers"
                className="group flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amante-pink/30 rounded-xl transition-all duration-300"
              >
                <span className="text-amante-pink text-2xl group-hover:translate-x-1 transition-transform">→</span>
                <span className="text-white font-body">Join Our Team</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Contact Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Send Us a Message">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-heading text-white mb-3">Message Sent!</h3>
            <p className="text-white/70">We'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Details - Primary */}
            <div>
              <label className="block font-body font-semibold text-white mb-2">
                Your Name <span className="text-amante-pink">*</span>
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

            {/* Phone & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-body font-semibold text-white mb-2">
                  Phone Number <span className="text-amante-pink">*</span>
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
                <label className="block font-body font-semibold text-white mb-2">
                  Email Address <span className="text-white/40 text-sm font-normal">(Optional)</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Inquiry Type */}
            <div>
              <label className="block font-body font-semibold text-white mb-2">
                Subject <span className="text-amante-pink">*</span>
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

            {/* Message */}
            <div>
              <label className="block font-body font-semibold text-white mb-2">
                Your Message <span className="text-amante-pink">*</span>
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
              <p className="text-sm text-white/50 mt-1">
                {formData.message.length}/2000 characters
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>

            <p className="text-sm text-center text-white/50 mt-4">
              We typically respond within 24 hours
            </p>
          </form>
        )}
      </Modal>
    </div>
  );
}
