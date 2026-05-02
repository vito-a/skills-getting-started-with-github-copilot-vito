document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("admin-activities-list");
  const activitySelect = document.getElementById("admin-activity-select");
  const addActivityForm = document.getElementById("add-activity-form");
  const addStudentForm = document.getElementById("add-student-form");
  const messageDiv = document.getElementById("admin-message");

  function showMessage(message, type = "info") {
    messageDiv.textContent = message;
    messageDiv.className = type;
    messageDiv.classList.remove("hidden");
  }

  function renderActivities(activities) {
    activitiesList.innerHTML = "";

    Object.entries(activities).forEach(([name, details]) => {
      const card = document.createElement("div");
      card.className = "activity-card";
      card.innerHTML = `
        <h4>${name}</h4>
        <p>${details.description}</p>
        <p><strong>Schedule:</strong> ${details.schedule}</p>
        <p><strong>Max Participants:</strong> ${details.max_participants}</p>
        <p><strong>Signed Up:</strong> ${details.participants.length}</p>
        <div class="participant-list">
          <strong>Participants:</strong>
          <ul>${details.participants.map((email) => `<li>${email}</li>`).join("") || "<li>No participants yet</li>"}</ul>
        </div>
      `;
      activitiesList.appendChild(card);
    });
  }

  function populateActivitySelect(activities) {
    activitySelect.innerHTML = "<option value=\"\">-- Select an activity --</option>";
    Object.keys(activities).forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      activitySelect.appendChild(option);
    });
  }

  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();
      renderActivities(activities);
      populateActivitySelect(activities);
    } catch (error) {
      activitiesList.innerHTML = "<p>Unable to load activities.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  addActivityForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("activity-name").value.trim();
    const description = document.getElementById("activity-description").value.trim();
    const schedule = document.getElementById("activity-schedule").value.trim();
    const maxParticipants = Number(document.getElementById("activity-max").value);

    if (!name || !description || !schedule || !maxParticipants) {
      showMessage("Please fill in every field to add a new activity.", "error");
      return;
    }

    try {
      const response = await fetch("/activities/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          schedule,
          max_participants: maxParticipants,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        showMessage(result.message, "success");
        addActivityForm.reset();
        fetchActivities();
      } else {
        showMessage(result.detail || "Failed to add activity.", "error");
      }
    } catch (error) {
      showMessage("Failed to add activity. Please try again.", "error");
      console.error("Error adding activity:", error);
    }
  });

  addStudentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const activity = activitySelect.value;
    const email = document.getElementById("student-email").value.trim();

    if (!activity || !email) {
      showMessage("Please select an activity and enter a student email.", "error");
      return;
    }

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        { method: "POST" }
      );
      const result = await response.json();

      if (response.ok) {
        showMessage(result.message, "success");
        addStudentForm.reset();
        fetchActivities();
      } else {
        showMessage(result.detail || "Failed to add student.", "error");
      }
    } catch (error) {
      showMessage("Failed to add student. Please try again.", "error");
      console.error("Error adding student:", error);
    }
  });

  fetchActivities();
});
