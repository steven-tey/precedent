import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountingNumbers({
  value,
  className,
  start = 0,
  duration = 800,
}: {
  value: number;
  className: string;
  start?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    let startTime: number | undefined;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const timePassed = timestamp - startTime;
      const progress = timePassed / duration;
      const currentCount = easeOutQuad(progress, 0, value, 1);
      if (currentCount >= value) {
        setCount(value);
        return;
      }
      setCount(currentCount);
      requestAnimationFrame(animateCount);
    };
    isInView && requestAnimationFrame(animateCount);
  }, [value, duration, isInView]);

  return (
    <p className={className} ref={ref}>
      {Intl.NumberFormat().format(count)}
    </p>
  );
}
const easeOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d;
  return Math.round(-c * t * (t - 2) + b);
};
