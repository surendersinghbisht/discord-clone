import { IUser } from "@/models/User";
import { useQuery } from "@tanstack/react-query";

export default function CreateChannelModal({ isOpen, closeModal, channelDetails }: { isOpen: boolean, closeModal: () => void, channelDetails: any }) {
  const { data: authUser } = useQuery<IUser>({
    queryKey: ['authUser']
  });

 
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 h-auto flex items-center justify-center p-4">
      <div className="bg-[#2b2d31] text-white w-full max-w-xl rounded-2xl shadow-2xl p-6 font-medium space-y-5 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
        <h1 className="text-xl">Members</h1>
        <div className="space-y-4">
          {channelDetails.members.map((member: any, index: number) => (
            <div key={index}>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={member.image || '/user.jpg'}
                  alt={member.name}
                />
                <span className="text-white">{member.name}</span>
                {authUser?._id === member._id && (
                  <span className="text-yellow-400">👑</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
