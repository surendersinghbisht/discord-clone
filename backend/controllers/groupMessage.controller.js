import Channel from "../models/channel.model.js";
import GroupMessage from "../models/groupmessage.model.js"
export const groupMessage =async(io)=> {
    
    io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);
    
      socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
      });
    
    
      socket.on('send_message', async(data) => {
        console.log('send',data)
        try {
            const groupMessage = new GroupMessage({
                sender: data.sender,
                message: data.message,
                channelId: data.channelId
            });

            const savedMessage = await groupMessage.save();

            const populatedMessage = await GroupMessage.find({channelId: savedMessage.channelId}).populate(
                "sender", "name username image"
            );


            socket.to(data.room).emit('receive_message', populatedMessage);
        } catch (error) {
            console.log(error, "error in group message cotroller");
        }    
      });
    
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
}



export const getGroupMessages = async (req, res) => {
    try {
      const { channelId } = req.params;
      const userId = req.user._id;
  
      const channel = await Channel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }
  
      const isMember = channel.members.includes(userId);
      if (!isMember) {
        return res.status(403).json({ message: "You are not a member of this channel" });
      }
  
      const messages = await GroupMessage.find({ channelId }).populate("sender", "name image");
      res.status(200).json(messages);
    } catch (error) {
      console.log(error, "error in group message controller");
      res.status(500).json({ message: "Error in getting messages." });
    }
  };
  