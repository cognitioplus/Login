document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (!fullname || !email || !password || !confirmPassword) {
    alert("All fields are required.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // TODO: Replace this with real API call
  console.log("Form validated. Redirecting to portal...");

  // Simulated success
  setTimeout(() => {
    window.location.href = "https://cognitio-plus.aiwaapp.live/welcome/";
  }, 1000);
});
