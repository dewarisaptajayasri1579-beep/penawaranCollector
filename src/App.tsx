import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import FooterNav from './components/FooterNav';
import SlideIntro from './components/SlideIntro';
import SlideProblems from './components/SlideProblems';
import SlideSolution from './components/SlideSolution';
import SlideFeatures from './components/SlideFeatures';
import SlidePricing from './components/SlidePricing';
import WhatsAppButton from './components/WhatsAppButton';
import ProposalPdfTemplate from './components/ProposalPdfTemplate';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const defaultFormData = {
    name: 'Bapak/Ibu',
    company: 'Perusahaan Anda',
    whatsapp: '-',
    email: '-',
    businessType: '-',
    collectorCount: '-',
    notes: '',
  };

  // Swipe gesture tracking state
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const totalSlides = 5;

  const handleDownloadPDF = () => {
    window.print();
  };

  // Move to next slide helper
  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setSlideDirection('right');
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleDownloadPDF();
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
  }, [currentSlide]);

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
        return <SlideIntro onOpenProposal={handleDownloadPDF} />;
      case 1:
        return <SlideProblems />;
      case 2:
        return <SlideSolution />;
      case 3:
        return <SlideFeatures />;
      case 4:
        return <SlidePricing onOpenProposal={handleDownloadPDF} />;
      default:
        return <SlideIntro onOpenProposal={handleDownloadPDF} />;
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
      className="flex flex-col h-screen print:h-auto overflow-hidden print:overflow-visible bg-slate-50/50 print:bg-white font-sans relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sticky Top Header */}
      <div className="print:hidden sticky top-0 z-40">
        <Header
          currentSlide={currentSlide}
          onSetSlide={handleSetSlide}
          onOpenProposal={handleDownloadPDF}
        />
      </div>

      {/* Main Slides Content Display Window */}
      <main id="app-main" className="print:hidden flex-1 relative overflow-hidden flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full h-full relative overflow-hidden bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 p-4 md:p-6 shadow-sm flex flex-col">
          
          {/* Header section indicator inside the board */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2 pb-2 border-b border-slate-50 shrink-0">
            <span>BLESSCOM COLLECTOR RECAL PRESENTATION DECK</span>
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
      <div className="print:hidden">
        <FooterNav
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onPrev={handlePrev}
          onNext={handleNext}
          onSetSlide={handleSetSlide}
          onOpenProposal={handleDownloadPDF}
        />
      </div>

      {/* Floating Interactive WhatsApp Button (Hidden temporarily) */}
      {/* <div className="print:hidden">
        <WhatsAppButton />
      </div> */}

      {/* Hidden PDF Template for direct generation */}
      <ProposalPdfTemplate formData={defaultFormData} />
    </div>
  );
}
