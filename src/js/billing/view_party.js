//global var & fun
const existingCodes = []; // Keep track of generated codes

var view_Party = document.getElementById("addparty");

view_Party.addEventListener("click", () => {
  fetchParty();
});

function fetchParty() {
  fetch("https://inventorymanaging.000webhostapp.com/get_party.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      viewParty(data);
    })
    .catch((error) => console.error("Error:", error.message));
}

function viewParty(partyData) {
  let items_container = document.getElementById("items_container");

  items_container.innerHTML = "";

  items_container.innerHTML = `<div class="purchase-header">
    <button id="add_party" class="p-btn" style="color:white;">Add Party</button>
    </div>
    <hr />
    <div id="party-list-container" class="purchase-list-container"/>`;

  let add_party = document.getElementById("add_party");
  add_party.addEventListener("click", () => {
    console.log("clicked on add party");
    addParty();
    function addParty() {
      var popWindow = document.getElementById("popWindow");
      popWindow.style.display = "grid";
      let popUpContainer = document.getElementById("popUpContainer");

      popUpContainer.innerHTML = `<div id="clbtn" class="cls_btn">X</div>
      <div class="pb-1"><h6>Add Party</h6></div>
    
      <div class="fcontainer">
        <div class="row">
          <div class="col-25">
            <label for="name">Name*</label>
          </div>
          <div class="col-75">
            <input type="text" id="name" name="name" placeholder="Name" />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="mNumber">Mobile No*</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="mNumber"
              name="mNumber"
              placeholder="Mobile Number"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="place">Place*</label>
          </div>
          <div class="col-75">
            <input type="text" id="place" name="place" placeholder="Place" />
          </div>
        </div>
    
        <div class="row">
          <div class="col-25">
            <label for="fname">Farm Name</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Farm Name"
            />
          </div>
        </div>
    
        <hr />
    
        <div class="row">
          <div class="col-25">
            <label for="gstin">GSTIN</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="gstin"
              name="gstin"
              placeholder="GSTIN"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="aNumber">Account No</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="aNumber"
              name="aNumber"
              placeholder="Account Number"
            />
          </div>
        </div>
    
        <div class="row">
          <div class="col-25">
            <label for="ifsi">IFSI No</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="ifsi"
              name="ifsi"
              placeholder="IFSI Number"
            />
          </div>
        </div>
    
        <div class="row">
          <div class="col-25">
            <label for="bName">Branch Name</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="bName"
              name="bName"
              placeholder="Branch Name"
            />
          </div>
        </div>
    
        <div class="row">
          <div class="col-25">
            <label for="hName">Account Holder Name</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="hName"
              name="hName"
              placeholder="Account Holder"
            />
          </div>
        </div>
    
        <div class="row pt-5">
          <input id="submit" type="submit" value="Add" />
        </div>
      </div>`;

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

      let addPartyToServer = document.getElementById("submit");

      addPartyToServer.addEventListener("click", () => {
        let fName = document.getElementById("name").value;
        let mNumber = document.getElementById("mNumber").value;
        let place = document.getElementById("place").value;
        let farm = document.getElementById("fname").value;

        let gstin = document.getElementById("gstin").value;
        let aNumber = document.getElementById("aNumber").value;
        let ifsi = document.getElementById("ifsi").value;

        let bName = document.getElementById("bName").value;
        let hName = document.getElementById("hName").value;

        let secCode = "P" + generateUniqueCode(existingCodes);

        const party_data = {
          name: fName,
          number: mNumber,
          place: place,
          fName: farm,
          aNum: aNumber,
          ifsi: ifsi,
          branch: bName,
          holder: hName,
          gstin: gstin,
          date: getCurrentDate(),
          code: secCode,
        };

        console.log(party_data);

        console.log(fName);
        console.log(mNumber);
        console.log(place);
        console.log(partyData);
        console.log(partyData);
        console.log(partyData);
        console.log(partyData);
        console.log(partyData);

        fetch("https://inventorymanaging.000webhostapp.com/add_party.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(party_data),
        })
          .then((response) => response.json())
          .then((responseData) => {
            // Handle the response from the server
            console.log(responseData);
            popWindow.style.display = "none";
            //appendAlert("Stock Added!", "success");
          })
          .catch((error) => {
            // Handle errors
            console.error("Error:", error);
            // appendAlert(
            //   "Faile to add item to database!. Check the network.",
            //   "danger"
            // );
          });
      });
    }

    function getCurrentDate() {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const yy = String(now.getFullYear()).slice(-2);

      return dd + mm + yy;
    }
  });
  let item_list_container = document.getElementById("party-list-container");

  item_list_container.innerHTML = "";
  item_list_container.innerHTML = `
  <div class="row m-2">
    <div class="col-1 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">Sl.No</div>
    <div class="col-2 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">ID</div>
    <div class="col-5 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">PARTY</div>
    <div class="col-2 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">MOBILE No.</div>
    <div class="col-2 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">BALANCE</div>
  </div>`;

  partyData.data.forEach((item, index) => {
    let listDiv = document.createElement("div");
    listDiv.className = "row m-2 mt-0 mb-0 lists";
    listDiv.innerHTML = `
    <div class="col-1 col-box">${index + 1}</div>
    <div class="col-2 col-box">${item.item_id}</div>
    <div class="col-5 col-box">${item.name}</div>
    <div class="col-2 col-box">${item.number}</div>
    <div class="col-2 col-box">${item.balance}</div>`;

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

// JavaScript function to toggle the visibility of the popup menu

// function togglePopup(event) {
//   var popupMenu = document.getElementById("popupMenu");
//   if (popupMenu.style.display !== "none") {
//     popupMenu.style.display = "none";
//     isPopUpMenuVisisble = false;
//   } else {
//     isPopUpMenuVisisble = true;
//     popupMenu.style.display = "block";
//     popupMenu.style.top = `${event.clientY}px`;
//     popupMenu.style.left = `${event.clientX}px`;
//   }
// }

// // Close the popup menu if the user clicks outside of it
// window.onclick = function (event) {
//   var popupMenu = document.getElementById("popupMenu");
//   if (event.target !== popupMenu && !popupMenu.contains(event.target)) {
//     if (!isPopUpMenuVisisble) {
//       popupMenu.style.display = "none";
//     } else {
//       isPopUpMenuVisisble = false;
//     }
//   }
// };
