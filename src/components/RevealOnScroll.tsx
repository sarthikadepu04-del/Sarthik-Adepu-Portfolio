import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number; // Milliseconds delay
  staggerIndex?: number; // Multiplied by 120ms
  className?: string;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function RevealOnScroll({
  children,
  delay = 0,
  staggerIndex = 0,
  className = '',
  threshold = 0.12,
  direction = 'up',
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If browser doesn't support IntersectionObserver or reduced motion is preferred
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
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
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold,
      }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold]);

  const effectiveDelay = delay > 0 ? delay : staggerIndex * 120;

  // Direction transform styles
  let hiddenTransform = 'translate-y-8';
  if (direction === 'down') hiddenTransform = '-translate-y-8';
  if (direction === 'left') hiddenTransform = 'translate-x-8';
  if (direction === 'right') hiddenTransform = '-translate-x-8';
  if (direction === 'none') hiddenTransform = 'scale-95';

  return (
    <div
      ref={elementRef}
      style={{
        transitionDelay: `${effectiveDelay}ms`,
      }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100'
          : `opacity-0 ${hiddenTransform}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
