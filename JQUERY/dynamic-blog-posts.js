$(document).ready(function () {

  var counter = 5;   // number of posts so far (used to name new posts)

  // Build a new post element
  function createPost(title, extraClass) {
    return $('<article class="post"></article>').addClass(extraClass || '')
      .append($('<h3></h3>').text(title))
      .append('<p>This is a newly added post.</p>');
  }

  // Event delegation: works for posts that are added later too
  $('#postList').on('click', '.post', function () {
    $('.post').removeClass('selected');
    $(this).addClass('selected');
  });

  // Returns the selected post, or the last post if none is selected
  function getSelected() {
    var $s = $('.post.selected');
    return $s.length ? $s : $('#postList .post').last();
  }

  // 1. Add New Post -> .append() puts it at the END of the list
  $('#addPost').on('click', function () {
    counter++;
    $('#postList').append(createPost('New Blog Post #' + counter));
  });

  // 2. Prepend Featured Post -> .prepend() puts it at the TOP of the list
  $('#prependPost').on('click', function () {
    counter++;
    $('#postList').prepend(createPost('Featured Post #' + counter, 'featured'));
  });

  // 3. Remove Last Post -> :last selects the final post, .remove() deletes it
  $('#removeLast').on('click', function () {
    $('#postList .post:last').remove();
  });

  // 4a. Tag placed BEFORE the title using .before()
  $('#tagBefore').on('click', function () {
    var text = $.trim($('#tagText').val());
    if (text) { getSelected().find('h3').before($('<span class="tag"></span>').text(text)); }
  });

  // 4b. Tag placed AFTER the content using .after()
  $('#tagAfter').on('click', function () {
    var text = $.trim($('#tagText').val());
    if (text) { getSelected().find('p').after($('<span class="tag after-tag"></span>').text(text)); }
  });

  // 5. Highlight posts whose text contains the keyword
  $('#highlightBtn').on('click', function () {
    var word = $.trim($('#keyword').val()).toLowerCase();
    $('.post').removeClass('keyword-hit');
    if (!word) { return; }
    $('.post').filter(function () {
      return $(this).text().toLowerCase().indexOf(word) !== -1;
    }).addClass('keyword-hit');
  });

  $('#resetBtn').on('click', function () {
    $('.post').removeClass('keyword-hit');
    $('#keyword').val('');
  });
});
