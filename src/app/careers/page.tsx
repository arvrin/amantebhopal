'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, User, Mail, Phone, MapPin, Calendar, DollarSign, Link as LinkIcon, MessageSquare, Upload, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import FileUpload from '@/components/ui/FileUpload';
import { toast } from 'react-hot-toast';

export default function CareersPage() {
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

      // Upload resume file first
      const uploadFormData = new FormData();
      uploadFormData.append('file', resumeFile);
      uploadFormData.append('type', 'resume');

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload resume');
      }

      const { url: resumeUrl } = await uploadResponse.json();

      // Submit application with resume URL
      const submitData = {
        ...formData,
        experienceYears: parseInt(formData.experienceYears) || 0,
        expectedSalary: formData.expectedSalary ? parseInt(formData.expectedSalary) : undefined,
        resumeUrl,
      };

      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setIsSuccess(true);
      toast.success('Application submitted! We\'ll review it and contact you if there\'s a match.');

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
    } catch (error) {
      console.error('Career application error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
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
            Application Submitted!
          </h1>

          <p className="font-body text-lg text-amante-charcoal mb-6">
            Thank you for your interest in joining the Amante team! We've received your application and our hiring team will review it carefully.
          </p>

          <div className="bg-amante-cream rounded-lg p-6 mb-8">
            <p className="font-body text-amante-charcoal mb-2">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-left space-y-2 font-body text-amante-charcoal">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>Our hiring team will review your qualifications</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>If there's a match, we'll contact you within 2-3 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>We keep applications on file for future opportunities</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => setIsSuccess(false)}
            >
              Submit Another Application
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
            Join the Amante Family
          </h1>
          <p className="font-body text-lg text-amante-charcoal max-w-2xl mx-auto">
            Building Bhopal's premier dining destination requires exceptional people who are passionate about hospitality and committed to excellence. Apply to join our team.
          </p>
        </motion.div>

        {/* Why Work at Amante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-md mb-8"
        >
          <h2 className="font-heading text-2xl text-amante-red mb-4">
            Why Work at Amante?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-body font-semibold text-amante-charcoal mb-2">
                Growth Opportunities
              </h3>
              <p className="font-body text-sm text-amante-grey">
                Comprehensive training, clear career paths, and promotion from within
              </p>
            </div>
            <div>
              <h3 className="font-body font-semibold text-amante-charcoal mb-2">
                Great Benefits
              </h3>
              <p className="font-body text-sm text-amante-grey">
                Competitive pay, performance bonuses, staff meals, and health benefits
              </p>
            </div>
            <div>
              <h3 className="font-body font-semibold text-amante-charcoal mb-2">
                Supportive Culture
              </h3>
              <p className="font-body text-sm text-amante-grey">
                Work with passionate professionals who value excellence and teamwork
              </p>
            </div>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-10"
        >
          <h2 className="font-heading text-2xl text-amante-red mb-6">
            Application Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Position */}
            <div>
              <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
            <div className="border-t border-amante-grey-light pt-6">
              <h3 className="font-heading text-xl text-amante-red mb-4">
                Personal Information
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
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

                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
                  <p className="text-sm text-amante-grey mt-1">
                    Are you currently in Bhopal or willing to relocate?
                  </p>
                </div>
              </div>
            </div>

            {/* Experience & Qualifications */}
            <div className="border-t border-amante-grey-light pt-6">
              <h3 className="font-heading text-xl text-amante-red mb-4">
                Experience & Qualifications
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
                  <p className="text-sm text-amante-grey mt-1">
                    If you're new to hospitality but passionate, enter 0 and tell us why in the section below
                  </p>
                </div>

                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
            <div className="border-t border-amante-grey-light pt-6">
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
              <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
              <p className="text-sm text-amante-grey mt-1">
                {formData.whyAmante.length}/1000 characters - Tell us what makes you passionate about joining our team
              </p>
            </div>

            {/* Availability */}
            <div>
              <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
                <Upload className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </Button>
            </div>

            <p className="text-sm text-center text-amante-grey mt-4">
              We review all applications carefully and contact qualified candidates within 2-3 weeks. We keep applications on file for future opportunities.
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
            Questions About Careers?
          </h3>
          <p className="font-body text-amante-charcoal mb-4">
            Want to learn more about career opportunities at Amante? Contact our HR team:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+919893779100"
              className="flex items-center gap-2 font-body font-semibold text-amante-red hover:text-amante-red-dark transition-colors"
            >
              <Phone className="w-5 h-5" />
              +91 98937 79100 (ext. 4)
            </a>
            <span className="hidden sm:block text-amante-grey">|</span>
            <a
              href="mailto:careers@amante.in"
              className="flex items-center gap-2 font-body font-semibold text-amante-red hover:text-amante-red-dark transition-colors"
            >
              <Mail className="w-5 h-5" />
              careers@amante.in
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
