import { FC, memo, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import ChatApp from "@/components/Chatapp";
import Navbar from "@/components/NavBar";
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/models/User';
import { axiosInstance } from '../../api/api';
import FriendSection from "@/components/FriendsSection";
import SettingsPage from "./SettingsPage";
import OfficialDiscordMessage from "@/components/DiscordMessage";
import DiscordOfficialMessage from "@/components/DiscordOffilcal";
import HeroSection from "./HeroPage";

type LandingPageProps = {};

const LandingPage: FC<LandingPageProps> = () => {
  const [sharedData, setSharedData] = useState({
    friends: false,
    channels: false
  });

  const [reciever, setReciever] = useState<IUser | null>(null);
  const [chatApp, setChatapp] = useState(false);
  const [FriendsSection, setFriendsSecton] = useState(false);
  const [settingsPage, setSettingsPage] = useState(false);
  const [officialDiscord, setOfficialDiscord] = useState(false);
  const [groupId, setGroupId] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [showNavbar, setShownavbar] = useState(false);

  
  const { data: friends } = useQuery<IUser[]>({
    queryKey: ["friends"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/friends/get-friends");
        return res.data;
      } catch (error) {
        console.log("Error in getting friends:", error);
      }
    }
  });

 
  const { data: channels } = useQuery({
    queryKey: ["channels", groupId],
    queryFn: async () => {
      try {
        if (!groupId) return [];
        const res = await axiosInstance.get(`/group/get-channels/${groupId}`);
        console.log(res.data)
        return res.data;
      } catch (error) {
        console.log("Error in getting channels:", error);
      }
    },
    enabled: !!groupId, 
  });

  
  const getReciever = (reciever: IUser) => {
    setReciever(reciever);
    setChatapp(true);
    setFriendsSecton(false);
    setSettingsPage(false);
    setOfficialDiscord(false);
  };

  const setFriendsSectionData = (data: boolean) => {
    setFriendsSecton(data);
    setChatapp(false);
    setSettingsPage(false);
    setShownavbar(false);
    setOfficialDiscord(false);
  };


  const setSettingsPageView = (data: boolean) => {
    setSettingsPage(data);
    setChatapp(false);
    setFriendsSecton(false);
    setShownavbar(false);
    setOfficialDiscord(false);
  };

  
  const setOfficialDiscordMessage = (data: boolean) => {
    setOfficialDiscord(data);
    setChatapp(false);
    setFriendsSecton(false);
    setSettingsPage(false);
    setShownavbar(false);
  };

 
  const getChannelsForGroup = async (id: string, groupName: string) => {
    setGroupId(id);
    setGroupName(groupName);
  };

  return (
    <div className="flex bg-custombg h-screen overflow-auto">
      
      <SideBar
        getChannels={getChannelsForGroup}
        setShownavbar={setShownavbar}
        setSettingsPage={setSettingsPageView}
        sharedData={sharedData}
        setSharedData={setSharedData}
      />

      
      <Navbar
      groupId= {groupId}
        setOfficialDiscord={setOfficialDiscordMessage}
        channels={channels || []}  
        groupName={groupName}
        setShownavbar={setShownavbar}
        showNavbar={showNavbar}
        setFriendsSecton={setFriendsSectionData}
        getRecieverFromNav={getReciever}
        sharedData={sharedData}
        friends={friends || []} 
      />

    
      {chatApp && <ChatApp reciever={reciever} />}
      {officialDiscord && <DiscordOfficialMessage />}
      {FriendsSection && <FriendSection friends={friends || []} />}
      {settingsPage && <SettingsPage />}
    </div>
  );
};

export default memo(LandingPage);
