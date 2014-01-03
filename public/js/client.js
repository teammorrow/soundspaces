var socket = io.connect('http://localhost:3002');

socket.on('newsound', function (data) {

  // create the audio element and metadata children
  var audio = document.createElement('audio');
  audio.setAttribute('src', data.sound.sound_url);
  audio.setAttribute('controls', '');
  audio.setAttribute('autoplay', '');

  var p = document.createElement('p');
  p.innerHTML = data.sound.sound_name + ' &mdash; ';

  var time = document.createElement('time');
  time.innerHTML = data.sound.date;

  var li = document.createElement('li');

  // append everything to the dom
  li.appendChild(audio);
  p.appendChild(time);
  li.appendChild(p);

  var ul = document.getElementById('sounds');
  var first = ul.firstChild;
  ul.insertBefore(li, first);

  // gray out old sounds
  if (first != null) {
    first.className = 'grayed';
  }

});
