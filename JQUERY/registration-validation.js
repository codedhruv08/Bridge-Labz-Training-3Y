$(document).ready(function () {

  // Emails that already exist (stands in for a database lookup)
  var existingEmails = ['admin@example.com', 'test@example.com', 'user@example.com'];

  // Mark a field invalid: red border via .css() + error text
  function setInvalid($field, $err, message) {
    $field.css('border', '2px solid red');
    $err.text(message);
    return false;
  }

  // Mark a field valid: green border, clear error text
  function setValid($field, $err) {
    $field.css('border', '2px solid green');
    $err.text('');
    return true;
  }

  // 1. Name must not be empty
  function validateName() {
    var $f = $('#name'), $e = $('#nameErr');
    return $.trim($f.val()) === '' ? setInvalid($f, $e, 'Name is required.') : setValid($f, $e);
  }

  // 2. Email must have a valid format AND must not already exist
  function validateEmail() {
    var $f = $('#email'), $e = $('#emailErr');
    var value = $.trim($f.val()).toLowerCase();
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;          // simple email regex
    if (!pattern.test(value)) { return setInvalid($f, $e, 'Enter a valid email address.'); }
    if ($.inArray(value, existingEmails) !== -1) { return setInvalid($f, $e, 'This email is already registered.'); }
    return setValid($f, $e);
  }

  // 3. Password needs at least 8 characters
  function validatePassword() {
    var $f = $('#password'), $e = $('#passErr');
    return $f.val().length < 8 ? setInvalid($f, $e, 'Password must be at least 8 characters.') : setValid($f, $e);
  }

  // Validate each field as soon as the user leaves it
  $('#name').on('blur', validateName);
  $('#email').on('blur', validateEmail);
  $('#password').on('blur', validatePassword);

  // 4. On submit run every check; show the success message only if all pass
  $('#regForm').on('submit', function (e) {
    e.preventDefault();                                   // stop the page from reloading
    var okName = validateName();                          // run all, so every error shows at once
    var okEmail = validateEmail();
    var okPass = validatePassword();

    if (okName && okEmail && okPass) {
      var name = $.trim($('#name').val());
      $('#success').text('Registration successful! Welcome, ' + name + '.').fadeIn();
      existingEmails.push($.trim($('#email').val()).toLowerCase());   // email is now taken
      this.reset();
      $('#name, #email, #password').css('border', '');
    } else {
      $('#success').hide();
    }
  });
});
