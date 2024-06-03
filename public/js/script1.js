document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form"),
        nameField = form.querySelector(".name-field"),
        nameInput = nameField.querySelector(".name"),
        // usernameField = form.querySelector(".username-field"),
        // usernameInput = usernameField.querySelector(".username"),
        emailField = form.querySelector(".email-field"),
        emailInput = emailField.querySelector(".email"),
        passField = form.querySelector(".create-password"),
        passInput = passField.querySelector(".password"),
        cPassField = form.querySelector(".confirm-password"),
        cPassInput = cPassField.querySelector(".cPassword");

  // Name Validation
  function checkName() {
      const namePattern = /^[a-zA-Z\s]+$/;
      if (!nameInput.value.match(namePattern)) {
          nameField.classList.add("invalid");
      } else {
          nameField.classList.remove("invalid");
      }
  }

  // Username Validation
//   function checkUsername() {
//       const usernamePattern = /^[a-zA-Z0-9]{2,}$/;
//       if (!usernameInput.value.match(usernamePattern)) {
//           usernameField.classList.add("invalid");
//       } else {
//           usernameField.classList.remove("invalid");
//       }
//   }

  // Email Validation
  function checkEmail() {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailInput.value.match(emailPattern)) {
          emailField.classList.add("invalid");
      } else {
          emailField.classList.remove("invalid");
      }
  }

  // Password Validation
  function createPass() {
      const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passInput.value.match(passPattern)) {
          passField.classList.add("invalid");
      } else {
          passField.classList.remove("invalid");
      }
  }

  // Confirm Password Validation
  function confirmPass() {
      if (passInput.value !== cPassInput.value || cPassInput.value === "") {
          cPassField.classList.add("invalid");
      } else {
          cPassField.classList.remove("invalid");
      }
  }

  // Toggle Password Visibility
 
    const eyeIcons = document.querySelectorAll(".show-hide");

    eyeIcons.forEach(eyeIcon => {
        eyeIcon.addEventListener("click", () => {
            console.log("Eye icon clicked"); // Debugging statement
            const pInput = eyeIcon.parentElement.querySelector("input");
            console.log("Input field:", pInput); // Debugging statement
            if (pInput.type === "password") {
                eyeIcon.classList.replace("bx-hide", "bx-show");
                pInput.type = "text";
            } else {
                eyeIcon.classList.replace("bx-show", "bx-hide");
                pInput.type = "password";
            }
        });
    });



  

  // Real-time Validation
  nameInput.addEventListener("keyup", checkName);
//   usernameInput.addEventListener("keyup", checkUsername);
  emailInput.addEventListener("keyup", checkEmail);
  passInput.addEventListener("keyup", createPass);
  cPassInput.addEventListener("keyup", confirmPass);

  // Calling Functions on Form Submit
  form.addEventListener("submit", (e) => {
      checkName();
    //   checkUsername();
      checkEmail();
      createPass();
      confirmPass();

      if (nameField.classList.contains("invalid") ||
        //   usernameField.classList.contains("invalid") ||
          emailField.classList.contains("invalid") ||
          passField.classList.contains("invalid") ||
          cPassField.classList.contains("invalid")) {
          e.preventDefault(); // Prevent form submission if there are validation errors
      }
  });
});


document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/usersignin', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const messageDiv = document.getElementById('signupMessage');
            if (xhr.status === 200) {
                window.location.href = '/home';
            } else {
                const response = JSON.parse(xhr.responseText);
                messageDiv.innerText = `Error: ${response.message}`;
            }
        }
    };

    xhr.send(JSON.stringify({ email, password }));
});

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const orderDetails = document.getElementById('orderDetails').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const messageDiv = document.getElementById('orderMessage');
            if (xhr.status === 200) {
                messageDiv.innerText = 'Order submitted successfully!';
            } else {
                const response = JSON.parse(xhr.responseText);
                messageDiv.innerText = `Error: ${response.message}`;
            }
        }
    };

    xhr.send(JSON.stringify({ orderDetails }));
});
