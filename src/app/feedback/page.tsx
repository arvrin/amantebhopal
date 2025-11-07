'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, MessageSquare, ThumbsUp, Mail, User, Check, Award, TrendingUp, Users, Zap } from 'lucide-react';
import Image from 'next/image';
import HeaderGlobal from '@/components/layout/HeaderGlobal';
import Footer from '@/components/layout/Footer';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { toast } from 'react-hot-toast';

export default function FeedbackPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    visitDate: '',
    spaceVisited: 'Café & Bakery',
    overallRating: 0,
    foodRating: 0,
    serviceRating: 0,
    ambianceRating: 0,
    valueRating: 0,
    whatYouLoved: '',
    improvements: '',
    wouldRecommend: 'Definitely',
    name: '',
    email: '',
    canSharePublicly: false,
  });

  const spaces = ['Café & Bakery', 'Rooftop Restaurant', 'Lounge', 'Club', 'Private Dining'];
  const recommendOptions = ['Definitely', 'Probably', 'Maybe', 'No'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRatingChange = (category: string, rating: number) => {
    setFormData((prev) => ({ ...prev, [category]: rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all ratings are set
      if (
        formData.overallRating === 0 ||
        formData.foodRating === 0 ||
        formData.serviceRating === 0 ||
        formData.ambianceRating === 0 ||
        formData.valueRating === 0
      ) {
        throw new Error('Please provide ratings for all categories');
      }

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setIsSuccess(true);
      toast.success('Thank you for your feedback! Your input helps us improve.');

      // Reset form
      setFormData({
        visitDate: '',
        spaceVisited: 'Café & Bakery',
        overallRating: 0,
        foodRating: 0,
        serviceRating: 0,
        ambianceRating: 0,
        valueRating: 0,
        whatYouLoved: '',
        improvements: '',
        wouldRecommend: 'Definitely',
        name: '',
        email: '',
        canSharePublicly: false,
      });

      // Close modal after delay
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({
    category,
    value,
    onChange,
    label
  }: {
    category: string;
    value: number;
    onChange: (category: string, rating: number) => void;
    label: string;
  }) => (
    <div>
      <label className="block font-body font-semibold text-white mb-3">
        {label}
      </label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(category, rating)}
            className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amante-pink focus:ring-offset-2 focus:ring-offset-black rounded"
          >
            <Star
              className={`w-8 h-8 ${
                rating <= value
                  ? 'fill-amante-pink text-amante-pink'
                  : 'text-white/30'
              }`}
            />
          </button>
        ))}
      </div>
      <p className="text-sm text-white/60 mt-2">
        {value === 0 ? 'Click to rate' : `${value} star${value !== 1 ? 's' : ''}`}
      </p>
    </div>
  );

  const impactFeatures = [
    {
      icon: Award,
      title: 'Direct Impact',
      description: 'Management personally reviews every piece of feedback within 24 hours',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'Your insights shape our menu, service standards, and overall experience',
    },
    {
      icon: Users,
      title: 'Community Recognition',
      description: 'Outstanding reviews featured publicly with your permission',
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: 'Specific concerns addressed within 48 hours with direct follow-up',
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
            alt="Amante Experience"
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
                  Your Voice Matters
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-tight"
              >
                Share Your
                <br />
                <span className="text-amante-pink">Experience</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Your feedback helps us create extraordinary moments for every guest. Share your thoughts and help us improve.
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
                  Share Your Feedback
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Your Feedback Matters Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
              Why Your Feedback <span className="text-amante-pink">Matters</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Every piece of feedback is carefully reviewed and directly impacts how we serve you better
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amante-pink/20 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-amante-pink" />
                </div>
                <h3 className="font-heading text-xl text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
              Ready to Share Your Thoughts?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              It only takes a few minutes to help us serve you better. Your honest feedback is invaluable to us.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30"
            >
              Share Your Feedback
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Feedback Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="5xl">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="font-heading text-3xl text-white mb-4">
              Thank You for Your Feedback!
            </h2>
            <p className="text-lg text-white/70">
              Your input is invaluable to us. We'll review it personally and respond if needed.
            </p>
          </div>
        ) : (
          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <h2 className="font-heading text-2xl text-white mb-6 sticky top-0 bg-black/50 backdrop-blur-sm py-4 -mx-2 px-2 z-10">
              Share Your Feedback
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Visit Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body font-semibold text-white mb-3">
                    <Calendar className="inline w-5 h-5 mr-2" />
                    When did you visit?
                  </label>
                  <Input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block font-body font-semibold text-white mb-3">
                    <MapPin className="inline w-5 h-5 mr-2" />
                    Which space did you visit?
                  </label>
                  <Select
                    name="spaceVisited"
                    value={formData.spaceVisited}
                    onChange={handleChange}
                    required
                  >
                    {spaces.map((space) => (
                      <option key={space} value={space}>
                        {space}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Overall Rating */}
              <div className="border-t border-white/10 pt-6">
                <StarRating
                  category="overallRating"
                  value={formData.overallRating}
                  onChange={handleRatingChange}
                  label="Overall Experience"
                />
              </div>

              {/* Detailed Ratings */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-heading text-xl text-amante-pink mb-6">
                  Rate Your Experience
                </h3>

                <div className="space-y-6">
                  <StarRating
                    category="foodRating"
                    value={formData.foodRating}
                    onChange={handleRatingChange}
                    label="Food Quality"
                  />

                  <StarRating
                    category="serviceRating"
                    value={formData.serviceRating}
                    onChange={handleRatingChange}
                    label="Service Quality"
                  />

                  <StarRating
                    category="ambianceRating"
                    value={formData.ambianceRating}
                    onChange={handleRatingChange}
                    label="Ambiance & Atmosphere"
                  />

                  <StarRating
                    category="valueRating"
                    value={formData.valueRating}
                    onChange={handleRatingChange}
                    label="Value for Money"
                  />
                </div>
              </div>

              {/* Written Feedback */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-heading text-xl text-amante-pink mb-6">
                  Tell Us More
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block font-body font-semibold text-white mb-3">
                      <MessageSquare className="inline w-5 h-5 mr-2" />
                      What did you love?
                    </label>
                    <Textarea
                      name="whatYouLoved"
                      value={formData.whatYouLoved}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="What made your experience enjoyable?"
                      maxLength={500}
                    />
                    <p className="text-sm text-white/60 mt-2">
                      {formData.whatYouLoved.length}/500 characters
                    </p>
                  </div>

                  <div>
                    <label className="block font-body font-semibold text-white mb-3">
                      How can we improve? (Optional)
                    </label>
                    <Textarea
                      name="improvements"
                      value={formData.improvements}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Your honest feedback helps us grow"
                      maxLength={500}
                    />
                    <p className="text-sm text-white/60 mt-2">
                      {formData.improvements.length}/500 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Would Recommend */}
              <div>
                <label className="block font-body font-semibold text-white mb-3">
                  <ThumbsUp className="inline w-5 h-5 mr-2" />
                  Would you recommend Amante?
                </label>
                <Select
                  name="wouldRecommend"
                  value={formData.wouldRecommend}
                  onChange={handleChange}
                  required
                >
                  {recommendOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Contact Information */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-heading text-xl text-amante-pink mb-4">
                  Contact Information (Optional)
                </h3>
                <p className="font-body text-sm text-white/60 mb-6">
                  Leave your details if you'd like us to respond
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block font-body font-semibold text-white mb-3">
                      <User className="inline w-5 h-5 mr-2" />
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Anonymous feedback is welcome"
                      maxLength={100}
                    />
                  </div>

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
                      placeholder="For follow-up responses"
                      maxLength={100}
                    />
                  </div>
                </div>
              </div>

              {/* Public Sharing Consent */}
              <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <input
                  type="checkbox"
                  name="canSharePublicly"
                  id="canSharePublicly"
                  checked={formData.canSharePublicly}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-amante-pink border-white/30 bg-white/10 rounded focus:ring-amante-pink focus:ring-offset-black"
                />
                <label htmlFor="canSharePublicly" className="font-body text-sm text-white/80 leading-relaxed">
                  I give permission for Amante to share my feedback publicly
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-6 sticky bottom-0 bg-black/50 backdrop-blur-sm -mx-2 px-2 pb-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full px-8 py-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </motion.button>
                <p className="text-sm text-center text-white/60 mt-4">
                  We'll respond within 48 hours if you provided contact details
                </p>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
