const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  socket.on("send-message", ({ ids, message }) => {
    ids.forEach((idNumber) => {
      const newids = ids.filter((r) => r !== idNumber);
      newids.push(id);
      socket.broadcast.to(idNumber).emit("recieve-message", {
        ids: newids,
        sender: id,
        message,
      });
    });
  });
});
