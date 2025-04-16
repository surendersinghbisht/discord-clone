import React, { useEffect, useRef, useState } from "react";
import { Copy, RefreshCw, X } from "lucide-react";
import {useOrigin} from "../../api/UseOrigin"
interface ChannelSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: any;
}

const InvitePeopleModel: React.FC<ChannelSettingsModalProps> = ({
  isOpen,
  onClose,
  channel
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  
 
  const [inviteLink, setInviteLink] = useState('');

  const origin = useOrigin();
  useEffect(() => {
    if (channel) {
      setInviteLink(`${origin}/invite/${channel._id}`) 
    }
  }, [channel]);





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



  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
 
  if (!isOpen || !channel) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#2B2D31] text-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
          <span className="text-xs hidden sm:block">ESC</span>
        </button>

        <h2 className="text-2xl font-semibold mb-6">Invite Friends</h2>

        <div className="mb-6 relative">
      <label className="block text-sm font-medium mb-1 text-white">Server Invite Link</label>
      <input
        name="inviteLink"
        value={inviteLink}
        onChange={(e) => setInviteLink(e.target.value)}
        className="w-full px-3 py-2 pr-10 rounded-lg bg-[#1E1F22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
        placeholder="https://discord.gg/..."
      />
      <Copy
        onClick={handleCopy}
        className="absolute right-3 top-9 text-gray-400 hover:text-white cursor-pointer"
        size={18}
      />
      {copied && <span className="absolute right-3 top-16 text-sm text-green-400">Copied!</span>}
    </div>


        <div className="flex justify-between">
      

          <button  
            className=" mt-1 flex items-center  text-white py-1 px-4 rounded"
          >
           Generate a new link
           <RefreshCw size={18} className="ml-3 mt-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitePeopleModel;
