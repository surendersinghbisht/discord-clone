import { FC, memo, useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../../api/api";
import { IUser } from "@/models/User";
import { axiosInstance } from "../../api/api";
import ChatInput from "./ChatInput";

type ChatappProps = {
  reciever: IUser | null;
};

const fetchAuthUser = async (): Promise<IUser> => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

interface Message {
  sender: IUser;
  reciever: IUser;
  text: string;
}

const Chatapp: FC<ChatappProps> = ({ reciever }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: authUser, isLoading, error } = useQuery<IUser>({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (authUser?._id && reciever?._id) {
      socket.emit("joinRoom", authUser._id);

      const fetchMessages = async () => {
        const res = await axiosInstance.get<Message[]>(
          `message/get-messages/${authUser._id}/${reciever._id}`
        );
        setMessages(res.data);
      };

      fetchMessages();

      const handleMessageReceived = (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.on("receiveMessage", handleMessageReceived);

      return () => {
        socket.off("receiveMessage", handleMessageReceived);
      };
    }
  }, [authUser?._id, reciever?._id]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (text.trim() === "") return;

    const newMessage: Message = {
      sender: authUser!,
      reciever: reciever!,
      text,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    socket.emit("sendMessage", newMessage, (response) => {
      if (response?.status === "error") {
        console.error("Failed to send message");
      }
    });
  };

  const SidebarLine = () => (
    <div className="border-t-2 border-[#29292D] w-full"></div>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full bg-custombg font-bold flex flex-col h-screen">
      <div className="flex items-center justify-start h-10 z-40 border-b-[0.5px] border-gray-600 mt-4 ml-6 space-x-3 px-4 sm:px-6 lg:px-8">
        {reciever?.image ? (
          <img className="h-8 w-8 rounded-full" src={reciever.image} />
        ) : (
          <img className="h-8 w-8 rounded-full" src="/user.jpg" />
        )}
        <span className="font-discord text-white text-lg">{reciever?.name}</span>
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
      >
        {messages.length === 0 ? (
          <div className="text-white text-center">Start a conversation...</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index}>
              <p className="text-white m-1">
                {msg.sender._id === authUser?._id ? "You" : msg.sender.name}: {msg.text}
              </p>
              <SidebarLine />
              <br />
            </div>
          ))
        )}
      </div>
      <div className="p-4 mr-4 sticky bottom-0 bg-custombg z-20">
        <ChatInput name={reciever?.name} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default memo(Chatapp);
