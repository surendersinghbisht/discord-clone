import Message from "../models/message.model.js";

export const messageController = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

 
    socket.on("joinRoom", (userId) => {
      console.log(`User joined room: ${userId}`);
      socket.join(userId);
    });

    
    socket.on("sendMessage", async (data) => {
      console.log("New message received:", data);

      try {

        const message = new Message({
          text: data.text,
          sender: data.sender,
          reciever: data.reciever._id, 
        });

      const savedMessage = await message.save();
        const populatedMessage = await Message.findById(savedMessage._id)
        .populate('reciever', 'name username image')
        .populate('sender', 'name username image')   
      
      console.log(populatedMessage);

        io.to(data.reciever._id).emit("receiveMessage", populatedMessage);

      } catch (error) {
        console.error(" Error saving message:", error);
      }
    });


    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });
};


export const getMessages = async(req, res)=> {
try {
  const {senderId, recieverId} = req.params;

  const messages = await Message.find({
    $or:[
      {sender: senderId, reciever: recieverId},
      {sender: recieverId, reciever: senderId}
      ]
  }).sort({createdAt: 1});

  res.status(200).json(messages);
} catch (error) {
  console.log(error,"error in message controller");
  res.status(500).json({message: "internal server error"});
}
}