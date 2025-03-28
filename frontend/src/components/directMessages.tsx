import { IUser } from "@/models/User";
import { axiosInstance } from "../../api/api";
import { FC, memo } from "react";
import { useQuery } from "@tanstack/react-query";

type DirectMessages = {};
const DirectMessages: FC<DirectMessages> = (props) => {

    const { data: friends } = useQuery<IUser[]>({
      queryKey: ["authFriends"],
      queryFn: async () => {
        try {
          const response = await axiosInstance.get("/friends/get-friends");
          return response.data;
        } catch (error) {
          throw new Error("Error fetching friends");
        }
      },
    });
    
    console.log('datas friends',friends);

  return <div>
{friends?.map((friend)=> {
   return <div key={friend._id}>
        {friend.name} {friend.username}
    </div>
})}
  </div>;
};

DirectMessages.defaultProps = {};

export default memo(DirectMessages);