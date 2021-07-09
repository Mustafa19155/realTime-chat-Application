const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  socket.on("send-message", ({ names, message }) => {
    names.forEach((name) => {
      const newNames = names.filter((r) => r !== name);
      newNames.push(id);
      socket.broadcast.to(name).emit("recieve-message", {
        id: id,
        message,
      });
    });
  });
});
