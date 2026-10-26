// Q4: Custom Form Builder (Forms + Classes)

class FormBuilder {
  // fields: array like [{ type: 'text', label: 'Username' }]
  constructor(fields, containerId) {
    this.fields = fields;
    this.container = document.getElementById(containerId);
    this.render();
  }

  // Build the whole form as an HTML string and insert it with innerHTML
  render() {
    let html = '<form id="dynamicForm">';
    this.fields.forEach((field) => {
      const fieldName = field.label.toLowerCase().replace(/\s+/g, "_"); // "Full Name" -> "full_name"
      html += `<label>${field.label}</label>`;
      if (field.type === "textarea") {
        html += `<textarea name="${fieldName}"></textarea>`;
      } else {
        html += `<input type="${field.type}" name="${fieldName}">`;
      }
    });
    html += '<button type="submit">Submit</button></form>';
    this.container.innerHTML = html;

    // Handle submit: collect data and show it
    document.getElementById("dynamicForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this.getFormData();
      console.log(data);
      document.getElementById("output").textContent = JSON.stringify(data, null, 2);
    });
  }

  // Return all entered values as a plain object
  getFormData() {
    const form = document.getElementById("dynamicForm");
    return Object.fromEntries(new FormData(form).entries());
  }
}

const fieldDefinitions = [
  { type: "text", label: "Username" },
  { type: "email", label: "Email" },
  { type: "password", label: "Password" },
  { type: "number", label: "Age" },
  { type: "textarea", label: "About You" },
];

new FormBuilder(fieldDefinitions, "formContainer");
