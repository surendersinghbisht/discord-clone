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

const Chatapp: FC<ChatappProps> = ({ recieverId }) => {
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<any>>([]);

  const { data: authUser, isLoading, error } = useQuery<IUser>({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  useEffect(() => {
    if (authUser?._id) {
      socket.emit("joinRoom", authUser._id);

      const handleMessageReceived = (data) => {
        console.log("Message received:", data);
    
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.on("receiveMessage", handleMessageReceived);

      return () => {
        socket.off("receiveMessage", handleMessageReceived);
      };
    }
  }, [authUser?._id]);

  
  const sendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      sender: authUser?._id,
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

 
  return (
    <div className="bg-custombg font-bold">
      <div>
        {messages.map((msg, index) => (
          <p className="text-white" key={index}>
            {msg.sender === authUser?._id ? "you": msg.reciever}: {msg.text}
          </p>
        ))}
      </div>
      <div className="p-4 flex fixed bottom-0 w-full">
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
