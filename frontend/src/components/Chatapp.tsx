import { FC, memo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type ChatappProps = {}; // You can extend this with props if needed in the future

const Chatapp: FC<ChatappProps> = () => {
  return (
    <div className=" bg-custombg">
      <div className="p-4 flex fixed bottom-0 w-full ">
      <Input className="bg-customcolor outline-none w-2/3 border-gray-700 text-white font-discord" />
      <Button className="bg-customcolor outline-none w-12 sm:w-20 border-gray-700 text-white font-discord">Send</Button>
      </div>
    </div>
  );
};

Chatapp.defaultProps = {}; // Default props, currently empty

export default memo(Chatapp); // Memoization to prevent unnecessary re-renders
