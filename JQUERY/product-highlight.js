$(document).ready(function () {

  // 1. Click on a product -> highlight its background (only one at a time)
  $('.product').on('click', function () {
    $('.product').removeClass('highlight');
    $(this).addClass('highlight');

    // 5. Read the data-stock attribute with .data(); alert if the product is out of stock
    if ($(this).data('stock') === 0) {
      alert($(this).data('name') + ' is out of stock!');
    }
  });

  // 2. Hover -> show extra details (.hover takes mouseenter and mouseleave handlers)
  $('.product').hover(
    function () { $(this).find('.details').stop(true, true).slideDown(150); },
    function () { $(this).find('.details').stop(true, true).slideUp(150); }
  );

  // 3. Favorite icon toggles the "selected" class
  $('.fav').on('click', function (e) {
    e.stopPropagation();            // don't trigger the product's own click handler
    $(this).toggleClass('selected');
  });

  // 4. Discounted products are styled in CSS via the attribute selector .product[data-discount].
  //    Here we also use the same selector in jQuery to give them a light tint.
  $('.product[data-discount]').css('background-color', '#fff8f0');
});
