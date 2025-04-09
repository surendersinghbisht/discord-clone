import {
  FaUserPlus,
  FaCog,
  FaPlus,
} from "react-icons/fa";
import { useEffect, useRef } from "react";

export default function ServerDropdownMenu({ openModal }: { openModal: () => void, closeMenu: () => void }) {
  


  const addServer = () => openModal();

  return (
    <div
   
      className="absolute w-64 bg-[#2b2d31] text-white rounded-xl p-2 shadow-xl space-y-1 text-sm font-medium z-50"
    >
    

      <div className="flex items-center gap-2 hover:bg-[#404249] p-2 rounded cursor-pointer">
        <FaUserPlus className="text-gray-400" />
        <span>Invite People</span>
      </div>

      <div className="flex items-center gap-2 hover:bg-[#404249] p-2 rounded cursor-pointer">
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
