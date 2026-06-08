import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  distance?: number; // Distance in pixels to slide up (default 20 for subtle elegant transition)
  threshold?: number; // Visibility threshold (0 to 1)
}

export default function ScrollReveal({
  children,
  className = '',
  id,
  delay = 0,
  duration = 800,
  distance = 20,
  threshold = 0.05,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the browser doesn't support IntersectionObserver, render normally immediately
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px', // slightly offset trigger to feel natural
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const style: React.CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Custom elegant executive easing (easeOutExpo)
    transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
    opacity: isVisible ? 1 : 0,
    willChange: 'transform, opacity',
  };

  return (
    <div
      ref={elementRef}
      id={id}
      style={style}
      className={`transition-all ${className}`}
    >
      {children}
    </div>
  );
}
