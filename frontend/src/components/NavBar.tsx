import { MdKeyboardArrowRight } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import { IUser } from '@/models/User';
import Userbatch from './Userbatch';
import { FaUserFriends } from "react-icons/fa";
import React, { useState } from 'react';
import OfficialDiscordMessage from './DiscordMessage';

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
    friends: boolean,
    channels: boolean
  };
  friends: IUser[] | undefined;
  getRecieverFromNav: any;
  setFriendsSecton: any;
  showNavbar: boolean;
  channels: any[];
  setShownavbar:  React.Dispatch<React.SetStateAction<boolean>>;
  setOfficialDiscord: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<NavbarProps> = ({ setOfficialDiscord, channels, sharedData, friends, getRecieverFromNav, setFriendsSecton, showNavbar,setShownavbar }) => {

 
  const sendReciever = (reciever: IUser) => {
    getRecieverFromNav(reciever);
    setShownavbar(false);

  }


  return (
    <div className= {`sm:block ${showNavbar ? "block" : "hidden"}  w-80  px-3 py-3 h-screen sticky pt-10 flex flex-col bg-customcolor items-start overflow-y-auto`}>
      {/* Friends Section */}
      {sharedData.friends && (
        <div onClick={() => setFriendsSecton(true)} className='flex space-x-4 m-2 cursor-pointer hover:bg-custombg'>
          <FaUserFriends className='ml-2 mt-1 text-white' />
          <h1 className='text-gray-200 font-discord font-semibold tracking-wider'>friends</h1>
        </div>
      )}

      {/* List of Friends */}
      {sharedData.friends && <div className='mt-4'><button onClick={()=>setOfficialDiscord(true)}><OfficialDiscordMessage /></button></div>}
      {sharedData.friends && friends?.map((friend) => {
        return (<div>
          <button onClick={() => sendReciever(friend)} key={friend._id}>
            <Userbatch name={friend.name} image={friend.image} />
          </button>
          </div>
        )
      })}

      {
        sharedData.channels && (
          channels?.map((channel)=> {
            return (
              <div className='flex space-x-4 m-2  cursor-pointer hover:bg-custombg'>
                <h1 className='text-gray-200 font-discord font-semibold tracking-wider'>{channel.name}</h1>
              </div>
            )
          })
        )
      }

      {/* Other Navbar List Items */}
      {/* <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Topics" />
      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Questions" />
      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Random" /> */}
      {/* {sharedData.directMessage &&<DirectMessages />} */}
    </div>
  );
};

export default Navbar;
