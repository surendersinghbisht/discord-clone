import { IUser } from "@/models/User";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const SettingsPage = () => {
  const { data: authUser } = useQuery<IUser>({
    queryKey: ["authUser"],
  });

const[editName, setEditName] = useState(false);
const[editUsername, setEditUsername] = useState(false);


  return (
    <div className="min-h-screen bg-gray-900 w-full text-white flex justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-2xl font-semibold text-center sm:text-left">
          My Account
        </h2>

        <div className="flex border-b border-gray-700 mt-4"></div>

        {/* Cover Image */}
        <div className="relative bg-teal-400 rounded-lg mt-6 h-24"></div>

        {/* Profile Section */}
        <div className="sm:justify-between relative flex flex-col sm:flex-row items-center sm:items-start -mt-10 px-4 sm:px-6">
          <div className="sm:flex">
         {authUser?.image ? <img
            className="w-20 h-20 rounded-full border-4 border-gray-900"
            src={authUser?.image}
            alt="Profile"
          /> : 
          <img
          className="w-20 h-20 rounded-full border-4 border-gray-900"
          src="/user.jpg"
          alt="Profile"
        />
          }
          <div className="sm:ml-4 text-center sm:text-left mt-4 sm:mt-0">
            <h3 className="text-xl font-semibold">{authUser?.name}</h3>
          </div>
          </div>
          <div className="sm:mt-16">
          <button className="mt-4 sm:mt-0 sm:ml-auto bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
            Edit User Profile
          </button>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-gray-700 mt-6 p-4 sm:p-6 rounded-lg">
          {/* Display Name */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-600 pb-3">
            <div>
              <p className="text-gray-400 text-sm">Display Name</p>
              <p className="truncate">{authUser?.name}</p>
            </div>
            <button className="mt-2 sm:mt-0 bg-gray-600 px-4 py-1 rounded text-sm">
              Edit
            </button>
          </div>

          {/* Username */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-600 py-3">
            <div>
              <p className="text-gray-400 text-sm">Username</p>
              <p className="truncate">{authUser?.username}</p>
            </div>
            <button className="mt-2 sm:mt-0 bg-gray-600 px-4 py-1 rounded text-sm">
              Edit
            </button>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-600 py-3">
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="flex items-center truncate">
                *******************@gmail.com

              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3">
            <div>
              <p className="text-gray-400 text-sm">Phone Number</p>
              <p className="text-gray-400">You haven't added a phone number yet.</p>
            </div>
            <button className="mt-2 sm:mt-0 bg-gray-600 px-4 py-1 rounded text-sm">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
