$(document).ready(function () {

  // Helper: remove every highlight class before applying a new one
  function clearHighlights() {
    $('.employee').removeClass('report-hl sibling-hl picked');
  }

  // 1. Click a manager -> highlight all direct reports.
  //    Reports carry data-manager="<manager id>", so an attribute selector finds them.
  $('.manager .name').on('click', function () {
    clearHighlights();
    var managerId = $(this).parent().data('id');
    $('.employee[data-manager="' + managerId + '"]').addClass('report-hl');
  });

  // 2. Hover on an employee name -> show contact info.
  //    .next() selects the .contact span immediately after the name.
  $('.employee .name').hover(
    function () { $(this).next('.contact').fadeIn(150); },
    function () { $(this).next('.contact').fadeOut(150); }
  );

  // 3. Click a department -> change background of all its members.
  //    .next('.members') is the list; .children() gives its direct <li> items.
  $('.dept-name').on('click', function () {
    $(this).siblings('.members').children().css('background-color', '#d0ebff');
  });

  // 4. Select a random employee and highlight all of its siblings (same list)
  $('#randomBtn').on('click', function () {
    clearHighlights();
    $('.members > li').css('background-color', '');      // reset colors set by step 3
    var $all = $('.employee');
    var $random = $all.eq(Math.floor(Math.random() * $all.length));
    $random.addClass('picked');
    $random.siblings().addClass('sibling-hl');           // .siblings() = other items in same <ul>
  });

  // 5. Collapse / expand a team.
  //    .parent() moves up to the department, .find('.members') goes down to its list.
  $('.collapseBtn').on('click', function () {
    $(this).parent().find('.members').slideToggle(250);
  });
});
