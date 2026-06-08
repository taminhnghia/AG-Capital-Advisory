/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top-floating-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.9 }}
          whileHover={{ scale: 1.08, bg: '#C9A227', color: '#000000', boxShadow: '0 0 15px rgba(201, 162, 39, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-3 rounded-full bg-[#02050A]/90 text-[#C9A227] border border-[#C9A227]/35 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-black cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-center transition-colors focus:outline-none"
          title="Scroll to Top / Lên đầu trang"
          aria-label="Scroll to Top"
        >
          <ChevronUp size={20} className="stroke-[2.5px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
