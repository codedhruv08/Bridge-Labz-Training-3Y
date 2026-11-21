// Runs only after the DOM is fully loaded
$(document).ready(function () {

  // 5 motivational quotes
  var quotes = [
    "The best way to predict the future is to create it.",
    "Believe you can and you're halfway there.",
    "Small steps every day lead to big results.",
    "Dream big. Start small. Act now.",
    "Success is the sum of small efforts repeated daily."
  ];

  // Returns a greeting text based on the current hour
  function getGreeting() {
    var hour = new Date().getHours();
    var name = $.trim($('#visitorName').val()) || 'Visitor';
    var word = hour < 12 ? 'Good Morning' : (hour < 18 ? 'Good Afternoon' : 'Good Evening');
    return word + ', ' + name + '!';
  }

  // 1. On page load -> personalized time-based greeting
  $('#greeting').text(getGreeting());

  // Update greeting live while the visitor types a name
  $('#visitorName').on('keyup', function () {
    $('#greeting').text(getGreeting());
  });

  // 2. "Change Greeting" -> replace text with a random motivational quote
  $('#changeBtn').on('click', function () {
    var random = quotes[Math.floor(Math.random() * quotes.length)];
    $('#greeting').text(random);
  });

  // 3. Toggle visibility of the welcome message (.toggle() flips show/hide)
  $('#toggleBtn').on('click', function () {
    $('#welcomeMsg').toggle();
  });

  // 4. Clicking the greeting shows an alert with its current text
  $('#greeting').on('click', function () {
    alert('You clicked the greeting: ' + $(this).text());
  });
});
