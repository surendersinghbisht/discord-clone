import { FC, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

interface ChatInputProps {
  sendMessage: (text: string) => void;
  name: string | undefined;
}

const ChatInput: FC<ChatInputProps> = ({ sendMessage, name }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message); // Send the message
      setMessage(""); // Clear the input field
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && message.trim()) {
      handleSendMessage(); // Send message when Enter key is pressed
    }
  };

  return (
    <div className="bg-[#2a2a2a] p-3 flex items-center gap-2 sm:gap-3 rounded-lg  sm:mx-4 w-full ">
      
      {/* Plus Button (Hidden on Mobile) */}
      <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 hidden sm:block">
        <FaPlus className="text-white" />
      </button>

      {/* Input Field */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`Message @${name}`}
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2 py-2 sm:py-3 sm:px-3 text-sm sm:text-base"
      />

      {/* Send Button */}
      <button
        onClick={handleSendMessage}
        className="text-white text-xl sm:text-2xl"
      >
        <IoMdSend />
      </button>
    </div>
  );
};

export default ChatInput;
