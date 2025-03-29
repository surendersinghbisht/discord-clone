import Message from "../models/message.model.js";

export const messageController = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join user to their unique room
    socket.on("joinRoom", (userId) => {
      console.log(`User joined room: ${userId}`);
      socket.join(userId);
    });

    // Handling message sending
    socket.on("sendMessage", async (data) => {
      console.log("📩 New message received:", data);

      try {
        const message = new Message({
          text: data.text,
          sender: data.senderId,
          receiver: data.receiverId, // Ensure correct field names
        });
        const savedMessage = await message.save(); // ✅ Ensure message is stored

        const receiverSockets = io.sockets.adapter.rooms.get(data.receiverId);

        if (receiverSockets) {
          io.to(data.receiverId).emit("receiveMessage", savedMessage);
          console.lo('ddd',savedMessage)
        }

      } catch (error) {
        console.error("❌ Error saving message:", error);
      }
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });
};
