let issuing = document.getElementById("issuing");
issuing.addEventListener("click", () => {
  fetch("https://inventorymanaging.000webhostapp.com/shopItems.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      show_popup(data);
    })
    .catch((error) => console.error("Error:", error.message));
});

function show_popup(items) {
  let popWindow = document.getElementById("popWindow");
  popWindow.style.display = "grid";
  let popUpContainer = document.getElementById("popUpContainer");

  popUpContainer.innerHTML = `
        <div id="clbtn" class="cls_btn">X</div>
        <div class="pb-1"><h6>Issuing items</h6></div>

        <div class="fcontainer-sm">
          <div class="row">
            <div class="col-25">
              <label for="name">Name</label>
            </div>
            <div class="col-75">
              <select 
              id="name"
              name="name">
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
              <label for="nStock">Quantity*</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="nStock"
                name="nStock"
                value="0"
                placeholder="Stock"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="to">To*</label>
            </div>
            <div class="col-75">
              <select name="to" id="to">
                <option value="W">Warehouse</option>
                <option value="K">Kitchen</option>
                <option value="M">Market</option>
                <option value="O">Others</option>
              </select>
            </div>
          </div>

          <div class="row pt-5">
            <input id="issuing_stock" type="submit" value="Issue" />
          </div>
        </div>
        `;

  let name = document.getElementById("name");
  let cStock = document.getElementById("cStock");
  let issuing_stock = document.getElementById("issuing_stock");
  let nStock = document.getElementById(nStock).value;
  let to = document.getElementById("to");

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

  issuing_stock.addEventListener("click", () => {
    // Prepare the data to be sent
    const issuing_data = {
      id: get_id,
      previous: current_stock,
      stock: nStock,
      fid: f_id,
      source: to.value,
      date: getCurrentDate(),
      time: getCurrentTime(),
    };

    // Make a POST request to your API
    fetch(
      "https://inventorymanaging.000webhostapp.com/issuing_shop_stock.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issuing_data),
      }
    )
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
