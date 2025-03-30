import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../../api/api";
import { IUser } from "@/models/User";
import { axiosInstance } from "../../api/api";

type ChatappProps = {
  recieverId: string;
};

const fetchAuthUser = async (): Promise<IUser> => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;

};

interface Message {
  sender: string;
  reciever: string;
  text: string;
}

const Chatapp: FC<ChatappProps> = ({ recieverId }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

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
        const res = await axiosInstance.get<Message[]>(`message/get-messages/${authUser._id}/${recieverId}`);
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
  }, [authUser?._id, recieverId]); 

  const sendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      sender: authUser?._id ?? "",  
      reciever: recieverId,
      text: message,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    socket.emit("sendMessage", newMessage, (response) => {
      if (response?.status === "error") {
        console.error("Failed to send message");
      }
    });
  };

  const SidebarLine = () => (
    <div className="border-t-2 border-[#29292D] w-full"></div> // Use border-top for a bold effect
  );
  
  
  

  return (
    <div className="bg-custombg h-screen font-bold flex flex-col">
     
     <div className="flex-1 overflow-y-auto p-4 mb-16">
  {messages.map((msg, index) => (
    <div key={index}>
      <p className="text-white m-4">
        {msg.sender === authUser?._id ? "You" : msg.reciever}: {msg.text}
      </p>
      <SidebarLine />
      <br />
    </div>
  ))}
</div>

      <div className="p-4 flex fixed bottom-0 w-full bg-custombg">
        <Input
          className="bg-customcolor outline-none w-2/3 border-gray-700 text-white font-discord"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          onClick={sendMessage}
          className="bg-customcolor outline-none w-12 sm:w-20 border-gray-700 text-white font-discord"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

Chatapp.defaultProps = {};

export default memo(Chatapp);
