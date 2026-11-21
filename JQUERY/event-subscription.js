$(document).ready(function () {

  // 5. Build a success message, insert it into the DOM, then remove it after 2.5 seconds
  function showMessage(text) {
    $('<p class="msg"></p>').text(text).appendTo('#messages')
      .delay(2500).fadeOut(400, function () { $(this).remove(); });
  }

  // Attach the click handlers (.on) to the buttons of ONE topic row.
  // Used for existing rows and for rows created later.
  function bindTopic($row) {
    var title = $row.find('.title').text();

    // 1. Subscribe -> enable notifications
    $row.find('.sub').on('click', function () {
      $row.find('.status').addClass('on').text('Notifications ON');
      $row.find('.sub').prop('disabled', true);
      $row.find('.unsub').prop('disabled', false);
      showMessage('Subscribed to "' + title + '". Notifications enabled.');
    });

    // 2. Unsubscribe -> disable notifications
    $row.find('.unsub').on('click', function () {
      $row.find('.status').removeClass('on').text('Notifications OFF');
      $row.find('.unsub').prop('disabled', true);
      $row.find('.sub').prop('disabled', false);
      showMessage('Unsubscribed from "' + title + '". Notifications disabled.');
    });

    // 4. Remove -> detach the handlers with .off() first, then delete the row
    $row.find('.remove').on('click', function () {
      $row.find('.sub, .unsub').off('click');   // detach subscribe/unsubscribe events
      $row.fadeOut(250, function () { $row.remove(); });
      showMessage('Removed topic "' + title + '".');
    });
  }

  // Bind the rows already on the page
  $('.topic').each(function () { bindTopic($(this)); });

  // 3. Dynamically add a new topic, then attach .on() click events to its new buttons
  $('#addTopic').on('click', function () {
    var name = $.trim($('#newTopic').val());
    if (!name) { alert('Please enter a topic name.'); return; }

    var $row = $(
      '<li class="topic">' +
        '<span class="title"></span>' +
        '<span class="status">Notifications OFF</span>' +
        '<button class="sub">Subscribe</button>' +
        '<button class="unsub" disabled>Unsubscribe</button>' +
        '<button class="remove">Remove</button>' +
      '</li>'
    );
    $row.find('.title').text(name);   // .text() keeps user input safe from HTML injection
    $('#topicList').append($row);
    bindTopic($row);                   // new elements need handlers attached manually
    $('#newTopic').val('');
    showMessage('Added new topic "' + name + '".');
  });
});
