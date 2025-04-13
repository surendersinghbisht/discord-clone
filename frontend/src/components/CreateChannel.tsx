import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import toast from "react-hot-toast";

export default function CreateChannelModal({ isOpen, closeModal,groupId }: { isOpen: boolean, closeModal: () => void,groupId:string }) {
  const [channelName, setChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const query = useQueryClient();


  const { mutate: createChannel } = useMutation({
    mutationFn: async (channelName: string) => {
      setIsLoading(true);
      try {
        const name = "#"+channelName.replace(/\s+/g, '-').toLowerCase();
        await axiosInstance.post("/group/add-channel", { channelName: name, groupId });
      } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to create channel");
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      toast.success("Channel created successfully");
      query.invalidateQueries({ queryKey: ["channels"] });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create channel");
    },
  });


  if (!isOpen) return null;

  const addChannel = () => {
    if (!channelName) {
      toast.error("Channel name is required");
      return;
    }
    createChannel(channelName);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-[#2b2d31] text-white w-full max-w-xl rounded-2xl shadow-2xl p-6 font-medium space-y-5 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Channel</h2>
        </div>

        <p className="text-sm text-gray-400">in Text Channels</p>

        <div className="space-y-2">
          <label htmlFor="channelName" className="text-xs font-semibold text-white uppercase tracking-wide">
            Channel Name
          </label>
          <div className="flex items-center bg-[#1e1f22] text-gray-400 border border-[#4e5058] rounded-md px-3 py-2">
            <span className="text-gray-400 mr-2">#</span>
            <input
              id="channelName"
              type="text"
              name="channelName"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="new-channel"
              className="bg-transparent text-white w-full outline-none placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 text-sm">
          <button className="text-[#949ba4] hover:underline" onClick={closeModal}>
            Cancel
          </button>
          <button
            onClick={addChannel}
            disabled={isLoading || !channelName}
            className={`bg-[#5865f2] hover:bg-[#4752c4] text-white px-4 py-2 rounded-md font-semibold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? "Creating..." : "Create Channel"}
          </button>
        </div>
      </div>
    </div>
  );
}
