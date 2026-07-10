import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import FooterNav from './components/FooterNav';
import SlideIntro from './components/SlideIntro';
import SlideProblems from './components/SlideProblems';
import SlideSolution from './components/SlideSolution';
import SlideFeatures from './components/SlideFeatures';
import SlidePricing from './components/SlidePricing';
import ProposalModal from './components/ProposalModal';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Swipe gesture tracking state
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const totalSlides = 5;

  // Move to next slide helper
  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setSlideDirection('right');
      setCurrentSlide((prev) => prev + 1);
    } else {
      setIsModalOpen(true);
    }
  };

  // Move to previous slide helper
  const handlePrev = () => {
    if (currentSlide > 0) {
      setSlideDirection('left');
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Set specific slide helper
  const handleSetSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setSlideDirection(slideIndex > currentSlide ? 'right' : 'left');
      setCurrentSlide(slideIndex);
    }
  };

  // Listen to keyboard left/right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger slides if the user is typing in a modal form
      if (isModalOpen) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, isModalOpen]);

  // Handle Swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const threshold = 50; // minimum distance in pixels to count as swipe
    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Swipe left -> next slide
        handleNext();
      } else {
        // Swipe right -> prev slide
        handlePrev();
      }
    }
    // Reset coords
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Render the current active slide view
  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return <SlideIntro onOpenProposal={() => setIsModalOpen(true)} />;
      case 1:
        return <SlideProblems />;
      case 2:
        return <SlideSolution />;
      case 3:
        return <SlideFeatures />;
      case 4:
        return <SlidePricing onOpenProposal={() => setIsModalOpen(true)} />;
      default:
        return <SlideIntro onOpenProposal={() => setIsModalOpen(true)} />;
    }
  };

  // Custom motion variants for horizontal slide transition
  const slideVariants = {
    initial: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div
      id="app-container"
      className="flex flex-col h-screen overflow-hidden bg-slate-50/50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sticky Top Header */}
      <Header
        currentSlide={currentSlide}
        onSetSlide={handleSetSlide}
        onOpenProposal={() => setIsModalOpen(true)}
      />

      {/* Main Slides Content Display Window */}
      <main id="app-main" className="flex-1 relative overflow-hidden flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full h-full relative overflow-hidden bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 p-4 md:p-6 shadow-sm flex flex-col">
          
          {/* Header section indicator inside the board */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2 pb-2 border-b border-slate-50 shrink-0">
            <span>COLLECTOR RECALL PRESENTATION DECK</span>
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[#003366]">SLIDE 0{currentSlide + 1} / 05</span>
          </div>

          {/* Animate slide switching smoothly */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={currentSlide}
                custom={slideDirection}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                className="absolute inset-0 w-full h-full"
              >
                {renderSlide()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Interactive Controls Footer Navigation */}
      <FooterNav
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrev={handlePrev}
        onNext={handleNext}
        onSetSlide={handleSetSlide}
        onOpenProposal={() => setIsModalOpen(true)}
      />

      {/* Floating Interactive WhatsApp Button */}
      <WhatsAppButton />

      {/* Proposal Request Form Modal Dialog */}
      <ProposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
