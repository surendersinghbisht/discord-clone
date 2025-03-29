import { FC, memo, useState } from "react";
import SideBar from "../components/SideBar";
import ChatApp from "@/components/Chatapp";
import Navbar from "@/components/NavBar";
import { FaGripLines } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/models/User';
import { axiosInstance } from '../../api/api';

type LandingPageProps = {};

const LandingPage: FC<LandingPageProps> = () => {

  const[sharedData, setSharedData]= useState({
    friends: false,
    channels: false
  })


    const{data: friends} = useQuery<IUser[]>({
      queryKey: ["friends"],
      queryFn: async()=> {
        try {
         const res = await axiosInstance.get("/friends/get-friends");
         return res.data;
        } catch (error) {
          console.log(error, "error in getting friends");
        }
      }
    })
 

const[recieverId, setRecieverId] = useState("");
const[chatApp, setChatapp] = useState(false);
const getReciverId =(id)=> {
setRecieverId(id)
setChatapp(true);
}

  return (
    <div>
    <div className="flex h-screen">
  
      <div className=" bg-gray-900 text-white ">
        <SideBar sharedData={sharedData} setSharedData={setSharedData} />
      </div>
      
      <div className="hidden md:block lg:block  ">
      <Navbar  getRecieverIdFromNav={getReciverId} sharedData = {sharedData} friends={friends}/>
      </div>

      <div className="flex-1 bg-custombg h-screen ">
       {chatApp && <ChatApp recieverId={recieverId} />}
      </div>
    </div>
    </div>
    
  );
};

export default memo(LandingPage);
