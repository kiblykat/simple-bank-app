import { useEffect, useRef } from "react";
import { SlideInTextProps } from "../types/globalContextTypes";

//SlideInText component takes {children, delay} arguments
export const SlideInText = ({ children, delay = 0 }: SlideInTextProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.remove("-translate-y-full", "opacity-0");
              entry.target.classList.add("translate-y-0", "opacity-100");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
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
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className="transform -translate-y-full opacity-0 transition-all duration-1000 ease-out"
    >
      {children}
    </div>
  );
};
