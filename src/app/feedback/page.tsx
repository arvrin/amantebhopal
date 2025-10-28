'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, MessageSquare, ThumbsUp, Mail, User, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { toast } from 'react-hot-toast';

export default function FeedbackPage() {
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

  const spaces = ['Café & Bakery', 'Rooftop Restaurant', 'Lounge', 'Club', 'Private Dining', 'Banquet'];
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
      <label className="block font-body font-semibold text-amante-charcoal mb-2">
        {label}
      </label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(category, rating)}
            className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amante-red focus:ring-offset-2 rounded"
          >
            <Star
              className={`w-8 h-8 ${
                rating <= value
                  ? 'fill-amante-red text-amante-red'
                  : 'text-amante-grey-light'
              }`}
            />
          </button>
        ))}
      </div>
      <p className="text-sm text-amante-grey mt-1">
        {value === 0 ? 'Click to rate' : `${value} star${value !== 1 ? 's' : ''}`}
      </p>
    </div>
  );

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
            Thank You for Your Feedback!
          </h1>

          <p className="font-body text-lg text-amante-charcoal mb-6">
            Your input is invaluable to us. We read every piece of feedback carefully and use it to continually improve our service, food, and overall experience.
          </p>

          <div className="bg-amante-cream rounded-lg p-6 mb-8">
            <p className="font-body text-amante-charcoal mb-2">
              <strong>We appreciate your time!</strong>
            </p>
            <p className="font-body text-amante-charcoal">
              Your honest feedback helps us maintain excellence and address areas needing improvement. If you raised specific concerns, our management team will review them personally.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => setIsSuccess(false)}
            >
              Submit More Feedback
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
            Share Your Feedback
          </h1>
          <p className="font-body text-lg text-amante-charcoal max-w-2xl mx-auto">
            Your experience matters to us. Share your thoughts—praise, concerns, or suggestions—to help us continually improve and serve you better.
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
            {/* Visit Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
                <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
            <div className="border-t border-amante-grey-light pt-6">
              <StarRating
                category="overallRating"
                value={formData.overallRating}
                onChange={handleRatingChange}
                label="Overall Experience"
              />
            </div>

            {/* Detailed Ratings */}
            <div className="border-t border-amante-grey-light pt-6">
              <h3 className="font-heading text-xl text-amante-red mb-6">
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
            <div className="border-t border-amante-grey-light pt-6">
              <h3 className="font-heading text-xl text-amante-red mb-6">
                Tell Us More
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
                  <p className="text-sm text-amante-grey mt-1">
                    {formData.whatYouLoved.length}/500 characters
                  </p>
                </div>

                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
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
                  <p className="text-sm text-amante-grey mt-1">
                    {formData.improvements.length}/500 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Would Recommend */}
            <div>
              <label className="block font-body font-semibold text-amante-charcoal mb-2">
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

            {/* Contact Information (Optional) */}
            <div className="border-t border-amante-grey-light pt-6">
              <h3 className="font-heading text-xl text-amante-red mb-4">
                Contact Information (Optional)
              </h3>
              <p className="font-body text-sm text-amante-grey mb-4">
                Leave your details if you'd like us to respond to your feedback
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
                    <User className="inline w-5 h-5 mr-2" />
                    Your Name (Optional)
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Anonymous feedback is also welcome"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block font-body font-semibold text-amante-charcoal mb-2">
                    <Mail className="inline w-5 h-5 mr-2" />
                    Email Address (Optional)
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="If you'd like a response"
                    maxLength={100}
                  />
                </div>
              </div>
            </div>

            {/* Public Sharing Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="canSharePublicly"
                id="canSharePublicly"
                checked={formData.canSharePublicly}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-amante-red border-amante-grey-light rounded focus:ring-amante-red"
              />
              <label htmlFor="canSharePublicly" className="font-body text-sm text-amante-charcoal">
                I give permission for Amante to share my feedback publicly (with attribution if name provided, anonymously if not)
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
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>

            <p className="text-sm text-center text-amante-grey mt-4">
              Our team reviews all feedback personally. If you provided contact information and raised specific concerns, we'll respond within 48 hours.
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
            Why Your Feedback Matters
          </h3>
          <p className="font-body text-amante-charcoal mb-4">
            Every piece of feedback helps us improve. We use your insights to train our team, refine our menus, enhance our service, and create better experiences for all our guests. Thank you for taking the time to help us grow.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
