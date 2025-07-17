import React from 'react';

const LandinJoin = () => {
  const items = [
    {
      logo: '/Images/Graph.svg',
      header: 'Boost Your Sales',
      desc: 'Reach a targeted audience of serious collectors and increase your revenue with our optimized marketplace.',
    },
    {
      logo: '/Images/community.svg',
      header: 'Active Community',
      desc: 'Connect with a passionate community of collectors, traders, and enthusiasts who value quality items.',
    },
    {
      logo: '/Images/security.svg',
      header: 'Secure Transactions',
      desc: 'Trade with confidence using our secure payment system and comprehensive seller protection.',
    },
    {
      logo: '/Images/lightning.svg',
      header: 'Easy Setup',
      desc: 'Get your store online in minutes with our intuitive tools and step-by-step guidance.',
    },
    {
      logo: '/Images/love.svg',
      header: 'Dedicated Support ',
      desc: 'Our team of collectibles experts is here to help you succeed every step of the way.',
    },
    {
      logo: '/Images/globe.svg',
      header: 'Global Reach',
      desc: 'Expand your customer base worldwide and tap into international collector markets.',
    },
  ];

  return (
    <div className="xl:h-[150vh] flex flex-col ">
      <div className="xl:h-[70%] bg-gradient-to-br from-[#FFFEFA] to-[#DFF7F5] relative ">
        <img src="/Images/Hero-Join-img.png" className="h-[500px] w-full  " />
        <div
          style={{
            boxShadow: `
                    0px 4px 15.7px 0px rgba(0, 163, 151, 0.14),
                    0px 4px 106px 0px rgba(16, 125, 145, 0.14)`,
          }}
          className="xl:w-[1280px] xl:h-[850px] bg-white rounded-[24px]   absolute top-[-40px] left-[80px] flex flex-col font-raleway  "
        >
          <div className="flex flex-col items-center justify-center xl:py-10">
            <p className="text-[52px] font-extrabold tet-[#010816] ">
              Why Choose <span className="text-[#00A397]">Collected</span>
            </p>
            <p className="text-[52px] text-[#00A397] font-extrabold ">
              Company?
            </p>
            <p className="text-[18px] font-medium text-[#46505E]  ">
              We've built the ultimate platform for collectibles sellers,
              combining cutting-edge{' '}
            </p>
            <p className="text-[18px] font-medium text-[#46505E]  ">
              technology with deep industry expertise to help you thrive.
            </p>
          </div>
          <div className="grid grid-cols-3 px-15 gap-8 font-raleway">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-1 justify-center items-center shadow-md bg-white rounded-[12px] py-10 px-8 cursor-pointer "
                >
                  <div className="bg-[#009D90] py-3 px-4 rounded-[12px]">
                    <img src={item.logo} className="w-5 h-5" />
                  </div>
                  <p className="text-[18px]  font-bold text-[#107D91] ">
                    {item.header}
                  </p>
                  <p className="text-[16px] font-medium text-[#46505E] text-center leading-tight ">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-[30%]  bg-gradient-to-bl from-[#DFF7F5] to-[#FFFEFA] relative font-raleway flex justify-center overflow-hidden ">
        <img
          src="/Images/Hero-Join-img2.png"
          className="absolute top-10 z-1 h-full w-full"
        />
        <img
          src="/Images/left-fade-img.png"
          className="absolute top-[-12px] left-[-166px] h-full w-full z-0  "
        />
        <img
          src="/Images/fade-right-img.png"
          className="absolute bottom-[-55px] right-[-52px] z-10 h-[600px] w-full"
        />
        <div className="z-50 flex flex-col gap-5 items-center justify-center">
          <p className="text-[70px] font-extrabold text-[#00A397]">
            <span className="text-[#010816] ">Join</span> Collected Company
          </p>
          <div className="flex flex-col justify-center items-center text-[22px]">
            <p className=" font-semibold text-[#46505E] ">
              Get early access to our platform and start building{' '}
            </p>
            <p className=" font-semibold text-[#46505E] ">
              your collectibles business today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandinJoin;
