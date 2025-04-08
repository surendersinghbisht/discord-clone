import { IoMdSend } from "react-icons/io";


const DiscordMessageInput = () => {
  return (
    <div className="bg-[#2B2D31] p-3 rounded-md flex items-center justify-between text-gray-400 w-full max-w-3xl mx-auto">
      {/* Left Section */}
      <div className="flex items-center gap-3 flex-1">
        <input
          type="text"
          placeholder="Message @Surender Ai"
          className="bg-transparent outline-none text-sm text-white placeholder:text-gray-400 w-full"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center ">
     
        <IoMdSend className="text-lg cursor-pointer hover:text-white" />
      </div>
    </div>
  );
};

export default DiscordMessageInput;
