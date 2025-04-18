import {
  FaUserPlus,
  FaCog,
  FaPlus,
} from "react-icons/fa";

interface ServerDropdownMenuProps {
   openModal: () => void, 
   closeMenu: () => void ,
   openModelForGroup: () => void ,
   setServerSettings:React.Dispatch<React.SetStateAction<boolean>>
}

export default function ServerDropdownMenu({ openModal, openModelForGroup, setServerSettings }:ServerDropdownMenuProps) {
  


  const addServer = () => openModal();

  return (
    <div
   
      className="absolute w-52 bg-[#2b2d31] text-white rounded-xl p-2 shadow-xl space-y-1 text-sm font-medium z-50"
    >
    

      <div onClick={openModelForGroup} className="flex items-center gap-2 hover:bg-[#404249] p-2 rounded cursor-pointer">
        <FaUserPlus className="text-gray-400" />
        <span>Invite People</span>
      </div>

      <div onClick={() => setServerSettings(true)} className="flex items-center gap-2 hover:bg-[#404249] p-2 rounded cursor-pointer">
        <FaCog className="text-gray-400" />
        <span>Server Settings</span>
      </div>

      <div onClick={addServer} className="flex items-center gap-2 hover:bg-[#404249] p-2 rounded cursor-pointer">
        <FaPlus className="text-gray-400" />
        <span>Create Channel</span>
      </div>
    </div>
  );
}
