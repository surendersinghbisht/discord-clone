import { Input } from "@/components/ui/input";
import { IUser } from "@/models/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiLogOut, FiCamera } from "react-icons/fi";
import { axiosInstance } from "../../api/api";

const SettingsPage = () => {
  const { data: authUser } = useQuery<IUser>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });

  const query = useQueryClient();
  console.log('authUser:', authUser);

  const { mutate: editMutation } = useMutation({
    mutationFn: async (data: FormData) => {
      console.log('ad',data)
      const res = await axiosInstance.put("/user/editProfile", data, {
        headers: { "Content-Type": "multipart/form-data" }, 
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Details edited successfully");
      query.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => toast.error("Error, try again later"),
  });
  

  // const { mutate: updateImageMutation } = useMutation({
  //   mutationFn: async (imageData: FormData) => {
  //     const res = await axiosInstance.post("/user/uploadProfileImage", imageData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     toast.success("Profile image updated successfully");
  //     query.invalidateQueries({ queryKey: ["authUser"] });
  //   },
  //   onError: () => toast.error("Error updating image. Try again later."),
  // });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const [editing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<{ name: string; username: string; image: File | null }>({
    name: authUser?.name || "",
    username: authUser?.username || "",
    image: null,
  });

  useEffect(() => {
    if (authUser?.image) {
      setImagePreview(authUser?.image);
    }
  }, [authUser?.image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const formData = new FormData();
  
    // Append the image if it exists
    if (image) {
      formData.append("image", image);
    }
  
    // Append the name and username
    formData.append("name", editedData.name);
    formData.append("username", editedData.username);
  
    // Call mutation with the form data
    editMutation(formData); 
    setIsEditing(false);
  };
  

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logged out successfully");
      query.removeQueries({ queryKey: ["authUser"] });
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out. Try again.");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  return (
    <div className="h-full min-h-screen overflow-y-auto font-discord font-bold bg-custombg w-full text-white flex justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-[#121214] rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-2xl font-semibold text-center sm:text-left">My Account</h2>
        <div className="flex border-b border-gray-700 mt-4" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 space-y-4 sm:space-y-0 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-4">
            <div className="relative w-20 h-20 shrink-0 mx-auto sm:mx-0">
              <img
                className="w-20 h-20 rounded-full border-4 border-gray-900 object-cover"
                src={imagePreview || authUser?.image || "/user.jpg"}
                alt="Profile"
              />
              {editing && (
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-black p-1.5 rounded-full cursor-pointer hover:bg-opacity-90 z-10"
                >
                  <FiCamera className="text-white w-4 h-4" />
                  <input
                    id="profileImage"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold">{authUser?.name}</h3>
            </div>
          </div>

          <div className="flex justify-center sm:justify-end">
            {editing ? (
              <button
                onClick={handleSave}
                className="text-sm sm:mt-14 bg-discordColor hover:bg-indigo-600 text-white px-4 py-1 rounded"
              >
                Save User Profile
              </button>
            ) : (
              <button
                onClick={handleEditing}
                className="text-sm sm:mt-14 bg-discordColor hover:bg-indigo-600 text-white px-4 py-1 rounded"
              >
                Edit User Profile
              </button>
            )}
          </div>
        </div>

        <div className="bg-[#1A1A1E] mt-6 p-4 sm:p-6 rounded-lg space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="w-full sm:w-auto">
              <p className="text-white text-md">Display Name</p>
              {editing ? (
                <Input name="name" value={editedData.name} onChange={handleChange} />
              ) : (
                <p className="truncate text-lg text-gray-400">{authUser?.name}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="w-full sm:w-auto">
              <p className="text-white text-md">Username</p>
              {editing ? (
                <Input name="username" value={editedData.username} onChange={handleChange} />
              ) : (
                <p className="truncate text-lg text-gray-400">{authUser?.username}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <p className="text-white text-md">Email</p>
              <p className="truncate text-lg text-gray-400">{authUser?.email}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3">
            <button
              onClick={logout}
              className="h-8 hover:bg-red-400 space-x-8 bg-red-500 text-white font-bold px-4 flex items-center py-1 rounded text-sm"
            >
              Logout <FiLogOut className="ml-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
