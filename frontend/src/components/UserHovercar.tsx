import { IUser } from "@/models/User";
import { FC, memo } from "react";

type UserHovercarProps = {
    user: IUser
};

const UserHovercar: FC<UserHovercarProps> = ({user}) => {
  return  <div className="flex justify-center items-center min-h-screen bg-gray-900">
  <div className="relative group w-80 p-4 bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 hover:bg-gray-700">
    {/* Profile Image */}
    <div className="relative w-24 h-24 mx-auto">
      <img
        src="https://via.placeholder.com/100" 
        alt="Profile"
        className="w-full h-full object-cover rounded-full border-4 border-gray-700 group-hover:border-gray-500"
      />
      <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-gray-800"></div>
    </div>

    {/* User Info */}
    <div className="text-center mt-4">
      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
      <p className="text-gray-400 text-sm">@_demi_01</p>
    </div>

    {/* Mutual Friends & Server */}
    <div className="flex justify-center gap-2 mt-3">
      <div className="flex -space-x-2">
        <img
          src="https://via.placeholder.com/30"
          className="w-8 h-8 rounded-full border border-gray-700"
        />
        <img
          src="https://via.placeholder.com/30"
          className="w-8 h-8 rounded-full border border-gray-700"
        />
      </div>
      <p className="text-gray-400 text-sm">5 Mutual Friends • 1 Mutual Server</p>
    </div>

    {/* Bio */}
    <p className="text-gray-300 text-sm mt-3 text-center">
    {user.bio}
    </p>
  </div>
</div>
};


export default memo(UserHovercar);