import React, { useEffect } from 'react';
import { FiHash, FiBell, FiUsers, FiSearch, FiInbox } from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs';
import { FaGift, FaSmile } from 'react-icons/fa';
// import { RiGifFill } from 'react-icons/ri';
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import ChatInput from './ChatInput';
import { axiosInstance, socket } from "../../api/api";
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/models/User';

interface channelChat {
  sender: IUser;
  channelId: string;
  message: string;
}

const ChannelChat = ({channelDetails}) => {

  const removeHash =(str: string): string=> {
   const string = str.split("").filter(s=> s !== "#").join("");
   return string;
  }

  const fetchAuthUser = async (): Promise<IUser> => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  };

  const {data: authUser} = useQuery<IUser>({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  const[chat, setChat] = React.useState<channelChat[]>([]);

  useEffect(() => {
    socket.emit('join_room', channelDetails._id);
    const fetchMessages = async () => {
      const res = await axiosInstance.get(`/message/get-groupMessages/${authUser?._id}/${channelDetails._id}`);
      setChat(res.data);
    }
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    fetchMessages();

  const handleMessageReceived = (data: Message) => {
          setChat((prevMessages) => [...prevMessages, data]);
        };
  
        socket.on("receive_message", handleMessageReceived);
  
        return () => {
          socket.off("receive_message", handleMessageReceived);
        };

  }, [channelDetails._id, authUser]);

   const sendMessage = (text: string) => {
      if (text.trim() === "") return;

      const newMessage: channelChat = {
        sender: authUser!,
        channelId: channelDetails._id,
        message: text,
      };

      setChat((prevMessages) => [...prevMessages, newMessage]);
  
      socket.emit("send_message", newMessage, (response) => {
        if (response?.status === "error") {
          console.error("Failed to send message");
        }
      });
    };

  return (
    <div className="flex flex-col w-full pl-4 pr-4 pb-2 h-screen bg-[#313338] text-white">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 border-b border-[#2b2d31] gap-2">
        <div className="flex items-center space-x-2 text-gray-300 text-base md:text-lg">
          <FiHash className="text-xl" />
          <span className="font-medium">{removeHash(channelDetails.name)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-400">
          <FiInbox />
          <FiBell />
          {/* <FiPin /> */}
          <FiUsers />
          <div className="relative w-full max-w-[160px] sm:max-w-[200px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#1e1f22] rounded-md px-3 py-1 text-sm placeholder-gray-500 text-white focus:outline-none"
            />
            <FiSearch className="absolute right-2 top-1.5 text-gray-400 text-sm" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <div className="bg-[#2b2d31] p-4 rounded-full">
              <FiHash className="text-4xl text-gray-300" />
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            Welcome to <span className="text-white">{channelDetails.name}</span>!
          </h1>
          <p className="text-sm text-gray-400 mb-2">
            This is the start of the {channelDetails.name} channel.
          </p>
          <button className="text-blue-400 hover:underline text-sm">Edit Channel</button>
        </div>
      </div>
{
  chat.map(c =>{
    return (
      <div>
        {c.message}
      </div>
    )
  })
}
        <div className='sm:pr-8'>
        <ChatInput name={channelDetails.name} sendMessage = {sendMessage} />
        <div className="flex items-center space-x-3 text-gray-400 text-xl">
        </div>
      </div>
    </div>
  );
};

export default ChannelChat;
