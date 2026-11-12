
console.log("Homework Diary started");

// Get the form and button
const form = document.getElementById("homework-form");
const message = document.getElementById("message");

// Listen for form submission
form.addEventListener("submit", submitDataToServer);

// Submit homework to the server
async function submitDataToServer(event) {

  event.preventDefault();

  // Collect the information
  const dataObj = {
    subject: document.getElementById("subject").value.trim(),
    details: document.getElementById("details").value.trim(),
    dueDate: document.getElementById("dueDate").value
  };

  if (!dataObj.subject || !dataObj.details || !dataObj.dueDate) {
    message.textContent = "Please complete all fields.";
    return;
  }

  try {
    const response = await fetch("/putData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataObj)
    });

    if (!response.ok) {
      throw new Error("Could not save homework");
    }

    message.textContent = "Homework added successfully!";
    form.reset();

    // Refresh the homework list
    getDataFromServer();

  } catch (error) {
    console.error(error);
    message.textContent = "There was a problem saving your homework.";
  }
}


// Get the homework from the database
async function getDataFromServer() {

  try {
    const response = await fetch("/getData");

    if (!response.ok) {
      throw new Error("Could not load homework");
    }

    const homework = await response.json();

    displayData(homework);

  } catch (error) {
    console.error(error);
    message.textContent = "Could not load your homework.";
  }
}


// Display homework on the page
function displayData(homework) {

  const rowList = document.getElementById("users");

  rowList.innerHTML = "";

  if (homework.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "No homework added yet.";
    rowList.appendChild(emptyMessage);
    return;
  }

  homework.forEach(function(row) {

    const newListItem = document.createElement("li");

    const subject = document.createElement("strong");
    subject.textContent = row.subject;

    const details = document.createElement("div");
    details.textContent = row.details;

    const dueDate = document.createElement("span");
    dueDate.className = "due-date";

    if (row.due_date) {
      const dateParts = row.due_date.split("-");
      dueDate.textContent =
        "Due: " + dateParts[2] + "/" +
        dateParts[1] + "/" + dateParts[0];
    } else {
      dueDate.textContent = "No due date";
    }

    newListItem.appendChild(subject);
    newListItem.appendChild(details);
    newListItem.appendChild(dueDate);

    rowList.appendChild(newListItem);

  });
}


// Load homework when the page opens
getDataFromServer();
