'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, User, Mail, Phone, MapPin, Calendar, DollarSign, Link as LinkIcon, MessageSquare, Upload, Check, TrendingUp, Award, Users, Trophy, Target, Home, Clock } from 'lucide-react';
import HeaderGlobal from '@/components/layout/HeaderGlobal';
import Footer from '@/components/layout/Footer';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import FileUpload from '@/components/ui/FileUpload';
import { toast } from 'react-hot-toast';

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    position: 'Chef',
    fullName: '',
    email: '',
    phone: '',
    currentCity: '',
    experienceYears: '',
    currentPosition: '',
    expectedSalary: '',
    portfolioUrl: '',
    whyAmante: '',
    availableToJoin: '',
  });

  const positions = ['Chef', 'Sous Chef', 'Bartender', 'Server', 'Host', 'Manager', 'Housekeeping', 'Kitchen Staff', 'Security', 'Other'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file: File | null) => {
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!resumeFile) {
        throw new Error('Please upload your resume');
      }

      // Create FormData for multipart upload
      const submitFormData = new FormData();
      submitFormData.append('position', formData.position);
      submitFormData.append('fullName', formData.fullName);
      submitFormData.append('email', formData.email);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('currentCity', formData.currentCity);
      submitFormData.append('experienceYears', formData.experienceYears);
      submitFormData.append('currentPosition', formData.currentPosition);
      submitFormData.append('expectedSalary', formData.expectedSalary);
      submitFormData.append('portfolioUrl', formData.portfolioUrl);
      submitFormData.append('whyAmante', formData.whyAmante);
      submitFormData.append('availableToJoin', formData.availableToJoin);
      submitFormData.append('resume', resumeFile);

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: submitFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setIsSuccess(true);
      toast.success('Application submitted! We\'ll review it and contact you if there\'s a match.');

      // Auto-close modal and reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false);
        // Reset form
        setFormData({
          position: 'Chef',
          fullName: '',
          email: '',
          phone: '',
          currentCity: '',
          experienceYears: '',
          currentPosition: '',
          expectedSalary: '',
          portfolioUrl: '',
          whyAmante: '',
          availableToJoin: '',
        });
        setResumeFile(null);
      }, 3000);
    } catch (error) {
      console.error('Career application error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyWorkFeatures = [
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear advancement paths, mentorship programs, and leadership training',
    },
    {
      icon: Award,
      title: 'Competitive Compensation',
      description: 'Industry-leading salaries, performance bonuses, and comprehensive benefits',
    },
    {
      icon: Users,
      title: 'World-Class Team',
      description: 'Work alongside passionate professionals who value excellence and innovation',
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible scheduling, paid time off, and employee wellness programs',
    },
  ];

  const perks = [
    {
      icon: Trophy,
      title: 'Performance Bonuses',
      description: 'Quarterly incentives and recognition rewards',
    },
    {
      icon: Users,
      title: 'Staff Meals',
      description: 'Complimentary meals during shifts',
    },
    {
      icon: Home,
      title: 'Accommodation',
      description: 'Housing support for eligible positions',
    },
    {
      icon: Target,
      title: 'Learning & Development',
      description: 'Professional training and skill-building workshops',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <HeaderGlobal />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/hero1.jpeg"
            alt="Join Amante Team"
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
              <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-amante-pink text-sm uppercase tracking-[0.3em] border border-white/20 mb-8">
                Be Part of Excellence
              </span>

              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-tight">
                Join the
                <br />
                <span className="text-amante-pink">Amante Family</span>
              </h1>

              <p className="font-body text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
                Building Bhopal's premier dining destination requires exceptional people who are passionate about hospitality and committed to excellence.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30"
              >
                Apply Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Work at Amante Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
              Why Work at <span className="text-amante-pink">Amante</span>
            </h2>
            <p className="font-body text-xl text-white/70 max-w-3xl mx-auto">
              Join a team where your talent is recognized, your growth is prioritized, and excellence is the standard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {whyWorkFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B1538]/20 to-[#6B0F28]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-amante-pink" />
                </div>
                <h3 className="font-heading text-xl text-white mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Perks & Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <h3 className="font-heading text-3xl text-white mb-8 text-center">
              Perks & <span className="text-amante-pink">Benefits</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {perks.map((perk, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538]/20 to-[#6B0F28]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <perk.icon className="w-6 h-6 text-amante-pink" />
                  </div>
                  <h4 className="font-body font-semibold text-white mb-2">
                    {perk.title}
                  </h4>
                  <p className="font-body text-sm text-white/60">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="font-body text-xl text-white/70 mb-8">
              Take the first step toward a rewarding career with Bhopal's most exciting hospitality destination.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30"
            >
              Apply Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
          >
            <h3 className="font-heading text-2xl text-amante-pink mb-4">
              Questions About Careers?
            </h3>
            <p className="font-body text-white/70 mb-6">
              Want to learn more about career opportunities at Amante? Contact our HR team:
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:+919893779100"
                className="flex items-center gap-2 font-body font-semibold text-amante-pink hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                +91 98937 79100 (ext. 4)
              </a>
              <span className="hidden sm:block text-white/30">|</span>
              <a
                href="mailto:careers@amante.in"
                className="flex items-center gap-2 font-body font-semibold text-amante-pink hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                careers@amante.in
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Application Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="5xl">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="font-heading text-3xl text-white mb-4">
              Application Submitted!
            </h2>
            <p className="text-lg text-white/70 mb-4">
              Thank you for your interest in joining the Amante team!
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-sm text-white/60">
                Our hiring team will review it carefully and contact you within 2-3 weeks if there's a match.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <h2 className="font-heading text-2xl text-white mb-6 sticky top-0 bg-black/50 backdrop-blur-sm py-4 -mx-2 px-2 z-10">
              Application Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Position */}
              <div>
                <label className="block font-body font-semibold text-white mb-3">
                  <Briefcase className="inline w-5 h-5 mr-2" />
                  Position Applying For
                </label>
                <Select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Personal Information */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="font-heading text-xl text-amante-pink mb-6">
                  Personal Information
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block font-body font-semibold text-white mb-3">
                      <User className="inline w-5 h-5 mr-2" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-body font-semibold text-white mb-3">
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
                      <label className="block font-body font-semibold text-white mb-3">
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

                  <div>
                    <label className="block font-body font-semibold text-white mb-3">
                      <MapPin className="inline w-5 h-5 mr-2" />
                      Current City
                    </label>
                    <Input
                      type="text"
                      name="currentCity"
                      value={formData.currentCity}
                      onChange={handleChange}
                      required
                      placeholder="Bhopal"
                    />
                    <p className="text-sm text-white/60 mt-2">
                      Are you currently in Bhopal or willing to relocate?
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience & Qualifications */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="font-heading text-xl text-amante-pink mb-6">
                  Experience & Qualifications
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block font-body font-semibold text-white mb-3">
                      Years of Experience
                    </label>
                    <Input
                      type="number"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleChange}
                      required
                      min="0"
                      max="50"
                      placeholder="Years of relevant experience"
                    />
                    <p className="text-sm text-white/60 mt-2">
                      If you're new to hospitality but passionate, enter 0 and tell us why below
                    </p>
                  </div>

                  <div>
                    <label className="block font-body font-semibold text-white mb-3">
                      Current/Most Recent Position (Optional)
                    </label>
                    <Input
                      type="text"
                      name="currentPosition"
                      value={formData.currentPosition}
                      onChange={handleChange}
                      placeholder="Your current or most recent job title"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block font-body font-semibold text-white mb-3">
                      <DollarSign className="inline w-5 h-5 mr-2" />
                      Expected Salary (Optional)
                    </label>
                    <Input
                      type="number"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      min="0"
                      placeholder="Monthly salary expectation (INR)"
                    />
                  </div>

                  <div>
                    <label className="block font-body font-semibold text-white mb-3">
                      <LinkIcon className="inline w-5 h-5 mr-2" />
                      Portfolio/LinkedIn URL (Optional)
                    </label>
                    <Input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="border-t border-white/10 pt-8">
                <FileUpload
                  label="Resume/CV"
                  required
                  maxSize={5}
                  acceptedFormats={['.pdf', '.doc', '.docx']}
                  onFileSelect={handleFileSelect}
                  helperText="Upload your resume in PDF or DOC format (max 5MB)"
                />
              </div>

              {/* Why Amante */}
              <div>
                <label className="block font-body font-semibold text-white mb-3">
                  <MessageSquare className="inline w-5 h-5 mr-2" />
                  Why do you want to join Amante?
                </label>
                <Textarea
                  name="whyAmante"
                  value={formData.whyAmante}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="What excites you about this opportunity? What unique value will you bring to our team?"
                  maxLength={1000}
                />
                <p className="text-sm text-white/60 mt-2">
                  {formData.whyAmante.length}/1000 characters
                </p>
              </div>

              {/* Availability */}
              <div>
                <label className="block font-body font-semibold text-white mb-3">
                  <Calendar className="inline w-5 h-5 mr-2" />
                  Available to Join From
                </label>
                <Input
                  type="date"
                  name="availableToJoin"
                  value={formData.availableToJoin}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Submit Button - Sticky at bottom */}
              <div className="pt-6 sticky bottom-0 bg-black/50 backdrop-blur-sm py-4 -mx-2 px-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full px-8 py-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </motion.button>
              </div>

              <p className="text-sm text-center text-white/60 mt-4">
                We review all applications carefully and contact qualified candidates within 2-3 weeks.
              </p>
            </form>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
