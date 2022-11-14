import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 769 && window.innerWidth < 900,
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight,
  );

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      setWidth(windowWidth);
      setHeight(windowHeight);
      setIsMobile(windowWidth < 701);
      setIsTablet(windowWidth >= 700 && windowWidth < 900);
      setIsDesktop(windowWidth >= 900);
      setIsLandscape(windowWidth > windowHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height, isMobile, isTablet, isDesktop, isLandscape };
}
