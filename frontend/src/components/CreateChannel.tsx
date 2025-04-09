import { FaHashtag, FaVolumeUp, FaLock } from "react-icons/fa";
import { useState } from "react";
import ChatInput from "./ChatInput";

export default function CreateChannelModal({ isOpen, closeModal }) {
  const [channelType, setChannelType] = useState("text");
  const [isPrivate, setIsPrivate] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-[#2b2d31] text-white w-full max-w-xl rounded-2xl shadow-2xl p-6 font-medium space-y-5 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* The rest of the modal content from previous step goes here */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Channel</h2>
        </div>

        <p className="text-sm text-gray-400">in Text Channels</p>

        {/* Channel Type, Name Input, Privacy Switch, Buttons — same as above */}
        {/* You can paste the inner modal content from the previous step here */}
        <div className="space-y-2">
  <label htmlFor="channelName" className="text-xs font-semibold text-white uppercase tracking-wide">
    Channel Name
  </label>
  <div className="flex items-center bg-[#1e1f22] text-gray-400 border border-[#4e5058] rounded-md px-3 py-2">
    <span className="text-gray-400 mr-2">#</span>
    <input
      id="channelName"
      type="text"
      placeholder="new-channel"
      className="bg-transparent text-white w-full outline-none placeholder-gray-400"
    />
  </div>
</div>

        {/* Footer */}
        <div className="flex justify-end gap-4 text-sm">
          <button className="text-[#949ba4] hover:underline" onClick={closeModal}>
            Cancel
          </button>
          <button className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-4 py-2 rounded-md font-semibold">
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
}
