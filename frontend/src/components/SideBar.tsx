import React, { memo, useState } from "react";
import { FaFire } from "react-icons/fa";
import { BsFillLightningFill, BsPlus } from "react-icons/bs";
import { RiSettings3Fill } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import { Dialog } from "./ui/dialog";
import Addserver from "./Addserver";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




const SidebarIcon = ({ icon, text = "tooltip" }) => (
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
  sharedData: { friends: boolean; channels: boolean };
  setSharedData: React.Dispatch<React.SetStateAction<{ friends: boolean; channels: boolean }>>;
};
const SideBar:React.FC<ChildProps> = ({sharedData, setSharedData}) => {


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


  const setDataForNavBar = ()=> {
    setSharedData({
      ...sharedData,
      friends: true
    })
  }

  return (
    <div className=" w-16 flex flex-col bg-gray-900 items-center mt-10 text-white shadow-lg">

        <button onClick={setDataForNavBar} ><SidebarIcon  icon={<FaFire size="28" />} text="Direct Message" /></button>   
      <SidebarLine />

      {groups?.map((group)=> {
        return (
          <div className="">
            <SidebarIcon icon={  <Avatar className="">
  <AvatarImage className="bg-black" src="" />
  <AvatarFallback className="text-black">{firstWord(group.name)}</AvatarFallback>
</Avatar>
} text={`${group.name} server` } />
          </div>
        )
      })}
      
      <SidebarIcon icon={<BsFillLightningFill size="28" />} text="Upgrade to Pro" />
      {/* <SidebarIcon icon={<FaPoo size="28" />} text="Poop Time ?" /> */}
      <Addserver />
      <SidebarLine />
      <Dialog />
      <SidebarIcon icon={<RiSettings3Fill size="28" />} text="Settings" />
    </div>
  );
};

export default memo(SideBar);
