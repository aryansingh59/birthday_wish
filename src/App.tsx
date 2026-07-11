/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { BackgroundEffects } from './components/BackgroundEffects';
import { HeroSection } from './components/HeroSection';
import { MusicPlayer } from './components/MusicPlayer';
import { MemoryTimeline } from './components/MemoryTimeline';
import { ReasonsSection } from './components/ReasonsSection';
import { LetterSection } from './components/LetterSection';
import { ComplimentGenerator } from './components/ComplimentGenerator';
import { CountdownSection } from './components/CountdownSection';
import { PhotoGallery } from './components/PhotoGallery';
import { FloatingHearts } from './components/FloatingHearts';
import { FloatingQuotes } from './components/FloatingQuotes';
import { SecretMessage } from './components/SecretMessage';
import { Footer } from './components/Footer';
import { VirtualGift } from './components/VirtualGift';
import { LoveQuiz } from './components/LoveQuiz';
import { StarMap } from './components/StarMap';
import { VoiceMessage } from './components/VoiceMessage';
import { ScratchCard } from './components/ScratchCard';
import { OpenWhen } from './components/OpenWhen';
import { WishJar } from './components/WishJar';
import { JourneyMap } from './components/JourneyMap';
import { DateTicket } from './components/DateTicket';
import { MemoryBook } from './components/MemoryBook';
import { WaxEnvelope } from './components/WaxEnvelope';
import { ThemeToggle } from './components/ThemeToggle';
import { AIAssistant } from './components/AIAssistant';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  const scrollToTimeline = () => {
    const el = document.getElementById('timeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <CustomCursor />
      <BackgroundEffects />
      <FloatingHearts />
      <FloatingQuotes />
      <MusicPlayer />
      <ThemeToggle />
      <AIAssistant />

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen 
            key="loading" 
            onComplete={() => setLoading(false)} 
          />
        )}
      </AnimatePresence>

      {!loading && (
        <main className="relative z-10 w-full min-h-screen pb-24">
          <div id="hero"><HeroSection onOpenSurprise={scrollToTimeline} /></div>
          <div id="letter"><LetterSection /></div>
          <div id="voice-message"><VoiceMessage /></div>
          <div id="star-map"><StarMap /></div>
          <div id="photo-gallery"><PhotoGallery /></div>
          <div id="memory-book"><MemoryBook /></div>
          <div id="timeline"><MemoryTimeline /></div>
          <div id="journey-map"><JourneyMap /></div>
          <div id="love-quiz"><LoveQuiz /></div>
          <div id="reasons"><ReasonsSection /></div>
          <div id="open-when"><OpenWhen /></div>
          <div id="virtual-gift"><VirtualGift /></div>
          <div id="date-ticket"><DateTicket /></div>
          <div id="wish-jar"><WishJar /></div>
          <div id="scratch-card"><ScratchCard /></div>
          <div id="wax-envelope"><WaxEnvelope /></div>
          <div id="compliment-generator"><ComplimentGenerator /></div>
          <div id="countdown"><CountdownSection /></div>
          <div id="secret-message"><SecretMessage /></div>
          <Footer />
        </main>
      )}
    </>
  );
}
