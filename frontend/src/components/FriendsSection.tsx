import { IUser } from "@/models/User";
import { FC, memo, useState } from "react";
import { Button } from "./ui/button";
import { FaUserFriends } from "react-icons/fa";
import { Input } from "./ui/input";
import { axiosInstance } from "../../api/api";
import { AxiosResponse } from "axios";
import Userbatch from "./Userbatch";
import { IoIosPersonAdd } from "react-icons/io";
import DiscordMessageInput from "./DiscordMessageInput";

type FriendsSectionProps = {
    friends: IUser[] | undefined
};

const FriendsSection: FC<FriendsSectionProps> = ({friends}) => {

    const[showAllFriends, setShowAllFriends] = useState(false);
    const[addFriends, setAddFriends] = useState(false);

const showMyFriends =():void=> {
setShowAllFriends(true);
setAddFriends(false);
}


const addingFriend =():void=> {
setAddFriends(true);
setShowAllFriends(false);
}

const[username, setUsername ] = useState("");
const[searchedUser, setSeachedUser] = useState<IUser | null>(null);
const[findFriend, setFindFriend] = useState(false);

const findUser = async (): Promise<void> => {
    try {
      const res: AxiosResponse<IUser> = await axiosInstance.get(`/friends/find/${username}`);
      setSeachedUser(res.data);
      setFindFriend(true)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  return( 
  <div className="p-10">
    <div className="flex space-x-2 m-4">
    <FaUserFriends className="text-white font-bold mt-1" />
    <p className="text-white font-bold">Friends</p>
    </div>
    <div className="flex space-x-6 font-bold text-lg font-discord">
        <Button onClick={showMyFriends} className="font-bold">All</Button>
        <Button onClick={addingFriend} className="font-bold bg-violet-600">Add Friends</Button>
        </div>
    {showAllFriends && (friends?.length > 0 ? friends?.map((friend)=>{
        return (
            <div className="font-bold font-discord text-gray-200 mt-8 text-xl">
                 <h1>{friend.name}</h1> 
            </div>
        )
    }) : <div className="font-discord font-xl font-bold mt-6 text-white">No Friends Found .... you can add some friends from Add friends section!</div>)}
    {addFriends && <div className="mt-6 flex space-y-8 flex-col">
        <div className="flex space-x-2">
        <Input
        placeholder="Enter Username"
        value={username} 
        onChange={(e)=>setUsername(e.target.value)}
          className="bg-[#2B2D31]  border-none outline-none w-auto sm:w-80 placeholder:text-white font-bold border-gray-700 text-white font-discord"
        />
        <Button onClick={findUser}>Search</Button>
        </div>
      {
        findFriend ? (
            searchedUser ? <p className="text-xl font-discord font-bold text-white"><Userbatch name={searchedUser.name}
            icon={<IoIosPersonAdd />}
            /></p>
            : <p className="text-lg font-discord font-bold text-white">User Not Found</p>
        ) : null
      }
        
        </div>
        }
  </div>
)};

FriendsSection.defaultProps = {};

export default memo(FriendsSection);