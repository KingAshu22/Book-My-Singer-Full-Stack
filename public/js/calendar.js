document.addEventListener("DOMContentLoaded", function () {
  // Variables
  var artistType = ""; // Variable to store selected artist type
  var eventType = ""; // Variable to store selected event type
  var location = "";
  var day = "";
  var month = "";
  var year = "";
  var startingBudget = "";
  var endingBudget = "";

  // Function to generate calendar for a given month and year
  function generateCalendar(month, year) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = date.getDay();

    let html = `<h2>${monthNames[month]} ${year}</h2>`;
    html += "<table>";
    html += "<tr>";
    daysOfWeek.forEach((day) => {
      html += `<th>${day}</th>`;
    });
    html += "</tr><tr>";

    let dayCounter = 1;
    for (let i = 0; i < 42; i++) {
      if (i >= firstDayOfWeek && dayCounter <= daysInMonth) {
        html += `<td data-day="${dayCounter}" data-month="${month}" data-year="${year}">${dayCounter}</td>`;
        dayCounter++;
      } else {
        html += "<td></td>";
      }
      if ((i + 1) % 7 === 0) {
        html += "</tr><tr>";
      }
    }

    html += "</tr></table>";
    return html;
  }

  // Function to render calendars for the current month and the next 12 months
  function renderCalendars() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const calendarContainer = document.querySelector(".calendar");

    for (let i = 0; i < 13; i++) {
      const month = (currentMonth + i) % 12;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      const calendarHTML = generateCalendar(month, year);
      calendarContainer.innerHTML += calendarHTML;
    }

    // Add event listener to each cell of the generated calendars
    const cells = calendarContainer.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        day = cell.dataset.day;
        month = parseInt(cell.dataset.month) + 1;
        year = cell.dataset.year;
        console.log(`${day}/${month}/${year}`); // Save selected date
        showStep("step5");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  // Function to generate options for budget select element
  function generateBudgetOptions(start, end) {
    const budgetOptions = [];
    for (let i = start; i <= end; i += 1000) {
      budgetOptions.push(
        `<option value="${i}">₹${i.toLocaleString()}</option>`
      );
    }
    return budgetOptions.join("");
  }

  // Show/hide elements based on budget selection
  function handleBudgetSelection() {
    const startingBudgetSelect = document.getElementById("startingBudget");
    const endingBudgetLabel = document.querySelector(
      "label[for='endingBudget']"
    );
    const endingBudgetSelect = document.getElementById("endingBudget");
    const nextBtn = document.getElementById("nextBtn");

    startingBudgetSelect.addEventListener("change", function () {
      startingBudget = parseInt(this.value);
      endingBudgetLabel.style.display = "block";
      endingBudgetSelect.style.display = "block";
      endingBudgetSelect.innerHTML = generateBudgetOptions(
        startingBudget,
        startingBudget + 1000000
      ); // Adjust end range as needed
      nextBtn.style.display = "block";
    });

    endingBudgetSelect.addEventListener("change", function () {
      endingBudget = parseInt(this.value);
    });

    nextBtn.addEventListener("click", function () {
      // Proceed to next step (Step 6)
      showStep("step6");
    });
  }

  // Show/hide steps
  function showStep(stepClass) {
    document.querySelectorAll(".enquiry-form > div").forEach((step) => {
      step.style.display = step.classList.contains(stepClass)
        ? "block"
        : "none";
    });
  }

  // Show only the first step initially
  showStep("step1");

  // Event listeners
  document.querySelectorAll(".step1 .buts").forEach((button) => {
    button.addEventListener("click", () => {
      artistType = button.id;
      showStep("step2");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll(".step2 .buts").forEach((button) => {
    button.addEventListener("click", () => {
      eventType = button.id;
      showStep("step3");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll(".step3 .buts").forEach((button) => {
    button.addEventListener("click", () => {
      location = button.id;
      showStep("step4");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.getElementById("nextStep3").addEventListener("click", () => {
    showStep("step4");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    showStep("step5");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document
    .getElementById("submitBtn")
    .addEventListener("click", async (event) => {
      event.preventDefault();

      document.getElementById("loadingOverlay").style.display = "block";

      if (!location) {
        location = document.getElementById("customLocation").value;
      }
      const name = document.getElementById("name").value;
      const contact = document.getElementById("contact").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;

      const formData = {
        artistType,
        eventType,
        location,
        date: `${day}/${month}/${year}`,
        startingBudget,
        endingBudget,
        name,
        contact,
        email,
        mobile,
        message: "Message Received from Enquiry Form",
      };

      try {
        const response = await fetch("/contact-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          window.location.href = "/success"; // Redirect to success page if form submission is successful
        } else {
          console.error("Error submitting form");
          // Handle error or display a message to the user
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error or display a message to the user
      } finally {
        document.getElementById("loadingOverlay").style.display = "none";
      }
    });

  // Event listener for calendar date selection
  document
    .querySelector(".calendar")
    .addEventListener("click", function (event) {
      if (
        event.target.tagName === "TD" &&
        event.target.textContent.trim() !== ""
      ) {
        // If a date is clicked
        selectedDate = event.target.textContent.trim(); // Save selected date
        // Show step5
        showStep("step5");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

  // Call the renderCalendars function when the page loads
  renderCalendars();

  // Generate budget options and handle budget selection
  const startingBudgetSelect = document.getElementById("startingBudget");
  startingBudgetSelect.innerHTML = generateBudgetOptions(10000, 10000000); // Adjust start and end values as needed
  handleBudgetSelection();
});
