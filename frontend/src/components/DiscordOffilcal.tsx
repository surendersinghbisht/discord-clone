// components/DiscordOfficialMessage.tsx

import { FaDiscord } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/models/User";

const DiscordOfficialMessage = () => {

  const {data: authUser} = useQuery<IUser>({
    queryKey: ["authUser"]
  })

  const today = new Date();
const formattedToday = today.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const formattedDateTime = new Date().toLocaleString("en-US", {
  month: "numeric",
  day: "numeric",
  year: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});



  return (
    <div className="bg-[#313338] min-h-screen text-white px-4 md:px-6 py-10 font-sans">
      {/* Header */}

      {/* Hero Section */}
      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="bg-[#5865F2] rounded-full p-3 self-center sm:self-auto">
          <FaDiscord className="text-white text-4xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Discord</h2>
          <p className="text-sm text-gray-300 mt-1">
            This is an official message from Team Discord-Clone By Surender. Please be advised that Discord will never ask you for your password or account token.
          </p>
        </div>
      </div>

      {/* Date */}
      <p className="text-center text-sm text-gray-400 mt-6">{formattedToday}</p>

      <hr className="border-gray-600 mt-2 mb-4" />

      {/* Message Box */}
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-3 space-y-3 sm:space-y-0">
        {/* Avatar */}
        <div className="bg-[#5865F2] rounded-full p-2 self-start">
          <FaDiscord className="text-white text-xl" />
        </div>

        {/* Message Content */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold">Discord</span>
            <span className="bg-[#5865F2] text-white text-[10px] px-2 py-[2px] rounded font-bold flex items-center gap-1">
              <BsCheckLg className="text-[10px]" />
              OFFICIAL
            </span>
            <span className="text-xs text-gray-400">{formattedDateTime}</span>
          </div>

          <p className="text-sm text-gray-200 mt-2">
            Hello, Discord has updated all of its accounts to use unique usernames instead of using discriminators in their username (username#0000). We have updated your username to a unique username. Your new username is <span className="font-semibold">{authUser?.username}</span>. You can always change your username later in <a className="text-[#00A8FC] hover:underline" href="#">User Settings</a>.
          </p>

          <p className="text-sm text-gray-200 mt-4">
            Learn more about our recent changes to usernames in our <a className="text-[#00A8FC] hover:underline" href="#">support article</a>
          </p>

          <p className="text-sm mt-4">Thank you, Surender.</p>
        </div>
      </div>

      {/* Footer Box */}
      <div className="bg-[#2b2d31] rounded-md p-4 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#1e1f22]">
        <div className="flex items-start md:items-center space-x-3">
          <div className="bg-[#1e1f22] p-2 rounded-full">
            <FaDiscord className="text-white text-xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              This chat is reserved for official Discord notifications.
            </p>
            <p className="text-xs text-gray-400">
              Discord will never ask you for your password or account token.
            </p>
          </div>
        </div>
        <button className="bg-[#5865F2] text-white text-sm px-4 py-1.5 rounded hover:brightness-110 w-full md:w-auto">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default DiscordOfficialMessage;
