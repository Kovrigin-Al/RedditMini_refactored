import { MutableRefObject, useState, useEffect } from "react";

export const useOnScreen = (ref: MutableRefObject<HTMLDivElement | null>, ratio: number[] = [0.5]) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting && entry.intersectionRatio > Math.max(...ratio))
      ,
      {
        rootMargin: '-50px 0px 200px 0px',
        threshold: ratio
      });
    if (ref.current) {
      observer.observe(ref.current);
    }
  });
  return isIntersecting;
};
export default useOnScreen;