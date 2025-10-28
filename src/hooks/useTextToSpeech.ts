import { useState, useEffect, useCallback } from 'react';

interface UseTTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function useTextToSpeech(options: UseTTSOptions = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const selectIndianFemaleVoice = useCallback(() => {
    // Priority order for best quality Indian/British female voices
    const preferredNames = [
      'Google UK English Female',
      'Google UK English',
      'Google US English',
      'Samantha', // Mac - High quality
      'Victoria', // Mac British
      'Karen', // Mac Australian
      'Veena', // Mac Indian
      'Raveena', // Amazon Indian
      'Google हिन्दी',
    ];

    const preferredLangs = [
      'en-GB', // British English (closest to Indian English)
      'en-IN', // Indian English
      'en-US', // American English
      'en-AU', // Australian English
      'hi-IN', // Hindi
    ];

    // First try to find by name
    for (const preferred of preferredNames) {
      const voice = voices.find(v => v.name.includes(preferred));
      if (voice) return voice;
    }

    // Then try by language
    for (const lang of preferredLangs) {
      const voice = voices.find(v => v.lang.startsWith(lang));
      if (voice) return voice;
    }

    // Fallback to any female voice
    const femaleVoice = voices.find(v =>
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('woman') ||
      v.name.toLowerCase().includes('samantha') ||
      v.name.toLowerCase().includes('victoria')
    );

    return femaleVoice || voices[0];
  }, [voices]);

  const speak = useCallback((text: string) => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Select Indian female voice
    const selectedVoice = selectIndianFemaleVoice();
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Set parameters for elegant, professional delivery
    utterance.rate = options.rate || 0.9; // Slightly slower for clarity
    utterance.pitch = options.pitch || 1.0; // Natural pitch
    utterance.volume = options.volume || 1.0; // Full volume

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported, selectIndianFemaleVoice, options]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
  };
}
