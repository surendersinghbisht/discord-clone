
const AddFriend = () => {
  return (
    <div className="bg-[#1e1f22] text-white p-6 md:p-8 rounded-lg w-full max-w-4xl mx-auto mt-10 relative">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
       
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-1">Add Friend</h2>
          <p className="text-sm md:text-base text-gray-400 mb-4">
            You can add friends with their Discord username.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch bg-[#1a1b1e] rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="You can add friends with their Discord username."
              className="w-full px-4 py-3 text-sm text-gray-300 bg-transparent placeholder-gray-500 outline-none"
            />
            <button className="bg-[#5865f2] text-white font-semibold text-sm px-4 py-2 sm:rounded-none sm:rounded-r-md hover:bg-[#4752c4] transition">
              Send Friend Request
            </button>
          </div>
        </div>

        
        <div className="mt-6 md:mt-0 md:ml-6 hidden md:block">
          <img
            src="/discord-bot.png"
            alt="Discord Bot"
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
