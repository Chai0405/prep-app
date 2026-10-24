import { useEffect, useRef, useState } from "react";

/*
  Reports when an element first scrolls into view (and stays true after),
  for one-time reveal animations. Browsers without IntersectionObserver
  just show the content straight away.
*/
export const useInView = ({ threshold = 0.2 } = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    if (inView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return [ref, inView];
};
