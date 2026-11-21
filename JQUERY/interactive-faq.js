$(document).ready(function () {

  // 1. Click on a question -> toggle its answer (.next() = the answer div right after it)
  $('.question').on('click', function () {
    $(this).next('.answer').slideToggle(200);
  });

  // 2. Hover -> change question text color
  $('.question').hover(
    function () { $(this).addClass('q-hover'); },
    function () { $(this).removeClass('q-hover'); }
  );

  // 3. Double-click a question -> collapse ALL answers
  $('.question').on('dblclick', function () {
    $('.answer').slideUp(200);
  });

  // 4. Focus on the input inside an answer -> highlight the parent question
  //    .closest('.faq-item') climbs up to the FAQ item, .find() goes back down to its question
  $('.answer input').on('focus', function () {
    $(this).closest('.faq-item').find('.question').addClass('q-active');
  });

  // 5. Blur (leave the input) -> reset the question's background color
  $('.answer input').on('blur', function () {
    $(this).closest('.faq-item').find('.question').removeClass('q-active');
  });
});
