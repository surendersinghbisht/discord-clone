import { IUser } from "@/models/User";
import { FC, memo, useState } from "react";
import { Button } from "./ui/button";
import { FaUserFriends } from "react-icons/fa";
import { Input } from "./ui/input";
import { axiosInstance } from "../../api/api";
import { AxiosResponse } from "axios";
import Userbatch from "./Userbatch";
import { IoIosPersonAdd } from "react-icons/io";

type FriendsSectionProps = {
  friends: IUser[] | undefined;
};

const FriendsSection: FC<FriendsSectionProps> = ({ friends }) => {
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [addFriends, setAddFriends] = useState(false);
  const [username, setUsername] = useState("");
  const [searchedUser, setSeachedUser] = useState<IUser | null>(null);
  const [findFriend, setFindFriend] = useState(false);

  const showMyFriends = (): void => {
    setShowAllFriends(true);
    setAddFriends(false);
  };

  const addingFriend = (): void => {
    setAddFriends(true);
    setShowAllFriends(false);
  };

  const findUser = async (): Promise<void> => {
    try {
      const res: AxiosResponse<IUser> = await axiosInstance.get(`/friends/find/${username}`);
      setSeachedUser(res.data);
      setFindFriend(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 w-full">
      <div className="flex items-center space-x-2 mt-4 text-xl md:text-2xl">
        <FaUserFriends className="text-white mt-1" />
        <p className="text-white font-bold font-discord">Friends</p>
      </div>

      <div className="flex flex-wrap gap-4 mt-6 text-base md:text-lg  font-discord">
        <Button onClick={showMyFriends} className="font-bold">All</Button>
        <Button onClick={addingFriend} className= "font-bold bg-discordColor">
          Add Friends
        </Button>
      </div>


      {showAllFriends && (
        <div className="mt-6">
          {friends?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {friends.map((friend, index) => (
                <div
                  key={index}
                  className="font-bold font-discord text-gray-200 text-base md:text-xl bg-[#2B2D31] p-4 rounded-xl shadow-sm"
                >
                  <h1>{friend.name}</h1>
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
                  icon={<IoIosPersonAdd />}
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

FriendsSection.defaultProps = {};

export default memo(FriendsSection);
