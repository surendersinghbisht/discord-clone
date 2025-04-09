import { FC, memo, useState } from "react";
import SideBar from "../components/SideBar";
import ChatApp from "@/components/Chatapp";
import Navbar from "@/components/NavBar";
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/models/User';
import { axiosInstance } from '../../api/api';
import FriendSection from "@/components/FriendsSection";
import SettingsPage from "./SettingsPage";
import { useEffect } from "react";
import OfficialDiscordMessage from "@/components/DiscordMessage";
import DiscordOfficialMessage from "@/components/DiscordOffilcal";
import HeroSection from "./HeroPage";

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
 

  

const[reciever, setReciever] = useState<IUser | null>(null);
const[chatApp, setChatapp] = useState(false);
const[FriendsSection, setFriendsSecton] = useState(false);
const[settingsPage, setSettingsPage] = useState(false);
const [officialDiscord, setOfficialDiscord] = useState(false);

const getReciver =(reciever: IUser)=> {
  setReciever(reciever);
setChatapp(true);
setFriendsSecton(false);
setSettingsPage(false);
setOfficialDiscord(false);
}


const setFriendsSectionData =(data:boolean)=> {
  setFriendsSecton(data);
  setChatapp(false);
  setSettingsPage(false);
  setShownavbar(false);
  setOfficialDiscord(false);
}

const settinngPageView = (data:boolean) => {
setSettingsPage(data);
setChatapp(false);
setFriendsSecton(false);
setShownavbar(false);
setOfficialDiscord(false);
}

const setOfficialDiscordMessage = (data: boolean) => {
  setOfficialDiscord(data);
  setChatapp(false);
  setFriendsSecton(false);
  setSettingsPage(false);
  setShownavbar(false);
}



const[channels, setChannels] = useState([]);

const getChannelsForGroup = async(id: string)=> {
const res = await axiosInstance.get(`/group/get-channels/${id}`);
setChannels(res.data);
}

const[showNavbar, setShownavbar] = useState(false);
  return (
    <div className="flex  bg-custombg h-screen">

      <SideBar getChannels={getChannelsForGroup} setShownavbar= {setShownavbar} setSettingsPage={settinngPageView} sharedData={sharedData} setSharedData={setSharedData} />
    

      <Navbar
      setOfficialDiscord={setOfficialDiscordMessage}
      channels = {channels}
       setShownavbar={setShownavbar} showNavbar={showNavbar} 
       setFriendsSecton={setFriendsSectionData} getRecieverFromNav={getReciver} 
       sharedData={sharedData} friends={friends} 
       />

 
      {chatApp && <ChatApp reciever={reciever} />}
      {officialDiscord && <DiscordOfficialMessage />}
      {FriendsSection && <FriendSection friends={friends}/>}
      {settingsPage && <SettingsPage />}

   
  </div>
  
  );
};

export default memo(LandingPage);
