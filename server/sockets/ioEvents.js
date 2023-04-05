const ioEvents = (io) => {
  var socketIds = {};
  var usersInOnline = [];

  io.on("connection", (socket) => {
    socket.on("join", (id) => {
      console.log("s--s>>>>>>>>>>>>>>>join>>>.", id)
      socketIds[socket.id] = id;
      usersInOnline.push(id);
      socket.join(id); // We are using room of socket io
    });

    socket.on("sendEvent", (msg) => {
      if (!socketIds[socket.id] || !msg.type) return;
      switch (msg.type) {
        case 'gameState':
          if (msg.opponentId && msg.opponentId !== socketIds[socket.id])
            io.to(msg.opponentId).emit("receiveEvent", msg);
          break;
        case 'gameStarted':
          console.log("s--ss>>>>>>>>>>>>>msgggg>>>>",msg)
          msg.players.forEach((id) => {
            io.to(id).emit("receiveEvent", msg);
          });
          break;


        // case 'joinGame':
        //   msg.players.forEach((id) => {
        //     io.to(id).emit("receiveEvent", {
        //       type: 'joinedGame',
        //       matchId: msg.matchId,
        //       newUserId: msg.newUserId,
        //     });
        //   });
        //   break;

        // case 'gameState':
        // console.log("S-s-s>>>>>>>>>>>>>>receiveEvent", msg)
        // let matchEnd = false;
        // for (const playerId of msg.players) {
        // try {
        //   let ended = ['WON', 'LOST'].includes(msg.gameState?.state) && msg.playerId === playerId
        //   if (!matchEnd && ended) matchEnd = true
        //   if (matchEnd) {
        //     Players.findOneAndUpdate({ _id: playerId }, { $inc: { score: ended ? -10 : 10 }} ).exec();
        //   }
        //   if( msg.gameState?.state === 'LOST') console.log('-s-s>>>>>>>>>>>>>>>>>>>lossst>', msg.players.find((p) => p !== msg.playerId))
        //   Matches.findOneAndUpdate({ _id: msg.matchId, status: { $ne: 'COMPLETED' } }, { status: msg.gameState?.state === 'LOST' ? 'COMPLETED' : msg.gameState?.state, winner: msg.gameState?.state === 'LOST' ? msg.players.find((p) => p !== msg.playerId) : null }).exec();
        // } catch (err) {
        //   console.log("s-s->>>>>>>>>>>>>>>>Err", err)
        // }
        //   if (playerId !== socketIds[socket.id])
        //     io.to(playerId).emit("receiveEvent", msg);
        // // };
        // break;
       
        // case 'gameOver':
        //   msg.players.forEach((id) => {
        //     io.to(id).emit("receiveEvent", {
        //       type: 'gameOver',
        //       matchId: msg.matchId,
        //       state: msg.state
        //     });
        //   });
        //   break;
        default:
          break;
      }
      // io.to(id).emit("typing", {
      //   channelId: data.channelId,
      //   userId: data.userId,
      // });

    });
  });
};

module.exports = ioEvents;
