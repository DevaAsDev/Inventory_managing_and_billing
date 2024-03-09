let logInBtn = document.getElementById("login");

logInBtn.addEventListener("click", () => {
  let userName = document.getElementById("name");
  let psword = document.getElementById("psword");

  if (userName.value !== "" && psword.value !== "psword") {
    const login_data = {
      userName: userName.value,
      psword: psword.value,
    };

    fetch("https://inventorymanaging.000webhostapp.com/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // If authentication is successful, redirect to the dashboard
          window.location.href = "/dashboard.html";
        } else {
          // If authentication fails, display an error message
          alert("Invalid username or password");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  } else {
    alert("Invalid username or password!");
  }
});
