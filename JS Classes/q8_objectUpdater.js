// Q8: Dynamic Object Updater

const user = { name: "John", email: "john@mail.com", age: 21 };

// Show the current object values on the page
function displayUser() {
  document.getElementById("display").innerHTML = `
    <h3>Current User Object</h3>
    <p>Name: ${user.name}</p>
    <p>Email: ${user.email}</p>
    <p>Age: ${user.age}</p>`;
}

// Read the form values and update the object
function updateUserFromForm() {
  user.name = document.getElementById("name").value;
  user.email = document.getElementById("email").value;
  user.age = Number(document.getElementById("age").value);
  displayUser();
}

if (typeof document !== "undefined") {
  // Pre-fill the form with the object's current values
  Object.keys(user).forEach((key) => {
    document.getElementById(key).value = user[key];
  });
  displayUser();

  // "Real time": update the object on every keystroke
  document.getElementById("userForm").addEventListener("input", updateUserFromForm);

  // Also update on submit
  document.getElementById("userForm").addEventListener("submit", (event) => {
    event.preventDefault();
    updateUserFromForm();
    console.log("Updated user:", user);
  });
}
