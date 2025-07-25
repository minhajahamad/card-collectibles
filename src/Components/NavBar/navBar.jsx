import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import MobileSidebar from '../Mobile-Sidebar/mobileSidebar';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axios';
import { API_URL } from '../../services/api_url';

const NavBar = ({ onLoginClick }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const uuid = localStorage.getItem('uuid');
  console.log(uuid);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(
        API_URL.USER.GET_USER_UUID(uuid)
      );
      console.log(response);
      setUser(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(sidebarOpen);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <nav className="w-full h-[70px] lg:h-[85px]   flex items-center bg-[#09778E]  justify-between px-4 md:px-15 lg:px-20  ">
        <div onClick={() => navigate('/')} className="  cursor-pointer ">
          <img
            src="/Images/logo.png"
            className="  object-cover w-[115px] h-[50px] lg:w-[158px] lg:h-[70px] "
          />
        </div>

        {!uuid ? (
          <div className="flex gap-3 items-center justifu-center text-white text-[24px] lg:text-[30px] cursor-pointer">
            <div
              onClick={onLoginClick}
              className="bg-white rounded-[6px] text-[#00A397] text-[16px] font-montserrat px-3 py-2 font-semibold cursor-pointer"
            >
              <p>Sign In / Sign Up</p>
            </div>
            {/* Hamburger menu removed as per new requirements */}
          </div>
        ) : (
          <>
            <div
              className="lg:w-[105px] xl:w-[115px] h-full xl:flex items-center justify-between hidden xl:block hover:cursor-pointer xl:flex xl:items-center xl:justify-between xl:w-[115px] xl:h-full xl:border-0 xl:rounded-none xl:bg-transparent xl:text-white"
              onClick={() => navigate('/user/profile')}
            >
              <div className="rounded-full border-2 border-black">
                <img
                  src="/Images/Landin-img-6.png"
                  className="rounded-full object-top object-cover cursor-pointer w-[25px] h-[25px] md:w-[30px] md:h-[30px]"
                />
              </div>
              <div className="flex flex-col text-white ">
                <p>
                  <i> Hello !</i>
                </p>
                <p className="text-[14px] xl:text-[16px] font-username">
                  {user.full_name}
                </p>
              </div>
            </div>
            <RxHamburgerMenu
              onClick={() => setSidebarOpen(true)}
              className="block xl:hidden text-white text-[22px]"
            />
          </>
        )}
      </nav>
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default NavBar;
