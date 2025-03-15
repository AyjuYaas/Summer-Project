import { useRef, useEffect, useCallback } from "react";

export const useInfiniteScroll = (
  targetRef: React.RefObject<HTMLElement | null>,
  onIntersect: () => void,
  options?: IntersectionObserverInit
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      console.log("Intersection Status:", entry.isIntersecting);
      if (entry.isIntersecting) onIntersect();
    },
    [onIntersect]
  );

  useEffect(() => {
    if (targetRef.current) {
      observer.current = new IntersectionObserver(handleIntersection, options);
      observer.current.observe(targetRef.current);
    }

    return () => observer.current?.disconnect();
  }, [targetRef, handleIntersection, options]);
};
