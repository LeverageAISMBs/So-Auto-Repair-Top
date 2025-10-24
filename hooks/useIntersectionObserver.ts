import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0.1,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = true,
  }: Args,
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const node = elementRef?.current; 

    if (!node) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        if (isCurrentlyIntersecting) {
            setIntersecting(true);
            if (freezeOnceVisible && observerRef.current) {
                observerRef.current.unobserve(node);
            }
        } else {
             if(!freezeOnceVisible) {
                setIntersecting(false);
             }
        }
      },
      { threshold, root, rootMargin }
    );
    
    observerRef.current.observe(node);

    return () => {
        if(observerRef.current) {
            observerRef.current.disconnect();
        }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible]);

  return isIntersecting;
}

export default useIntersectionObserver;
