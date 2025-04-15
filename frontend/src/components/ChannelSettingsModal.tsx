import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import toast from "react-hot-toast";

interface ChannelSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: any
}

const ChannelSettingsModal: React.FC<ChannelSettingsModalProps> = ({
  isOpen,
  onClose,
  channel
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [channelName, setChannelName] = useState(channel.name);
  const [channelTopic, setChannelTopic] = useState("");
  
const query = useQueryClient();
  const {mutate: ediMutation} = useMutation({
    mutationFn: async () => {
      
        await axiosInstance.put(`/group/edit-channel/${channel._id}`,{channelName});
       
    },
    onSuccess: ()=> {
query.invalidateQueries({queryKey:["channels"]})
      toast.success("channel details edited successfully");
    },
    onError(error: any) {
      toast.error(error.response.data.message);
    },
})

 useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  let timeoutId: NodeJS.Timeout;

  if (isOpen) {
    
    timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }, 0);
  }

  return () => {
    clearTimeout(timeoutId);
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEsc);
  };
}, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black/60 z-50 flex items-center justify-center">
    <div
      className="bg-[#2B2D31] text-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative overflow-hidden"
    >
    
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <X />
        <span className="text-xs hidden sm:block">ESC</span>
      </button>
  
     
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>
  
     
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Channel Name</label>
        <input
        name="channelName"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-[#1E1F22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          placeholder="channel-name"
        />
      </div>
  
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Channel Topic</label>
        <textarea
          value={channelTopic}
          onChange={(e) => setChannelTopic(e.target.value)}
          className="w-full px-3 py-2 h-24 rounded bg-[#1E1F22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white resize-none"
          maxLength={1024}
          placeholder="Let everyone know how to use this channel!"
        />
        <div className="text-right text-xs text-gray-400 mt-1">
          {channelTopic.length}/1024
        </div>
      </div>
  
  <div className="flex justify-between">
  <div className="flex items-center gap-4">
  <span>Delete Channel</span><span><RiDeleteBin5Line className="mt-0.5 text-red-500" size={19}/></span>
  </div>


      
      <button
        onClick={() => ediMutation()}
        className="bg-green-500 hover:bg-green-400 mt-1 text-white py-1 px-4 rounded"
      >
        Save Changes
      </button>
      </div>
    
    </div>
  </div>
  
  );
};

export default ChannelSettingsModal;
