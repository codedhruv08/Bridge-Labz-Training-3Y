$(document).ready(function () {

  var $courses = $('.course');

  // Remember each title's original text so highlighting can be undone later
  $courses.find('h3').each(function () {
    $(this).data('original', $(this).text());
  });

  // Escape special regex characters typed by the user
  function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Filter + highlight + count; called on every keystroke
  function filterCourses() {
    var term = $.trim($('#courseSearch').val()).toLowerCase();
    var matched = 0;

    $courses.each(function () {
      var $title = $(this).find('h3');
      var original = $title.data('original');
      var isMatch = original.toLowerCase().indexOf(term) !== -1;

      // 3. Show matching courses, hide the others (.toggle(true/false))
      $(this).toggle(isMatch);

      if (isMatch) {
        matched++;
        if (term) {
          // 2. Wrap the matched text in a <span> and style it using .css()
          var regex = new RegExp('(' + escapeRegex(term) + ')', 'gi');
          $title.html(original.replace(regex, '<span class="hit">$1</span>'));
          $title.find('.hit').css({ 'background-color': 'yellow', 'font-weight': 'bold' });
        } else {
          $title.text(original);          // empty search -> plain text
        }
      }
    });

    // 4. Show count of matched courses
    $('#count').text(matched + ' of ' + $courses.length + ' courses found');
    $('#noResult').prop('hidden', matched !== 0);
  }

  // 1. Real-time filtering with .keyup()
  $('#courseSearch').keyup(filterCourses);

  // 5. Clear -> empty the input and show the full list again
  $('#clearBtn').on('click', function () {
    $('#courseSearch').val('');
    filterCourses();
  });

  filterCourses();   // initial count on page load
});
