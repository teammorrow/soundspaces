var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express(),
  server = app.listen(process.env.PORT || 3001),
  io = require('socket.io').listen(server),
  moment = require('moment');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'web') }));
app.use(express.static(path.join(__dirname, 'web')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', { title: 'soundspac.es' });
});

app.post('/play', function (req, res) {
  var payload = req.body;

  if (typeof payload.sound == 'undefined') {
    res.status(404);
    res.send({err: 'Missing sound name.'});
    res.send();
    return;

  } else if (typeof payload.url == 'undefined') {
    res.status(404);
    res.send({err: 'Missing sound name.'});
    res.send();
    return;
  }

  console.log(payload);

  io.sockets.emit('newsound', {
    play: {
      sound: payload.sound,
      url: payload.url,
      timestamp: moment().format('l, h:mm:ss a'),
      author: (typeof payload.author != 'undefined') ? payload.author : 'Unknown'
    }
  });

  res.end();
});
