// Q5: Movie Ticket Booking (Objects + RegExp)

const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;          // alphabets only
const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;  // proper email format
const seatsPattern = /^([1-9]|10)$/;                     // 1 to 10 only

const rules = [
  { id: "name", pattern: namePattern, message: "Name must contain only alphabets." },
  { id: "email", pattern: emailPattern, message: "Enter a valid email address." },
  { id: "seats", pattern: seatsPattern, message: "Seats must be a number from 1 to 10." },
];

function validateField(rule) {
  const input = document.getElementById(rule.id);
  const isValid = rule.pattern.test(input.value.trim());
  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
  document.getElementById(rule.id + "Error").textContent = isValid ? "" : rule.message;
  return isValid;
}

if (typeof document !== "undefined") {
  const ticketBox = document.getElementById("ticket");

  document.getElementById("bookingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const allValid = rules.map(validateField).every(Boolean);

    if (!allValid) {
      ticketBox.style.display = "none";
      return;
    }

    // Store the booking info in an object
    const booking = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      seats: Number(document.getElementById("seats").value),
    };

    ticketBox.style.display = "block";
    ticketBox.innerHTML = `
      <h3>Ticket Confirmed</h3>
      <p>Name: ${booking.name}</p>
      <p>Email: ${booking.email}</p>
      <p>Seats: ${booking.seats}</p>`;
  });
}

if (typeof module !== "undefined") module.exports = { namePattern, emailPattern, seatsPattern };
