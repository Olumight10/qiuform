document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = document.getElementById("submitBtn");

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Loading...";


    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const pair of formData.entries()) {
      params.append(pair[0], pair[1]);
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxPOdvoxGDnU-tmG4m6fa0ZHyDdo4OlH171VqAtPssaJ_OO7izKg8EOIC6Xyura_r9z/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const result = await response.text();

      if (result.toLowerCase().includes("success")) {
        alert("✅ Registration Successful")
        window.location.href = "index.html"; // ✅ Redirect to your own HTML page in the same folder
        
      } else {
        showError("Form submitted, but something went wrong: " + result);
      }
    } catch (error) {
      showError("Failed to submit form: " + error.message);
    }
  });

  function showError(message) {
    alert(message);
  }
});

