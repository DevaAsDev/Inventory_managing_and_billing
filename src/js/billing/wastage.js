let wastage = document.getElementById("wastage");
wastage.addEventListener("click", () => {
  fetch("https://inventorymanaging.000webhostapp.com/shopItems.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      show_wastage(data);
    })
    .catch((error) => console.error("Error:", error.message));
});

function show_wastage(items) {
  let popWindow = document.getElementById("popWindow");
  popWindow.style.display = "grid";
  let popUpContainer = document.getElementById("popUpContainer");

  popUpContainer.innerHTML = `
    <div id="clbtn" class="cls_btn">X</div>
    <div class="pb-1"><h6>Wastage</h6></div>
    <div class="fcontainer-sm">
      <div class="row">
        <div class="col-25">
          <label for="nameofwastage">Name</label>
        </div>
        <div class="col-75">
          
          <select id="nameofwastage" name="nameofwastage">
            <option value="None">None</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="cStock">Current Stock</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            id="cStock"
            style="border: none"
            name="cStock"
            disabled
            placeholder="Current Stock"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="nStocks">Quantity*</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            id="nStocks"
            name="nStocks"
            value="0"
            placeholder="Stock"
          />
        </div>
      </div>
      <div class="row pt-5">
        <input id="wastage" type="submit" value="Move To Bin" />
      </div>
    </div>
          `;

  let name = document.getElementById("nameofwastage");
  let wastage = document.getElementById("wastage");
  let nStock = document.getElementById("nStocks");
  let cStock = document.getElementById("cStock");

  items.data.forEach((item) => {
    const optionElement = document.createElement("option");
    optionElement.value = item.id;
    optionElement.text = item.name;
    name.appendChild(optionElement);
  });

  let get_id;
  let current_stock;
  let f_id;

  name.addEventListener("change", function (event) {
    let ob = findObjectById(event.target.value);
    cStock.value = ob.cStock;
    current_stock = ob.cStock;
    get_id = ob.id;
  });

  wastage.addEventListener("click", () => {
    // Prepare the data to be sent
    const wastage_data = {
      id: get_id,
      previous: current_stock,
      stock: nStock.value,
      fid: f_id,
      date: getCurrentDate(),
      time: getCurrentTime(),
    };

    // Make a POST request to your API
    fetch("https://inventorymanaging.000webhostapp.com/shop_wastage.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wastage_data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response from the server
        console.log(responseData);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  });

  function findObjectById(id) {
    return items.data.find((item) => item.id === id);
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
