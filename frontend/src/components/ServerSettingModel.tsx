import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import toast from "react-hot-toast";

interface ServerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
}

const ServerSettingsModal: React.FC<ServerSettingsModalProps> = ({
  isOpen,
  onClose,
  groupId,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [groupTopic, setGroupTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!groupId) return;

    setLoading(true);
    axiosInstance
      .get(`/group/${groupId}`)
      .then((res) => {
        setGroupName(res.data.name);
        setGroupTopic(res.data.description);
      })
      .catch(() => toast.error("Failed to fetch group details"))
      .finally(() => setLoading(false));
  }, [groupId]);

  const query = useQueryClient();

  const { mutate: ediMutation } = useMutation({
    mutationFn: async () => {
      setLoading(true);
      await axiosInstance.put(`/group/edit-group/${groupId}`, {
        groupName,
        groupTopic,
      });
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Server details edited successfully");
      setLoading(false);
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update server");
      setLoading(false);
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: async () => {
      setLoading(true);
      await axiosInstance.delete(`/group/delete-server/${groupId}`);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["channels"] });
      toast.success("Server deleted successfully");
      setLoading(false);
      onClose();
    },
    onError: (error: any) => {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while deleting the server");
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
      }, 0);
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    if (groupName && groupTopic) {
      ediMutation();
    } else {
      toast.error("Please provide both group name and topic.");
    }
  };

  const handleDelete = () => {
    deleteMutation();
  };

  if (!isOpen || !groupId) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#2B2D31] text-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
          <span className="text-xs hidden sm:block">ESC</span>
        </button>

        <h2 className="text-2xl font-semibold mb-6">Overview</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Channel Name</label>
          <input
            name="channelName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#1E1F22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder="channel-name"
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Channel Topic</label>
          <textarea
            value={groupTopic}
            onChange={(e) => setGroupTopic(e.target.value)}
            className="w-full px-3 py-2 h-24 rounded bg-[#1E1F22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white resize-none"
            maxLength={1024}
            placeholder="Let everyone know how to use this channel!"
            disabled={loading}
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {groupTopic.length}/1024
          </div>
        </div>

        <div className="flex justify-between">
          <div
            onClick={handleDelete}
            className="flex items-center gap-4 cursor-pointer"
          >
            <span>Delete Channel</span>
            <span>
              <RiDeleteBin5Line className="mt-0.5 text-red-500" size={19} />
            </span>
          </div>

          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-400 mt-1 text-white py-1 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerSettingsModal;
