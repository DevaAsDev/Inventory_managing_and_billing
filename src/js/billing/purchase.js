let purchase = document.getElementById("purchase");

purchase.addEventListener("click", () => {
  show_purchase_winsow();
});

function show_purchase_winsow() {
  let popWindow = document.getElementById("popWindow");
  popWindow.style.display = "grid";
  let popUpContainer = document.getElementById("popUpContainer");
  popUpContainer.classList.remove("popContainer");
  popUpContainer.classList.add("p-container");
  //popUpContainer.style.width = "90%";
  //popUpContainer.style.height = "90%";

  /* popUpContainer.innerHTML = `
    <div id="clbtn" class="cls_btns">X</div>
          `;*/

  let close_btn = document.getElementById("clbtn");
  // Flag to track whether the click happened inside or outside the popUpContainer
  let insideContainer = false;

  popUpContainer.addEventListener("click", () => {
    insideContainer = true;
    // You can add additional logic if needed
  });

  close_btn.addEventListener("click", () => {
    // Check the flag to determine the click location
    if (insideContainer) {
      insideContainer = false; // Reset the flag
    } else {
      popWindow.style.display = "none";
    }
  });

  popWindow.addEventListener("click", () => {
    // Check the flag to determine the click location
    if (insideContainer) {
      insideContainer = false; // Reset the flag
    } else {
      popWindow.style.display = "none";
    }
  });
}

//brlow code is responsible for generation of 12 digit code,.

function generateUniqueCode(existingCodes) {
  let code;
  do {
    code = generateRandomCode();
  } while (existingCodes.includes(code));

  return code;
}

function generateRandomCode() {
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();

  // Combine date and time to form a 10-digit code
  const code = currentDate + currentTime;
  return code;
}

function getCurrentDate() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const yy = String(now.getFullYear()).slice(-2);

  return dd + mm + yy;
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Use only the last 4 digits of the time for variety
  return hours + minutes + seconds;
}

// Example usage:
const existingCodes = []; // Keep track of generated codes
const generatedCode = generateUniqueCode(existingCodes);
existingCodes.push(generatedCode);

console.log("Generated Code: " + generatedCode);

//for table functionality
const dataTable = document.getElementById("dataTable");
const emptyRow = document.getElementById("emptyRow");

emptyRow.addEventListener("input", function () {
  const newRow = emptyRow.cloneNode(true);
  dataTable.appendChild(newRow);
});
