var socket = io.connect('http://localhost:3002');

socket.on('newsound', function (data) {

  var audio = document.createElement('audio');
  audio.setAttribute('src', data.sound.sound_url);
  audio.setAttribute('controls', '');
  audio.setAttribute('autoplay', '');

  var p = document.createElement('p');
  p.innerHTML = data.sound.sound_name + ' &mdash; ';

  var time = document.createElement('time');
  time.innerHTML = data.sound.date;

  var li = document.createElement('li');

  li.appendChild(audio);
  p.appendChild(time);
  li.appendChild(p);

  document.getElementById('sounds').appendChild(li);

});
