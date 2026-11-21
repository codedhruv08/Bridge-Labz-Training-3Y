// 5. jQuery.noConflict(true) hands back the version that was loaded last and
//    restores the previously loaded jQuery to the global $ / jQuery.
//    Load order in HTML: 1.12.4 first, 3.7.1 second.
var $v2 = jQuery.noConflict(true);   // jQuery 3.7.1 -> restores global jQuery to 1.12.4
var $v1 = jQuery.noConflict(true);   // jQuery 1.12.4 -> restores whatever was there before

// Show that both versions are alive at the same time
$v1(function () {
  $v1('#versions').text('Version 1 = ' + $v1.fn.jquery + ' | Version 2 = ' + $v2.fn.jquery);
});

/* ---------- VERSION 1 (1.12.4): carousel rotation + active widget highlight ---------- */
$v1(document).ready(function () {

  // 1. Carousel: fade one slide out and the next one in every 3 seconds
  var $slides = $v1('.cslide');
  var current = 0;
  $slides.eq(0).show();

  setInterval(function () {
    var $old = $slides.eq(current);
    current = (current + 1) % $slides.length;
    $old.fadeOut(400, function () { $slides.eq(current).fadeIn(400); });
  }, 3000);

  // 3. Highlight the active widget when it is clicked
  $v1('.widget').on('click', function () {
    $v1('.widget').removeClass('active');
    $v1(this).addClass('active');
  });
});

/* ---------- VERSION 2 (3.7.1): modal popup + tooltips ---------- */
$v2(document).ready(function () {

  // 2. Modal popup for notifications
  $v2('#openModal').on('click', function (e) {
    e.stopPropagation();             // keep the widget click from firing
    $v2('#modalOverlay').fadeIn(200);
  });
  $v2('#closeModal').on('click', function () {
    $v2('#modalOverlay').fadeOut(200);
  });
  // Clicking the dark overlay (not the box) also closes the modal
  $v2('#modalOverlay').on('click', function (e) {
    if (e.target === this) { $v2(this).fadeOut(200); }
  });

  // 4. Tooltips: read the data-tip attribute and show it next to the mouse
  $v2('.tip').on('mouseenter', function () {
    $v2('#tooltip').text($v2(this).data('tip')).show();
  }).on('mousemove', function (e) {
    $v2('#tooltip').css({ top: e.pageY + 14, left: e.pageX + 14 });
  }).on('mouseleave', function () {
    $v2('#tooltip').hide();
  });
});
