(function($) {
  $('.jumbotron .buttons').on('click', '.btn.create', function () {
    $('.buttons').hide();
    $('form.create').removeClass('hidden');
  });

  $('.jumbotron').on('submit', 'form.create', function (e) {
    e.preventDefault();

    var roomName = $(this).find('#roomName').val();
    if (roomName == '') {
      $(this).find('.form-group').addClass('has-error');
      $(this).find('.text-danger').removeClass('hidden');
      return false;
    } else {
      $(this).find('.form-group').removeClass('has-error');
      $(this).find('.text-danger').addClass('hidden');
    }

    window.location = '/listen/' + roomName;
    return false;
  });

  $('.jumbotron .buttons').on('click', '.btn.join', function () {
    $('.buttons').hide();
    $('form.join').removeClass('hidden');
  });

  $('.jumbotron').on('submit', 'form.join', function (e) {
    e.preventDefault();

    var roomKey = $(this).find('#roomKey').val();
    if (roomKey == '') {
      $(this).find('.form-group').addClass('has-error');
      $(this).find('.text-danger').removeClass('hidden');
      return false;
    } else {
      $(this).find('.form-group').removeClass('has-error');
      $(this).find('.text-danger').addClass('hidden');
    }

    window.location = '/listen/' + roomKey;
    return false;
  });
})(jQuery);
