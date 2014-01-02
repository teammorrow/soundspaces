// (function() {

  var socket = io.connect('http://localhost:3001');

  console.log(socket, 'socket');

  socket.on('newsound', function (data) {

    console.log('HAI');

  });

// });
