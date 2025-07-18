import React, { useRef } from 'react';
import LandinHero from '../../Components/Landin-Hero/landinHero';
import LandinJoin from '../../Components/Landin-Join/landinJoin';
import Footer from '../../Components/Footer/footer';

const Landin = () => {
  const joinRef = useRef(null);

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
    </div>
  );
};

export default Landin;
