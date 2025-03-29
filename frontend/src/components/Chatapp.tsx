import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../../api/api";
import { IUser } from "@/models/User";

type ChatappProps = {
  recieverId: string;
};

const Chatapp: FC<ChatappProps> = ({ recieverId }) => {
  const { data: authUser } = useQuery<IUser>({
    queryKey: ["authUser"]
  });


  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<any>>([]);

  useEffect(() => {
    if (authUser?._id) {
      socket.emit("joinRoom", authUser._id);

      const handleMessageReceived = (data: any) => {
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
      senderId: authUser?._id,
      recieverId: recieverId,
      text: message,
    };

    // Optimistic UI update
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    socket.emit("sendMessage", newMessage, (response) => {
      if (response?.status === "error") {
        // Handle message send failure
        console.error("Failed to send message");
      }
    });
  };

  return (
    <div className="bg-custombg">
      <div>
        {messages.map((msg, index) => (
          <p className="text-white" key={index}>
            {msg.senderId}: {msg.text}
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
