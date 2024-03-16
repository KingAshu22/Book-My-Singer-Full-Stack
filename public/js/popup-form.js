document.addEventListener("DOMContentLoaded", function () {
  var artistType = ""; // Variable to store selected artist type
  var eventType = ""; // Variable to store selected event type

  // Function to show/hide steps
  function showStep(stepClass) {
    document.querySelectorAll(".modal-body > div").forEach(function (step) {
      if (step.classList.contains(stepClass)) {
        step.style.display = "block";
      } else {
        step.style.display = "none";
      }
    });
  }

  // Show only the first step initially
  showStep("step1");

  // Event listener for artist type selection
  document.querySelectorAll(".step1 .but").forEach(function (button) {
    button.addEventListener("click", function () {
      artistType = this.id;
      showStep("step2");
    });
  });

  // Event listener for event type selection
  document.querySelectorAll(".step2 .but").forEach(function (button) {
    button.addEventListener("click", function () {
      eventType = this.id;
      showStep("step3");
    });
  });

  // Event listener for Next button in step3
  document.getElementById("nextBtn").addEventListener("click", function () {
    showStep("step4");
  });

  // Event listener for form submission
  document
    .getElementById("submitBtn")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      var location = document.getElementById("location").value;
      var date = document.getElementById("date").value;
      var budget = document.getElementById("budget").value;
      var name = document.getElementById("name").value;
      var contact = document.getElementById("contact").value;
      var email = document.getElementById("email").value;
      var mobile = document.getElementById("mobile").value;

      // Check if all required fields are filled
      if (location && date && budget && name && contact) {
        // Make a POST request to /contact-form with form data
        var formData = {
          artistType: artistType,
          eventType: eventType,
          location: location,
          date: date,
          budget: budget,
          name: name,
          contact: contact,
          email: email,
          mobile: mobile,
          message: "Message Received from <%= artist.metaTitle %>",
        };

        // Replace '/contact-form' with your actual endpoint
        const response = await fetch("/contact-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          window.location.href = "/success"; // Redirect to success page if form submission is successful
        } else {
          console.error("Error submitting form");
          // Handle error or display a message to the user
        }
      } else {
        alert("Please fill in all fields.");
      }
    });
});
