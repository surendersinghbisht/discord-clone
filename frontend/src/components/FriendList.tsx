export default function CreateChannelModal({ isOpen, closeModal, channelDetails }: { isOpen: boolean, closeModal: () => void,channelDetails:any }) {
//   const [channelName, setChannelName] = useState("");
console.log('asdasd',channelDetails)
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
        <div className="flex justify-between items-center">
        
         {channelDetails.members.map((member: any) => (
            <div>
                <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-400">Online - 1</span>
      </div>
      <div className=" mt-4 flex items-center space-x-2">
        <span>
            <img className="w-8 h-8 rounded-full object-cover"
             src={member.image ? member.image : '/user.jpg'}/>
        </span>
      <span className="text-white"> 
                {member.name} 
            </span>
            <span className="text-yellow-400">👑</span>
      </div>
            </div>
        ))}
        </div>
      
      </div>
    </div>
  );
}
