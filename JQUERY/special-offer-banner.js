$(document).ready(function () {

  // Returns the banner(s) chosen in the dropdown (one banner or all of them)
  function getTarget() {
    var v = $('#target').val();
    return v === 'all' ? $('.banner') : $('#' + v);
  }

  // 1-4. One handler for all control buttons; data-action tells us which effect to run
  $('button[data-action]').on('click', function () {
    var $t = getTarget();
    switch ($(this).data('action')) {
      case 'hide':      $t.hide(); break;           // instantly hide
      case 'show':      $t.show(); break;           // instantly show
      case 'slideUp':   $t.slideUp(400); break;     // collapse upward
      case 'slideDown': $t.slideDown(400); break;   // expand downward
      case 'fadeOut':   $t.fadeOut(600); break;     // fade to invisible
      case 'fadeIn':    $t.fadeIn(600); break;      // fade back in
    }
  });

  // 5. Auto-rotate banners every 5 seconds using fadeOut() then fadeIn()
  var $slides = $('#rotator .slide');
  var current = 0;
  $slides.eq(current).show();                    // show the first slide

  setInterval(function () {
    var $old = $slides.eq(current);
    current = (current + 1) % $slides.length;       // loop back to first after the last
    var $next = $slides.eq(current);
    // fade the old slide out, and when finished, fade the next one in
    $old.fadeOut(500, function () {
      $next.fadeIn(500);
    });
  }, 5000);
});
