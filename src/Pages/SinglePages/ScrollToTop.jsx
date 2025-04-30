// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // As soon as the path changes, jump back to the top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
