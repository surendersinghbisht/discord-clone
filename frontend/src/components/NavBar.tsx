import { MdKeyboardArrowRight } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import { IUser } from '@/models/User';
import Userbatch from './Userbatch';
import { FaUserFriends } from "react-icons/fa";
import React, { useState } from 'react';
import OfficialDiscordMessage from './DiscordMessage';
import  {FaChevronDown} from 'react-icons/fa';
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
    friends: boolean,
    channels: boolean
  };
  friends: IUser[] | undefined;
  getRecieverFromNav: any;
  setFriendsSecton: any;
  showNavbar: boolean;
  channels: any[];
  setShownavbar:  React.Dispatch<React.SetStateAction<boolean>>;
  setOfficialDiscord: React.Dispatch<React.SetStateAction<boolean>>;
  groupName: string;
  groupId: string;
}

const Navbar: React.FC<NavbarProps> = ({ groupId,groupName, setOfficialDiscord, channels, sharedData, friends, getRecieverFromNav, setFriendsSecton, showNavbar,setShownavbar }) => {

 
  const sendReciever = (reciever: IUser) => {
    getRecieverFromNav(reciever);
    setShownavbar(false);

  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Toggle function for showing or hiding the dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);


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
      {sharedData.friends && <div className='mt-4'><button onClick={()=>setOfficialDiscord(true)}>
        <OfficialDiscordMessage /></button>
        </div>
        }
      {sharedData.friends && friends?.map((friend) => {
        return (<div>
          <button onClick={() => sendReciever(friend)} key={friend._id}>
            <Userbatch name={friend.name} image={friend.image} />
          </button>
          </div>
        )
      })}
      {sharedData.channels && (
        <div
        onClick={toggleDropdown}
        className="flex border border-[#3c3f45] rounded-lg text-lg mt-4 w-full text-gray-200 items-center justify-between font-semibold px-2 py-1 cursor-pointer"
      >
        <span>{groupName}</span>
        <FaChevronDown className="text-lg" />
      </div>
      )}
{sharedData.channels && (
  channels?.map((channel) => {
    return (
      <div key={channel.id} className="relative w-full">
        
        {isDropdownOpen && (
          <div className="absolute  left-0 mt-2 z-10 w-full sm:w-64">
            <ServerDropdownMenu
              openModal={() => setIsModalOpen(true)}
              closeMenu={() => setIsDropdownOpen(false)}
            /> 
            <CreateChannelModal
            groupId={groupId}
              isOpen={isModalOpen}
              closeModal={() => setIsModalOpen(false)}
            />
            
          </div>
        )}

        {/* Channel Entry */}
        <div className="mt-5 flex space-x-4 m-2 cursor-pointer hover:bg-custombg">
          <h1 className="text-gray-200 font-discord font-semibold tracking-wider">
            {channel.name}
          </h1>
        </div>
      </div>
    );
  })
)}


      {/* Other Navbar List Items */}
      {/* <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Topics" />
      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Questions" />
      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Random" /> */}
      {/* {sharedData.directMessage &&<DirectMessages />} */}
    </div>
  );
};

export default Navbar;
