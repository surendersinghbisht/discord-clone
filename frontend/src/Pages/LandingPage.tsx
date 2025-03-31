import { FC, memo, useState } from "react";
import SideBar from "../components/SideBar";
import ChatApp from "@/components/Chatapp";
import Navbar from "@/components/NavBar";
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/models/User';
import { axiosInstance } from '../../api/api';
import FriendSection from "@/components/FriendsSection";
import SettingsPage from "./SettingsPage";

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
const[FriendsSection, setFriendsSecton] = useState(false);
const[settingsPage, setSettingsPage] = useState(false);

const getReciverId =(id)=> {
setRecieverId(id)
setChatapp(true);
setFriendsSecton(false);
setSettingsPage(false);
}


const setFriendsSectionData =(data:boolean)=> {
  setFriendsSecton(data);
  setChatapp(false);
  setSettingsPage(false);
}

const settinngPageView = (data:boolean) => {
setSettingsPage(data);
setChatapp(false);
setFriendsSecton(false);
}


  return (
    <div className="flex bg-custombg h-screen">
 
    <div className="bg-gray-900 text-white h-screen z-50 fixed top-0 left-0 w-16  md:block">
      <SideBar setSettingsPage={settinngPageView} sharedData={sharedData} setSharedData={setSharedData} />
    </div>
    
    <div className="hidden md:block  h-screen fixed top-0 left-16 w-36 px-3 py-3 z-30">
      <Navbar setFriendsSecton={setFriendsSectionData} getRecieverIdFromNav={getReciverId} sharedData={sharedData} friends={friends} />
    </div>
  
    <div className="h-screen overflow-y-auto flex-1 ml-20 md:ml-[250px] bg-custombg"> 
      {chatApp && <ChatApp recieverId={recieverId} />}
      {FriendsSection && <FriendSection friends={friends}/>}
      {settingsPage && <SettingsPage />}
    </div>
   
  </div>
  
  );
};

export default memo(LandingPage);
