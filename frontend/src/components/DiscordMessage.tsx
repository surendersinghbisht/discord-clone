import { FaDiscord } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

const OfficialDiscordMessage = () => {
  return (
    <div className="flex items-center space-x-2  text-white p-4 rounded-md w-fit">
      {/* Discord Icon */}
      <div className="bg-[#5865F2] rounded-full p-2">
        <FaDiscord className="text-white text-xl" />
      </div>

      {/* Text Section */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Discord</span>
          <span className="bg-[#5865F2] text-white text-[10px] px-2 py-[2px] rounded font-bold flex items-center gap-1">
            <BsCheckLg className="text-[10px]" />
            OFFICIAL
          </span>
        </div>
        <span className="text-xs text-gray-400">Official Discord Message</span>
      </div>
    </div>
  );
};

export default OfficialDiscordMessage;
