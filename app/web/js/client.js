var socket = io.connect('//'),
  roomKey = $('#sounds').data('roomKey');

// retrieve saved volume from localstorage
var localVol = localStorage.volume || 1,
    slider = document.getElementById('fader');

if (localVol != 1) {
  slider.value = localVol;
}

var saveVolume = function() {
  console.log('save', slider.value);
  localStorage.volume = slider.value;
};

slider.addEventListener('change', saveVolume);

socket.on('newsound/' + roomKey, function (data) {
  if ($('#loading').length == 1) {
    $('#loading').remove();
  }

  var sound = $('#sounds .sound.hidden').clone(),
    audio = sound.find('audio');

  audio.attr('src', data.play.url);
  audio.attr('controls', '');
  audio.attr('autoplay', '');
  audio.volume = slider.value;

  sound.find('.sound-name').text(data.play.sound);
  sound.find('.sound-data time').text(data.play.timestamp);
  sound.removeClass('hidden');

  console.log(sound);

  sound.prependTo('#sounds');

  $('#sounds .sound:not(.hidden):not(:first)').addClass('grayed');
});
