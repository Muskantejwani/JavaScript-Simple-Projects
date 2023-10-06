document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const regUsername = document.getElementById("regUsername").value;
    const regPassword = document.getElementById("regPassword").value;

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(regPassword)) {
        alert("Password must be strong!");
        return;
    }

    if (regUsername.length < 4) {
        document.getElementById("usernameError").textContent = "Username must be at least 5 characters";
        return;
    } else {
        document.getElementById("usernameError").textContent = "";
    }

    if (localStorage.getItem(regUsername)) {
        alert("Username already taken. Please choose a different one.");
    } else {
    
        localStorage.setItem(regUsername, regPassword);
        alert("Registration successful! You can now log in.");
    }

    document.getElementById("registrationForm").reset();
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    if (localStorage.getItem(loginUsername) === loginPassword) {
        document.getElementById("message").textContent = "Login successful!";
    } else {
        document.getElementById("message").textContent = "Login failed. Please check your username and password.";
    }

    document.getElementById("loginForm").reset();
});
