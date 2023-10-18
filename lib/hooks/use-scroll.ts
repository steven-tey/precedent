import { useCallback, useEffect, useState } from "react";

export default function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.pageYOffset > threshold);
  }, [threshold]);

  useEffect(() => {
    window && onScroll(); // Call on first render. This correctly updates the `scrolled` state to `True` if the user's scroll position is greater than the `threshold` during the initial load.

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrolled;
}
