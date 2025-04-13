import { MdKeyboardArrowRight } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import { IUser } from '@/models/User';
import Userbatch from './Userbatch';
import { FaUserFriends } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import OfficialDiscordMessage from './DiscordMessage';
import { FaChevronDown } from 'react-icons/fa';
import ServerDropdownMenu from './Serverdropdown';
import CreateChannelModal from './CreateChannel';

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
    friends: boolean;
    channels: boolean;
  };
  friends: IUser[] | undefined;
  getRecieverFromNav: any;
  setFriendsSecton: any;
  showNavbar: boolean;
  channels: any[];
  setShownavbar: React.Dispatch<React.SetStateAction<boolean>>;
  setOfficialDiscord: React.Dispatch<React.SetStateAction<boolean>>;
  channelChatview: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelDetails:any;
  groupName: string;
  groupId: string;
}

const Navbar: React.FC<NavbarProps> = ({
  groupId,
  groupName,
  setOfficialDiscord,
  channels,
  sharedData,
  friends,
  getRecieverFromNav,
  setFriendsSecton,
  showNavbar,
  setShownavbar,
  channelChatview,
  setChannelDetails
}) => {
  const sendReciever = (reciever: IUser) => {
    getRecieverFromNav(reciever);
    setShownavbar(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

 const setChannelData = (channel:any)=> {
  channelChatview(true);
  setChannelDetails(channel);
 }
  useEffect(() => {
   
    setIsDropdownOpen(false);
  }, [sharedData.channels, groupId]); 

  return (
    <div className={`sm:block ${showNavbar ? "block" : "hidden"} w-80 px-3 py-3 h-screen sticky pt-10 flex flex-col bg-customcolor items-start overflow-y-auto flex-shrink-0`}>
      {sharedData.friends && (
        <div onClick={() => setFriendsSecton(true)} className='flex space-x-4 m-2 cursor-pointer hover:bg-custombg'>
          <FaUserFriends className='ml-2 mt-1 text-white' />
          <h1 className='text-gray-200 font-discord font-semibold tracking-wider'>friends</h1>
        </div>
      )}

    
      {sharedData.friends && (
        <div className='mt-4'>
          <button onClick={() => setOfficialDiscord(true)}>
            <OfficialDiscordMessage />
          </button>
        </div>
      )}

      {sharedData.friends &&
        friends?.map((friend) => (
          <div key={friend._id}>
            <button onClick={() => sendReciever(friend)}>
              <Userbatch name={friend.name} image={friend.image} />
            </button>
          </div>
        ))}

      {sharedData.channels && (
        <div onClick={toggleDropdown} className="flex border border-[#3c3f45] rounded-lg text-lg mt-4 w-full text-gray-200 items-center justify-between font-semibold px-2 py-1 cursor-pointer">
          <span>{groupName}</span>
          <FaChevronDown className="text-lg" />
        </div>
      )}

      {sharedData.channels && isDropdownOpen && (
        <div className="absolute mt-14 sm:mt-0 z-10 w-full sm:w-64">
          <ServerDropdownMenu openModal={() => setIsModalOpen(true)} closeMenu={() => setIsDropdownOpen(false)} />
          <CreateChannelModal groupId={groupId} isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        </div>
      )}

      {sharedData.channels &&
        channels?.map((channel) => (
          <div onClick={()=> setChannelData(channel)} key={channel.id} className="relative w-full">
            <div className="mt-5 flex space-x-4 m-2 cursor-pointer hover:bg-custombg">
              <h1 className="text-gray-200 font-discord font-semibold tracking-wider">{channel.name}</h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
