import React from 'react';
import SideBar from '../../Components/Sidebar/sideBar';
import NavBar from '../../Components/NavBar/navBar';

import './affiliates.css';

import { Table } from 'antd';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaEnvelope } from 'react-icons/fa';
import { IoIosCopy } from 'react-icons/io';
import { QRCodeCanvas } from 'qrcode.react';
import { GrShareOption } from 'react-icons/gr';

const Affiliates = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Minhaj',
      email: 'minhajahamadmk@gmail.com',
      doj: '18/08/2003',
      phonenumber: '+91 9072507579',
      credits: '+2500$',
    },
    {
      key: '2',
      name: 'Minhaj',
      email: 'minhajahamadmk@gmail.com',
      doj: '18/08/2003',
      phonenumber: '+91 9072507579',
      credits: '+2500$',
    },
    {
      key: '3',
      name: 'Minhaj',
      email: 'minhajahamadmk@gmail.com',
      doj: '18/08/2003',
      phonenumber: '+91 9072507579',
      credits: '+2500$',
    },
    {
      key: '4',
      name: 'Minhaj',
      email: 'minhajahamadmk@gmail.com',
      doj: '18/08/2003',
      phonenumber: '+91 9072507579',
      credits: '+2500$',
    },
    {
      key: '5',
      name: 'Minhaj',
      email: 'minhajahamadmk@gmail.com',
      doj: '18/08/2003',
      phonenumber: '+91 9072507579',
      credits: '+2500$',
    },
    {
      key: '6',
      name: 'Minhaj',
      email: 'minhajahamadmk@gmail.com',
      doj: '18/08/2003',
      phonenumber: '+91 9072507579',
      credits: '+2500$',
    },
    {
      key: '7',
      name: 'Minhaj',
      email: 'minhajahamadmk@gmail.com',
      doj: '18/08/2003',
      phonenumber: '+91 9072507579',
      credits: '+2500$',
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '25%',
    },
    {
      title: 'DOJ',
      dataIndex: 'doj',
      width: '15%',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      width: '12.5%',
    },
    {
      title: 'Credits',
      dataIndex: 'credits',
      width: '12.5%',
      render: text => (
        <span className="text-[#16B338] hover:text-[#108628] transition-colors duration-150 text-[16px] cursor-pointer">
          {text}
        </span>
      ),
    },
  ];
  return (
    <div className="overflow-hidden">
      <NavBar />
      <div className="flex py-5 px-5 md:px-15 md:py-15 xl:py-0 xl:px-0">
        <SideBar />
        <div className="w-full xl:w-[75%] xl:max-h-[600px] flex flex-col gap-3 font-sans border border-[#DEDEDE] rounded-[14px] shadow-[0_0_17px_0_#00000014] px-5 py-5 xl:mt-15 xl:px-10 xl:pt-8   scrollbar-none">
          <div className="flex flex-col gap-5 xl:gap-15 relative ">
            <div className="flex flex-col   ">
              <div>
                <p className="text-[25px] xl:text-[32px] text-[#464646] font-bold ">Name</p>
                <div className="flex flex-col gap-1 xl:flex-row xl:items-center">
                  <p className="font-bold text-[16px] text-[#464646] flex  gap-1">
                    Affiliate id:
                    <span className="font-normal ">
                      <u> 12345678_abi</u>
                    </span>
                  </p>

                  <div className="flex gap-2">
                    <IoLogoWhatsapp className=" text-[#00AA39] text-[20px] cursor-pointer hover:text-[#108628] transition-colors duration-150 " />
                    <FaEnvelope className=" text-[#107D91] text-[20px] cursor-pointer hover:text-[#52B7C6] transition-colors duration-150 " />
                    <IoIosCopy className=" text-[#107D91] text-[20px] cursor-pointer hover:text-[#52B7C6] transition-colors duration-150  " />
                  </div>
                </div>
              </div>

              <div className="xl:hidden flex gap-2 justify-between items-center">
                <div className=" w-[170px] h-[80px] border rounded-[14px] border-[#BDBDBD] flex flex-col items-center justify-center  ">
                  <p className="font-semibold text-[18px] ">Balance</p>
                  <p className="font-normal text-[22px] font-credits text-[#04BA2C] cursor-pointer hover:text-[#108628] transition-colors duration-150 ">
                    6,500pts
                  </p>
                </div>
                <div>
                  <div className="    w-[130px] h-[125px] border border-[#BDBDBD] rounded-[14px]  flex justify-center items-center relative ">
                    <QRCodeCanvas
                      size={110}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      level="H"
                    />
                    <div className="  w-[30px] h-[30px] rounded-full border border-[#BDBDBD] absolute bottom-[-10px] right-[-10px] flex justify-center items-center  bg-white  cursor-pointer">
                      <GrShareOption className="text-[19px] text-[#107D91]  " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold text-[16px] ">Total references:{}</p>
            </div>
            <div className="hidden xl:block w-[170px] h-[80px] border rounded-[14px] border-[#BDBDBD] absolute top-[13%] right-[17%] pl-5 pt-2 ">
              <p className="font-semibold text-[18px] ">Balance</p>
              <p className="font-normal text-[22px] font-credits text-[#04BA2C] cursor-pointer hover:text-[#108628] transition-colors duration-150 ">
                6,500pts
              </p>
            </div>
            <div className="  hidden  w-[130px] h-[125px] border border-[#BDBDBD] rounded-[14px] absolute  right-[1%] xl:flex justify-center items-center ">
              <QRCodeCanvas
                size={110}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="H"
              />
            </div>
            <div className="hidden  w-[30px] h-[30px] rounded-full border border-[#BDBDBD] xl:flex justify-center items-center absolute right-0 top-[70%] bg-white  cursor-pointer">
              <GrShareOption className="text-[19px] text-[#107D91]  " />
            </div>
          </div>

          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ y: 300, x: '100%' }}
            className="custom-table w-[1000px]  rounded-md hidden xl:block "
          />
          <div className=" border-t py-5 px-2 h-[50vh] flex flex-col gap-5  xl:hidden overflow-y-scroll [&::-webkit-scrollbar]:hidden  [scrollbar-width:none]  ">
            <div className="w-full flex-col py-5 px-5 border rounded-[14px] ">
              <div className="flex items-center justify-between">
                <p>Minhaj</p>
                <p>5$</p>
              </div>
              <p>email@gmail.com</p>
              <div className="flex items-center justify-between">
                <p>DOJ : ekdnekjd</p>
                <p>+91 989009898098</p>
              </div>
            </div>
            <div className="w-full flex-col py-5 px-5 border rounded-[14px] ">
              <div className="flex items-center justify-between">
                <p>Minhaj</p>
                <p>5$</p>
              </div>
              <p>email@gmail.com</p>
              <div className="flex items-center justify-between">
                <p>DOJ : ekdnekjd</p>
                <p>+91 989009898098</p>
              </div>
            </div>
            <div className="w-full flex-col py-5 px-5 border rounded-[14px] ">
              <div className="flex items-center justify-between">
                <p>Minhaj</p>
                <p>5$</p>
              </div>
              <p>email@gmail.com</p>
              <div className="flex items-center justify-between">
                <p>DOJ : ekdnekjd</p>
                <p>+91 989009898098</p>
              </div>
            </div>
            <div className="w-full flex-col py-5 px-5 border rounded-[14px] ">
              <div className="flex items-center justify-between">
                <p>Minhaj</p>
                <p>5$</p>
              </div>
              <p>email@gmail.com</p>
              <div className="flex items-center justify-between">
                <p>DOJ : ekdnekjd</p>
                <p>+91 989009898098</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliates;
