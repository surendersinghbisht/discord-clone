import { ChangeEvent, FC, memo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsPlus } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../../api/api"

type AddServerProps = {};

const AddServer: FC<AddServerProps> = () => {
  type SidebarIconProps = {
    icon: any;
    text?: string;
  };

  const SidebarIcon: FC<SidebarIconProps> = ({ icon, text = "Tooltip" }) => (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );

  

  const [serverDetails, setServerDetails] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setServerDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const query = useQueryClient()

  
  const { mutate: addServerMutation, isPending } = useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
        console.log(data)
      const res = await axiosInstance.post("/group/create-group", data);
      return res.data;
    },
    onSuccess: () => {
        toast.success("Server created successfully!")
        query.invalidateQueries({queryKey:["groups"]})
    },
    onError: (error: any) =>
      toast.error(error.response?.data.message || "Something went wrong"),
  });

  const addServer = () => {
    if (!serverDetails.name.trim() || !serverDetails.description.trim()) {
      toast.error("Server name and description are required!");
      return;
    }
    addServerMutation(serverDetails);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <SidebarIcon icon={<BsPlus size="28" />} text="Add Server" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Server</DialogTitle>
            <DialogDescription className="text-gray-200">
              Enter details and add a new server... Yep, it's that easy!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Server Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your server name"
                className="col-span-3  border border-gray-600 bg-[#2B2D31] rounded-lg"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Server description"
                className="col-span-3 bottom-0  border border-gray-600 bg-[#2B2D31] rounded-lg"
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-discordColor" onClick={addServer} disabled={isPending}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default memo(AddServer);
