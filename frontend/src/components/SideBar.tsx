import React, { memo } from "react";
import { FaDiscord } from "react-icons/fa6";
import { BsFillLightningFill } from "react-icons/bs";
import { RiSettings3Fill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import { Dialog } from "./ui/dialog";
import Addserver from "./Addserver";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import toast from "react-hot-toast";


const SidebarIcon = ({ icon, text = "tooltip" }: any) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

const SidebarLine = () => (
  <div className="h-0.5 w-12 bg-gray-800 mx-auto rounded-full"></div>
);

type ChildProps = {
  setSharedData: any;
  setSettingsPage: any;
  setShownavbar: any;
  getChannels:any;
};
const SideBar:React.FC<ChildProps> = ({getChannels, setSharedData, setSettingsPage, setShownavbar}) => {


const {data: groups} = useQuery({
  queryKey: ["groups"],
queryFn: async()=> {try {
  const res = await axiosInstance.get("/group/get-groups");
  return res.data;
} catch (error) {
  console.log(error)
}}
})



const firstWord = (str: string): string=> {
 const word = str.split(" ").map(s=> s[0]).join("");
 return word
    
  }


  const setDirectMessage = ()=> {
    setSharedData({
     channels: false,
      friends: true
    });
    setSettingsPage(false);
    setShownavbar(true);
  }

  const setChannelsData = (id: string, groupName: string)=> {
    setSharedData({
      channels: true,
      friends: false
    });
    setSettingsPage(false);
    setShownavbar(true);
getChannels(id, groupName);
  }


  
const showToast = ()=> {
  toast.error("Sorry this feature is not available right now!");
}

  return (
    <div className=" w-18 p-3 flex flex-col h-screen bg-customcolor sticky items-center pt-10  text-white shadow-lg">

        <button onClick={setDirectMessage} ><SidebarIcon  icon={<FaDiscord size="28" />} text="Direct Message" /></button>   
      <SidebarLine />

      {groups?.map((group:any)=> {
        return (
          <div className=""> 
            <button onClick={()=>setChannelsData(group._id, group.name)}>
            <SidebarIcon icon={  <Avatar className="">
  <AvatarImage className="bg-black" src="" />
  <AvatarFallback className="text-custombg  font-bold font-discord  bg-white">{firstWord(group.name)}</AvatarFallback>
</Avatar>
} text={`${group.name} server` } />
</button>
          </div>
        )
      })}
      
      <button onClick={showToast}><SidebarIcon icon={<BsFillLightningFill size="28" />} text="Upgrade to Pro" /></button>
      {/* <SidebarIcon icon={<FaPoo size="28" />} text="Poop Time ?" /> */}
      <Addserver />
      <SidebarLine />
      <Dialog />
      <button onClick={()=>setSettingsPage(true)}><SidebarIcon icon={<RiSettings3Fill size="28" />} text="Settings" /></button>
    </div>
  );
};

export default memo(SideBar);
