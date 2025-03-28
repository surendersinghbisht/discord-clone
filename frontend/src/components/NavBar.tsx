import { MdKeyboardArrowRight } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import DirectMessages from './directMessages';
import React from 'react';
const NavbarListItem = ({ icon, text }) => (
  <div className='w-full flex justify-between items-center my-1 group'>
    <div className='flex justify-between items-center'>
      <div className='transition-all duration-200 ease-in-out group-hover:rotate-90'>
        {icon}
      </div>

      <p className='font-medium text-gray-400'>{text}</p>
    </div>
    <BsPlus className='text-green-500 group-hover:rotate-90 transition-all duration-200 ease-in-out' size="20" />
  </div>
);


interface NavbarProps {
  sharedData: {
    directMessage: boolean,
    groups: boolean
  }
}
const Navbar:React.FC<NavbarProps> = ({sharedData}) => {
  return (
    <div className='fixed w-36 top-0 left-16 px-3 py-3 h-screen flex flex-col bg-gray-700 items-start'>
      <h3 className='text-gray-200 font-semibold tracking-wider mb-2'>Channels</h3>

      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Topics" />
      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Questions" />
      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Random" />
{sharedData.directMessage &&<DirectMessages />}
    </div>
  );
};

export default Navbar;
