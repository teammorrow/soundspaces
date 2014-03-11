var express = require('express'),
  partials = require('express-partials'),
  http = require('http'),
  path = require('path'),
  app = express(),
  pkg = require(__dirname + '/../package.json'),
  server = app.listen(process.env.PORT || 3001),
  io = require('socket.io').listen(server);

app.configure(function () {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(partials());
  app.use(express.favicon());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'web')));
  app.use(express.static(path.join(__dirname, 'components')));
  app.use(require('less-middleware')({
    src: path.join(__dirname, 'web')
  }));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index', {
    version: pkg.version
  });
});

/*app.get('/help', function(req, res) {
  res.render('help');
});*/

app.get('/listen/:roomKey', function(req, res) {
  var roomKey = req.params.roomKey;

  res.render('listen', {
    roomKey: roomKey,
    version: pkg.version
  });
});

app.post('/play/:roomKey', function(req, res) {
  var moment = require('moment'),
    payload = req.body,
    roomKey = req.params.roomKey;

  if (typeof payload.sound == 'undefined') {
    res.status(404);
    res.send({err: 'Missing sound name.'});
    res.send();
    return;

  } else if (typeof payload.url == 'undefined') {
    res.status(404);
    res.send({err: 'Missing sound URL.'});
    res.send();
    return;
  }

  io.sockets.emit('newsound/' + roomKey, {
    play: {
      sound: payload.sound,
      url: payload.url,
      timestamp: moment().format('l, h:mm:ss a'),
      author: (typeof payload.author != 'undefined') ? payload.author : 'Unknown'
    }
  });

  res.end();
});
