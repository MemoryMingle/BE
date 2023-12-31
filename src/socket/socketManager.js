module.exports = function (io) {
  console.log("소켓 연결 완료");
  const userSockets = {}; // userId와 socketId를 매핑하는 객체

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('error', (error) => {
      console.log('Socket Error:', error);
    });
    
    socket.on("register", (userId) => {
      userSockets[userId] = socket.id; // userId와 socket.id를 연결
      console.log("아이디 연결 확인", userSockets);
    });

    socket.on("disconnect", () => {
      // 연결이 끊어진 socket.id를 찾아서 삭제
      for (const userId in userSockets) {
        if (userSockets[userId] === socket.id) {
          delete userSockets[userId];
          break;
        }
      }
    });
  });

  // 이 함수는 특정 유저에게 소켓 이벤트를 발송합니다.
  io.emitToUser = function(userId, event, data) {
    const socketId = userSockets[userId];
    if (socketId) {
      io.to(socketId).emit(event, data);
    }else{console.log("소켓 아디디 없음")}
  };
};

