(function($) {

  var socket = io.connect('http://localhost:3001');

  socket.on('newsound', function (data) {

    alert('HAI');

  });

});
