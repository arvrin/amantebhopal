'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Heart, Send, Check, Phone, Calendar, Gift, Crown } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  notifications: boolean;
  whatsapp: boolean;
}

export default function LeadCaptureForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-amante-pink-subtle rounded-3xl p-10 shadow-xl border-2 border-amante-pink-light/20 max-w-lg mx-auto text-center backdrop-blur-sm"
      >
        <div className="w-20 h-20 bg-amante-red/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-amante-red" />
        </div>
        <h3 className="text-3xl font-laginchy text-amante-red mb-6">
          Welcome to Amante
        </h3>
        <p className="font-avenir text-gray-600 mb-8 leading-relaxed text-lg">
          You&apos;re now part of our exclusive circle. We&apos;ll keep you updated on our grand opening and special previews.
        </p>
        <div className="flex items-center justify-center gap-3 text-amante-red">
          <Heart className="w-6 h-6 fill-current" />
          <span className="font-avenir text-base">Thank you for joining our journey</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-amante-pink-subtle rounded-3xl p-10 shadow-xl border-2 border-amante-pink-light/20 max-w-2xl mx-auto backdrop-blur-sm"
    >
      <div className="text-center mb-10">
        <h3 className="text-4xl font-laginchy text-amante-red mb-4">
          Join the Celebration List
        </h3>
        <p className="font-avenir text-gray-600 text-xl leading-relaxed">
          Be among the first to experience Amante and receive VIP opening week access.
        </p>
        
        <div className="flex items-center justify-center gap-3 mt-6 bg-amante-red/10 inline-flex px-6 py-3 rounded-full border border-amante-red/20">
          <Heart className="w-5 h-5 text-amante-red fill-current" />
          <span className="font-avenir text-sm font-semibold text-amante-red">
            Join 800+ Early Birds Already Waiting
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email */}
          <div>
            <label className="block font-avenir text-amante-black mb-3 font-semibold text-base">
              Email Address *
            </label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-amante-red focus:border-amante-red font-avenir text-lg transition-all duration-300 hover:border-amante-pink-light shadow-sm focus:shadow-md"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-amante-red text-sm mt-2 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-avenir text-amante-black mb-3 font-semibold text-base">
              Phone Number *
            </label>
            <input
              {...register('phone', { required: 'Phone number is required' })}
              type="tel"
              className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-amante-red focus:border-amante-red font-avenir text-lg transition-all duration-300 hover:border-amante-pink-light shadow-sm focus:shadow-md"
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phone && (
              <p className="text-amante-red text-sm mt-2 font-medium">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="flex items-center">
            <input
              {...register('notifications')}
              type="checkbox"
              id="notifications"
              defaultChecked
              className="w-5 h-5 text-amante-red bg-gray-100 border-gray-300 rounded focus:ring-amante-red focus:ring-2"
            />
            <label htmlFor="notifications" className="ml-3 font-avenir text-amante-black text-sm">
              Opening events & exclusive previews
            </label>
          </div>

          <div className="flex items-center">
            <input
              {...register('whatsapp')}
              type="checkbox"
              id="whatsapp"
              className="w-5 h-5 text-amante-red bg-gray-100 border-gray-300 rounded focus:ring-amante-red focus:ring-2"
            />
            <label htmlFor="whatsapp" className="ml-3 font-avenir text-amante-black flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              WhatsApp updates
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amante-red text-white py-6 rounded-2xl font-avenir font-bold text-xl hover:bg-amante-red-dark hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Reserving Your Spot...</span>
            </div>
          ) : (
            <>
              <Heart className="w-7 h-7 fill-current" />
              <span>Join the Celebration List</span>
              <Send className="w-6 h-6" />
            </>
          )}
        </button>

        <div className="text-center space-y-3 pt-4">
          <p className="text-base font-avenir text-gray-600">
            By joining, you&apos;ll receive exclusive updates about Amante&apos;s grand opening.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>Privacy Protected</span>
            <span>•</span>
            <span>No Spam Promise</span>
            <span>•</span>
            <span>VIP Treatment</span>
          </div>
        </div>
      </form>

      <div className="mt-12 space-y-6">
        <div className="text-center">
          <h4 className="font-laginchy text-amante-red text-2xl mb-8">
            Early Bird Exclusive Benefits
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-amante-pink-light/30 p-6 rounded-2xl border border-amante-pink-light/40 hover:bg-amante-pink-light/40 transition-colors duration-300">
            <div className="w-14 h-14 bg-amante-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 text-amante-red" />
            </div>
            <p className="font-avenir text-base font-semibold text-amante-red mb-2">Priority Booking</p>
            <p className="font-avenir text-sm text-gray-600">Book your favorite space first</p>
          </div>
          
          <div className="bg-amante-pink-light/30 p-6 rounded-2xl border border-amante-pink-light/40 hover:bg-amante-pink-light/40 transition-colors duration-300">
            <div className="w-14 h-14 bg-amante-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-7 h-7 text-amante-red" />
            </div>
            <p className="font-avenir text-base font-semibold text-amante-red mb-2">Opening Week Offers</p>
            <p className="font-avenir text-sm text-gray-600">Exclusive discounts & gifts</p>
          </div>
          
          <div className="bg-amante-pink-light/30 p-6 rounded-2xl border border-amante-pink-light/40 hover:bg-amante-pink-light/40 transition-colors duration-300">
            <div className="w-14 h-14 bg-amante-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-7 h-7 text-amante-red" />
            </div>
            <p className="font-avenir text-base font-semibold text-amante-red mb-2">VIP Preview Access</p>
            <p className="font-avenir text-sm text-gray-600">Private pre-opening events</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}