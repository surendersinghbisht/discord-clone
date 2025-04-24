import { IUser } from "@/models/User";
import { FC, memo, useState } from "react";
import { Button } from "./ui/button";
import { FaUserFriends } from "react-icons/fa";
import { Input } from "./ui/input";
import { axiosInstance } from "../../api/api";
import { AxiosResponse } from "axios";
import Userbatch from "./Userbatch";
import { IoIosPersonAdd } from "react-icons/io";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

type FriendsSectionProps = {
  friends: IUser[];
};

const FriendsSection: FC<FriendsSectionProps> = ({ friends }) => {
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [addFriends, setAddFriends] = useState(false);
  const [username, setUsername] = useState("");
  const [searchedUser, setSearchedUser] = useState<IUser | null>(null);
  const [findFriend, setFindFriend] = useState(false);
  const[requestSection, setRequestSection] = useState(false);

  const queryClient = useQueryClient();

  const { data: requests } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/request/get-requests");
        return res.data || [];
      } catch (error) {
        console.log("Error in getting friend requests:", error);
        return []; 
      }
    }
  });
  

  const { mutate: sendRequest } = useMutation({
    mutationFn: async (receiverId: string) => {
      await axiosInstance.post(`/request/send-request/${receiverId}`);
    },
    onSuccess: () => {
      toast.success("Request sent successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    }
  });

  const showMyFriends = () => {
    setShowAllFriends(true);
    setAddFriends(false);
    setRequestSection(false);
  };

  const addingFriend = () => {
    setAddFriends(true);
    setShowAllFriends(false);
    setRequestSection(false);
  };

  const handleRequestSection =()=> {
    setShowAllFriends(false);
    setAddFriends(false);
    setRequestSection(true);
  }

  const findUser = async () => {
    try {
      const res: AxiosResponse<IUser> = await axiosInstance.get(`/friends/find/${username}`);
      setSearchedUser(res.data);
      setFindFriend(true);
    } catch {
      setSearchedUser(null);
      setFindFriend(true);
    }
  };

  const sendFriendRequest = (receiverId: string) => {
    sendRequest(receiverId);
  };

 const acceptUserRequest = (requestId: string) => {
    axiosInstance.put(`/request/accept-request/${requestId}`).then(() => {
     
      toast.success("Request accepted successfully");
     queryClient.invalidateQueries({ queryKey: ["requests"] });
     queryClient.invalidateQueries({ queryKey: ["friends"] });
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 w-full">
      <div className="flex items-center space-x-2 mt-4 text-xl md:text-2xl">
        <FaUserFriends className="text-white mt-1" />
        <p className="text-white font-bold font-discord">Friends</p>
      </div>

      <div className="flex flex-wrap gap-4 mt-6 text-base md:text-lg font-discord">
        <Button onClick={showMyFriends} className="font-bold">All</Button>
        <Button onClick={addingFriend} className="font-bold bg-discordColor">
          Add Friends
        </Button>
        <Button onClick={()=> handleRequestSection()} className="font-bold">Requests</Button>
      </div>


{requestSection && (
  <div className="mt-6">
    {requests?.length > 0 ? (
      <div className="flex flex-col">
        {requests.map((request: any, index:number) => (
          <div key={index} className="mt-4">
            <Userbatch icon={<FaCheck onClick={()=>acceptUserRequest(request._id)} className="text-green-500" />} icon2={<RxCross2 className="text-red-500" />} name={request.sender.name} image={request.image} />
          </div>
        ))}
      </div>
    ) : (
      <div className="mt-6 text-white font-bold text-base sm:text-lg font-discord">
        No Friend Requests Found
      </div>
    )}
    </div>
  )}


      {showAllFriends && (
        <div className="mt-6">
          {friends?.length > 0 ? (
            <div className="flex flex-col">
              {friends.map((friend, index) => (
                <div key={index} className="mt-4">
                  <Userbatch name={friend.name} image={friend.image} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 text-white font-bold text-base sm:text-lg font-discord">
              No Friends Found... You can add some from the Add Friends section!
            </div>
          )}
        </div>
      )}

      {addFriends && (
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
            <Input
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#2B2D31] w-full sm:w-72 md:w-80 border-none outline-none placeholder:text-white text-white font-bold font-discord"
            />
            <Button onClick={findUser}>Search</Button>
          </div>

          {findFriend && (
            searchedUser ? (
              <div className="text-white font-discord font-bold text-base sm:text-xl">
                <Userbatch
                  name={searchedUser.name}
                  icon={<IoIosPersonAdd onClick={() => sendFriendRequest(searchedUser._id)} />}
                />
              </div>
            ) : (
              <p className="text-white font-discord font-bold text-base sm:text-lg">
                User Not Found
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default memo(FriendsSection);
