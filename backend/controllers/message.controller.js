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
          reciever: data.reciever, 
        });

       
      
        const savedMessage = await message.save(); 
        console.log('saved',savedMessage)
     
        console.log('r id',data.reciever, data.senderId)
        io.to(data.reciever).emit("receiveMessage", savedMessage);

      } catch (error) {
        console.error(" Error saving message:", error);
      }
    });


    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });
};
