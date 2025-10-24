import React, { useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  delay?: string;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, delay = 'duration-500' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(ref, {});

  return (
    <div
      ref={ref}
      className={`transition-all ${delay} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;
