var addParty = document.getElementById("addparty");

addParty.addEventListener("click", () => {
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
        <input type="text" id="name" name="Name" placeholder="Name" />
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
          placeholder="Account Holder Name"
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
    let fName = document.getElementById("name");
    let mNumber = document.getElementById("mNumber");
    let place = document.getElementById("place");
    let farm = document.getElementById("fname");

    let aNumber = document.getElementById("aNumber");
    let ifsi = document.getElementById("ifsi");

    let bName = document.getElementById("bName");
    let hName = document.getElementById("hName");

    const party_data = {
      name: fName,
      number: mNumber,
      place: place,
      fName: farm,
      aNum: aNumber,
      ifsi: ifsi,
      branch: bName,
      holder: hName,
    };

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
        appendAlert("Stock Added!", "success");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        appendAlert(
          "Faile to add item to database!. Check the network.",
          "danger"
        );
      });
  });
});
