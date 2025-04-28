import { useState, useEffect } from 'react';

// Custom hook to determine scroll direction
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolling up or down
      if (currentScrollY > prevScrollY) {
        // Scrolling down
        if (scrollDirection !== "down") {
          setScrollDirection("down");
          setVisible(false);
        }
      } else if (currentScrollY < prevScrollY) {
        // Scrolling up
        if (scrollDirection !== "up") {
          setScrollDirection("up");
          setVisible(true);
        }
      }
      
      // Update previous scroll position
      setPrevScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection, prevScrollY]);

  return { scrollDirection, visible };
}

export default useScrollDirection;