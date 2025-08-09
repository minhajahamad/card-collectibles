import React, { useEffect, useRef } from 'react';
import LandinHero from '../../Components/Landin-Hero/landinHero';
import LandinJoin from '../../Components/Landin-Join/landinJoin';
import Footer from '../../Components/Footer/footer';
import FloatingSocial from '../../Components/Floating-Social/floatingSocial';

const Landin = () => {
  const joinRef = useRef(null);

  // useEffect(() => {
  //   const ua = navigator.userAgent || navigator.vendor;
  //   const isInAppBrowser = /FBAN|FBAV|Instagram|WhatsApp/i.test(ua);
  
  //   if (isInAppBrowser) {
  //     alert("Please open this link in your browser for the best experience.");
  //   }
  // }, []);

  useEffect(() => {
    const refCode = new URLSearchParams(window.location.search).get('refferal-code');
    if (refCode) {
      localStorage.setItem('referralCode', refCode);
      window.location.href = '/'; // redirect to base
    }
  }, []);
  

  return (
    <div>
      <LandinHero
        onLearnMoreClick={() =>
          joinRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      />
      <div ref={joinRef}>
        <LandinJoin />
      </div>
      <Footer />
      <FloatingSocial />
    </div>
  );
};

export default Landin;
