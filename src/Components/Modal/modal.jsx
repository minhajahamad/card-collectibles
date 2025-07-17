import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="flex p-5 w-[90%] h-[700px] bg-white rounded-[22px] mx-auto relative z-50 shadow-[0_0_17px_0_#00000014]">
        <div className="w-[70%]">
          <img src="/Images/Modal-img.png" className="w-full h-full" />
        </div>
        <div className="w-[30%] flex flex-col gap-9 pl-10 pt-15 font-poppins">
          <div>
            <p className="font-semibold text-[30px]">
              Start <span className="text-[#00A397]">Collecting</span>
              <br />
              With Us!
            </p>
            <p className="font-medium text-[26px]">Join us today</p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="border rounded-[28px] border-[#333333] flex gap-5 items-center justify-center p-3 cursor-pointer">
              <img src="/Images/Google.png" alt="Google logo" />
              <p>Sign up with Google</p>
            </div>

            <div className="flex gap-5 items-center justify-center">
              <hr className="text-[#66666640] w-[35%]" />
              <p className="text-[22px] text-[#666666]">OR</p>
              <hr className="text-[#66666640] w-[35%]" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="rounded-[28px] flex gap-5 items-center justify-center px-3 py-2 bg-black cursor-pointer">
                <p className="text-white">Sign up with phone or email</p>
              </div>
              <p className="text-[12px]">
                By signing up, you agree to the <u>Terms of Service</u> and{' '}
                <u>Privacy Policy</u>, including <u>cookie use</u>.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-9">
              <p className="font-medium text-[16px]">
                Already have an account?
              </p>
              <div className="border rounded-[28px] border-[#333333] flex items-center justify-center p-4 cursor-pointer">
                <p>Login</p>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-[28px] text-[#666666] hover:text-black transition-all duration-200 ease-in-out cursor-pointer"
          onClick={onClose}
        >
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
};

export default Modal;
