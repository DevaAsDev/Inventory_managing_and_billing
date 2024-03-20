//global var & fun
const existingCodesTemp = []; // Keep track of generated codes

let salesList = document.getElementById("salesList");

salesList.addEventListener("click", () => {
  fetchSales();
});

function fetchSales() {
  fetch("https://inventorymanaging.000webhostapp.com/get_sales.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      viewSales(data);
    })
    .catch((error) => console.error("Error:", error.message));
}

function viewSales(partyData) {
  let items_container = document.getElementById("items_container");

  items_container.innerHTML = "";

  items_container.innerHTML = `<div class="purchase-header">
      <button id="add_sales" class="p-btn" style="color:white;"><a
      href="quickBill.html"
      target="_blank"
      style="text-decoration: none; color: white"
      >Add sales</a></button>
      </div>
      <hr />
      <div id="party-list-container" class="purchase-list-container"/>`;

  let item_list_container = document.getElementById("party-list-container");

  item_list_container.innerHTML = "";
  item_list_container.innerHTML = `
    <div class="row m-2">
      <div class="col-1 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">Sl.No</div>
      <div class="col-2 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">ID</div>
      <div class="col-5 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">PARTY</div>
      <div class="col-2 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">MOBILE No.</div>
      <div class="col-2 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">Amount</div>
    </div>`;

  partyData.data.forEach((item, index) => {
    let listDiv = document.createElement("div");
    listDiv.className = "row m-2 mt-0 mb-0 lists";
    listDiv.innerHTML = `
      <div class="col-1 col-box">${index + 1}</div>
      <div class="col-2 col-box">${item.bId}</div>
      <div class="col-5 col-box">${item.pName}</div>
      <div class="col-2 col-box">${item.pNumber}</div>
      <div class="col-2 col-box">${item.received}</div>`;

    item_list_container.appendChild(listDiv);

    listDiv.addEventListener("click", (event) => {
      let temElement = document.querySelectorAll(".selectedItem");
      temElement.forEach((element) => {
        element.classList.remove("selectedItem");
        selectedItemId = 0;
      });
      listDiv.classList.add("selectedItem");
      //selectedItemId = event.currentTarget.id;
      //togglePopup(event);
    });
  });
}

//below code responsible foe the generation of id
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
