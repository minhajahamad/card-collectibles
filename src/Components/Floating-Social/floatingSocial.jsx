import React, { useEffect, useState } from 'react';

const FloatingSocial = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY + 2) {
        setIsHidden(true); // scrolling down
      } else if (currentY < lastY - 2) {
        setIsHidden(false); // scrolling up
      }
      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-1/2 right-4 md:right-6 z-50 -translate-y-1/2 transform flex flex-col gap-3 transition-transform duration-300 ${
        isHidden ? 'translate-x-24 pointer-events-none' : 'translate-x-0'
      }`}
    >
      <a
        href="https://www.instagram.com/collected.company"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="bg-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform motion-safe:animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-[#E1306C]"
        >
          <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c-1.66 0-3 1.34-3 3zm11 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      </a>

      <a
        href="https://www.facebook.com/share/1Ahv4nGTZ7/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="bg-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform motion-safe:animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-[#1877F2]"
        >
          <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.07 5.66 21.2 10.44 22v-6.99H7.9v-2.95h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.95h-2.34V22C18.34 21.2 22 17.07 22 12.06z" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingSocial; 