import { FC, memo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../../api/api";
import { IUser } from "@/models/User";
import { axiosInstance } from "../../api/api";
import ChatInput from "./ChatInput";

type ChatappProps = {
  reciever: IUser;
};

const fetchAuthUser = async (): Promise<IUser> => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

// Update Message interface to have sender and reciever as IUser objects
interface Message {
  sender: IUser;  // sender is now an IUser object
  reciever: IUser;  // reciever is now an IUser object
  text: string;
}

const Chatapp: FC<ChatappProps> = ({ reciever }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Fetch authenticated user
  const { data: authUser, isLoading, error } = useQuery<IUser>({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  useEffect(() => {
    if (authUser?._id) {
      socket.emit("joinRoom", authUser._id);

      const fetchMessages = async () => {
        const res = await axiosInstance.get<Message[]>(
          `message/get-messages/${authUser._id}/${reciever._id}`
        );
        setMessages(res.data);
      };

      fetchMessages();

      const handleMessageReceived = (data: Message) => {
        console.log("New message received", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.on("receiveMessage", handleMessageReceived);

      return () => {
        socket.off("receiveMessage", handleMessageReceived);
      };
    }
  }, [authUser?._id, reciever._id]);

  const sendMessage = (text: string) => {
    if (text.trim() === "") return;

    // Create the new message with sender and receiver as IUser objects
    const newMessage: Message = {
      sender: authUser!,
      reciever: reciever, 
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

  return (
    <div className="w-full bg-custombg font-bold flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 mb-16">
        {messages.length === 0 ? (
          <div className="text-white text-center">Start a conversation...</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index}>
              <p className="text-white m-1">
                {msg.sender._id === authUser?._id ? "You" : msg.reciever.name}: {msg.text}
              </p>
              <SidebarLine />
              <br />
            </div>
          ))
        )}
      </div>

      <div className="-mt-5 p-4 sticky bottom-0 w-full bg-custombg z-20">
        <ChatInput name={reciever.name} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

Chatapp.defaultProps = {};

export default memo(Chatapp);
