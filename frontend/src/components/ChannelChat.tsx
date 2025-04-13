import React, { useEffect } from 'react';
import { FiHash, FiBell, FiUsers, FiSearch } from 'react-icons/fi';
import ChatInput from './ChatInput';
import { axiosInstance, socket } from "../../api/api";
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/models/User';
import { useRef } from 'react';
import FriendList from './FriendList';
import { useState } from 'react';

interface ChannelChatProps {
  channelDetails: any; 
}

interface ChannelChatMessage {
  sender: IUser;
  channelId: string;
  message: string;
  createdAt: string; 
}

const ChannelChat: React.FC<ChannelChatProps> = ({ channelDetails }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channel, setChannel] = useState<any[]>([]);

  const removeHash = (str: string): string => {
    return str.split('').filter(s => s !== '#').join('');
  };

  const fetchAuthUser = async (): Promise<IUser> => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  };


  const { data: authUser } = useQuery<IUser>({
    queryKey: ['authUser'],
    queryFn: fetchAuthUser,
  });

  const [chat, setChat] = React.useState<ChannelChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!authUser || !channelDetails) return;

    const fetchChannel = async () => {
      const res = await axiosInstance.get(`/group/get-channel/${channelDetails._id}`);
    setChannel(res.data);
    }
    
    fetchChannel();

    socket.emit('join_room', channelDetails._id);

    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(
          `/message/get-groupMessages/${authUser._id}/${channelDetails._id}`
        );
        setChat(res.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    const handleMessageReceived = (data: ChannelChatMessage) => {
      setChat((prevMessages) => [...prevMessages, data]);
    };

    socket.on('receive_message', handleMessageReceived);

    return () => {
      socket.off('receive_message', handleMessageReceived);
    };
  }, [authUser, channelDetails]);

  const sendMessage = (text: string) => {
    if (text.trim() === '' || !authUser) return;

    const newMessage: ChannelChatMessage = {
      sender: authUser,
      channelId: channelDetails._id,
      message: text,
      createdAt: new Date().toISOString(), 
    };

    setChat((prevMessages) => [...prevMessages, newMessage]);

    socket.emit('send_message', newMessage, (response:any) => {
      if (response?.status === 'error') {
        console.error('Failed to send message');
      }
    });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  if (!authUser) return null;

  return (
    <div className="flex flex-col w-full pl-4 pr-4 pb-2 h-screen bg-[#1A1A1E] text-white">
    <FriendList channelDetails={channel} isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 border-b border-[#2b2d31] gap-2">
        <div className="flex items-center space-x-2 text-gray-300 text-base md:text-lg">
          <FiHash className="text-xl" />
          <span className="font-medium">{removeHash(channelDetails.name)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-400">
          <FiBell />
          <FiUsers onClick={()=>setIsModalOpen(true)} />
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

      {!chat.length && (
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
            {/* <button className="text-blue-400 hover:underline text-sm">Edit Channel</button> */}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
        {chat.map((msg) => (
          <div key={msg.createdAt} className="flex items-start gap-3 px-4 py-2 hover:bg-[#2b2d31] transition-colors duration-200">
            <img
              src={msg.sender.image || '/user.jpg'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm">
                  {msg.sender._id === authUser._id ? 'You' : msg.sender.name}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>
              </div>
              <p className="text-sm text-white mt-0.5">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sm:pr-8">
        <ChatInput name={channelDetails.name} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChannelChat;
