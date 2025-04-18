import { IUser } from '@/models/User';
import Userbatch from './Userbatch';
import { FaUserFriends } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import OfficialDiscordMessage from './DiscordMessage';
import { FaChevronDown } from 'react-icons/fa';
import ServerDropdownMenu from './Serverdropdown';
import CreateChannelModal from './CreateChannel';
import {  FaUserPlus, FaCog } from "react-icons/fa";
import { useRef } from 'react';
import ChannelSettingsModal from './ChannelSettingsModal';
import InvitePeopleModel from './InvitePeopleModel';
import ServerSettingsModal from './ServerSettingModel';
import { Server } from 'lucide-react';
// const NavbarListItem = ({ icon, text }) => (
//   <div className='w-full flex justify-between items-center my-1 group'>
//     <div className='flex justify-between items-center'>
//       <div className='transition-all duration-200 ease-in-out group-hover:rotate-90'>
//         {icon}
//       </div>
//       <p className='font-medium text-gray-400'>{text}</p>
//     </div>
//     <BsPlus className='text-green-500 group-hover:rotate-90 transition-all duration-200 ease-in-out' size="20" />
//   </div>
// );

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
  setOfficialDiscord: any;
  channelChatview: any;
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
  const[showModal, setShowModal] = useState(false);
  const [channelDataForModal, setChannelDataForModal] = useState<any | null>(null);
  const[showInviteModelForChannel, setInviteModelForChannel] = useState(false);
  const[showInviteModelForGroup, setInviteModelForGroup] = useState(false);
  const[ServerSettings, setServerSettings] = useState(false);
  

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const dropdownRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



const handelChannelModel =(channel:any)=> {
  setShowModal(true);
  setChannelDataForModal(channel)

}

const handelChannelModelForInvite =(channel:any, type: string)=> {

  if(type === "channel"){
    setInviteModelForChannel(true);
    setInviteModelForGroup(false);
  setChannelDataForModal(channel);
  } 

  if(type === "group"){
    console.log("group", groupId)
    setInviteModelForGroup(true);
    setInviteModelForChannel(false);
    setChannelDataForModal(groupId);
}
}

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
        <div onClick={() => setFriendsSecton(true)} className=' text-2xl flex space-x-4 m-2 cursor-pointer hover:bg-custombg'>
          <FaUserFriends className='ml-2 mt-1 text-white' />
          <h1 className='text-gray-200 font-discord font-semibold  tracking-wider'>friends</h1>
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
        <div  ref={dropdownRef} className="absolute mt-14 sm:mt-0 z-10 w-full sm:w-64">
          <ServerDropdownMenu 
          setServerSettings={(data)=>setServerSettings(data)}
          openModelForGroup ={() => handelChannelModelForInvite(groupId, "group")}
           openModal={() => setIsModalOpen(true)} 
           closeMenu={() => setIsDropdownOpen(false)} />
          <CreateChannelModal groupId={groupId} isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        </div>
      )}

      {sharedData.channels &&
        channels?.map((channel) => (
          <div key={channel.id} className="relative w-full">
            <div className=" flex space-x-4 m-2 cursor-pointer hover:bg-custombg">
            <div  className="flex items-center justify-between text-lg text-gray-300 px-4 py-2 rounded-md w-full">
      
      <div onClick={()=> setChannelData(channel)} className="flex flex-1 items-center space-x-2 text-base font-medium">
       <span className='text-lg'>{channel.name}</span> 
      </div>
  
    
      <div className="flex items-center space-x-4">
        <FaUserPlus onClick={()=>handelChannelModelForInvite(channel, "channel")} className="hover:text-white z-40 cursor-pointer" />
        <FaCog onClick={()=>handelChannelModel(channel)} className="hover:text-white z-40 cursor-pointer" />
        
      </div>
    </div>
            </div>
          </div>
        ))}
        {channelDataForModal && (
  <ChannelSettingsModal
    channel={channelDataForModal}
    isOpen={showModal}
    onClose={() => setShowModal(false)}
  />
)}

{ServerSettings &&<ServerSettingsModal groupId={groupId} isOpen={ServerSettings} onClose={() => setServerSettings(false)} />}

{showInviteModelForChannel && <InvitePeopleModel   isOpen = {showInviteModelForChannel} onClose={() => setInviteModelForChannel(false)} channel={channelDataForModal}/>}
{showInviteModelForGroup && <InvitePeopleModel groupId={groupId}  isOpen = {showInviteModelForGroup} onClose={() => setInviteModelForGroup(false)} />}

    </div>
  );
};

export default Navbar;
