import Message from "../models/message.model.js";

export const messageController = (io) => {

io.on("connection",(uniqueSocket)=> {
    console.log(uniqueSocket,"user connected");

    uniqueSocket.on("sendMessage", async (data)=> {
        console.log('data');

        try {
            const message = new Message({
                text: data.text,
                sender: data.senderId,
                reciever: data.reciever
            })

            message.save();

            io.to(data.recieverId).emit(message);
        } catch (error) {
            console.error("Error saving message:", error);
        }

        socket.on("disconnect", () => {
            console.log(` User Disconnected: ${socket.id}`);
          });
    })
})
}