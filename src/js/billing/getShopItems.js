//this function fetch data from the server
function getData() {
  fetch("https://inventorymanaging.000webhostapp.com/shopItems.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayItemList(data);
    })
    .catch((error) => console.error("Error:", error.message));
}

function displayItemList(response) {
  const itemContainer = document.getElementById("items_container");
  // Clear previous content
  itemContainer.innerHTML = "";

  const titleDiv = document.createElement("div");
  titleDiv.classList.add(
    "item",
    "d-flex",
    "flex-wrap",
    "flex-row",
    "justify-content-between",
    "align-content-center",
    "bg-black",
    "text-white"
  );

  // Create divs for the properties you want to display
  const nameDivs = document.createElement("div");
  nameDivs.classList.add("name");
  nameDivs.classList.add("flex_grow");
  nameDivs.textContent = "Name";

  const itemCodeDivs = document.createElement("div");
  itemCodeDivs.classList.add("itemCode");
  itemCodeDivs.classList.add("flex_grow");
  itemCodeDivs.textContent = "Item Code";

  const cStockDivs = document.createElement("div");
  cStockDivs.classList.add("cStock");
  cStockDivs.classList.add("flex_grow");
  cStockDivs.textContent = "Stock";

  const skuDivs = document.createElement("div");
  skuDivs.classList.add("sku");
  skuDivs.classList.add("flex_grow");
  skuDivs.textContent = "SKU";

  // Append the property divs to the item div
  titleDiv.appendChild(nameDivs);
  titleDiv.appendChild(itemCodeDivs);
  titleDiv.appendChild(skuDivs);
  titleDiv.appendChild(cStockDivs);

  itemContainer.appendChild(titleDiv);

  response.data.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add(
      "item",
      "d-flex",
      "flex-wrap",
      "flex-row",
      "justify-content-between",
      "align-content-center",
      "bg-body-primary"
    );

    // Add an onClick listener to each itemDiv
    itemDiv.addEventListener("dblclick", () => {
      // You can perform actions when an item is clicked
      document.querySelectorAll(".item").forEach((el) => {
        el.classList.remove("activated");
      });

      // Add "active" class to the clicked item
      itemDiv.classList.add("activated");
      showPopUp(item);
    });

    // Create divs for the properties you want to display
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.classList.add("flex_grow");
    nameDiv.textContent = item.name;

    const itemCodeDiv = document.createElement("div");
    itemCodeDiv.classList.add("itemCode");
    itemCodeDiv.classList.add("flex_grow");
    itemCodeDiv.textContent = item.itemCode;

    const cStockDiv = document.createElement("div");
    cStockDiv.classList.add("cStock");
    cStockDiv.classList.add("flex_grow");
    cStockDiv.textContent = item.cStock;

    const skuDiv = document.createElement("div");
    skuDiv.classList.add("sku");
    skuDiv.classList.add("flex_grow");
    skuDiv.textContent = item.sku;

    // Append the property divs to the item div
    itemDiv.appendChild(nameDiv);
    itemDiv.appendChild(itemCodeDiv);
    itemDiv.appendChild(skuDiv);
    itemDiv.appendChild(cStockDiv);

    // Append the item div to the itemContainer
    itemContainer.appendChild(itemDiv);
  });
}

function showPopUp(item) {
  let popWindow = document.getElementById("popWindow");
  popWindow.style.display = "grid";
  let popUpContainer = document.getElementById("popUpContainer");
  popUpContainer.classList.add("popUpContainer");

  popUpContainer.innerHTML = `
  <div id="clbtn" class="cls_btn">X</div>
        <div class="pb-1"><h6>Add Stock</h6></div>

        <div class="fcontainer-sm">
          <div class="row">
            <div class="col-25">
              <label for="name">Name</label>
            </div>
            <div class="col-75">
              <input type="text" value=${item.name}  disabled style="border: none;" id="name" name="Name" placeholder="Name" />
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
                style="border: none;" 
                value=${item.cStock} 
                name="cStock" disabled
                placeholder="Current Stock"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="nStock">New Stock*</label>
            </div>
            <div class="col-75">
              <input type="text" id="nStock" name="nStock" value="0" />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="from">Source*</label>
            </div>
            <div class="col-75">
              <select name="from" id="from">
                <option value="W">Warehouse</option>
                <option value="F">Farmers</option>
                <option value="M">Market</option>
                <option value="O">Others</option>
              </select>
            </div>
          </div>

          <div class="row pt-3 ">
          <div class="col-6">
            <div class="row">
              <div class="col-6">
                <label for="mrp">MRP</label>
              </div>
              <div class="col-6">
                <input
                  type="text"
                  id="mrp"
                  name="mrp"
                  value="0"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">
                <label for="sprice">Sales Price</label>
              </div>
              <div class="col-6">
                <input
                  type="text"
                  id="sprice"
                  name="sprice"
                  value="0"
                />
              </div>
            </div>
          </div>
        </div>

          <div class="row pt-5">
            <input id="submit_stock" type="submit" value="Add" />
          </div>
        </div>
        `;

  let submit_stock = document.getElementById("submit_stock");
  submit_stock.addEventListener("click", () => {
    let nStock = document.getElementById("nStock").value;
    let mrp = document.getElementById("mrp").value;
    let sPrice = document.getElementById("sprice").value;
    let source = document.getElementById("from").value;

    let sum = parseInt(item.cStock) + parseInt(nStock);

    // Prepare the data to be sent
    const data = {
      id: item.id,
      stock: sum,
      mrp: mrp,
      price: sPrice,
      time: getCurrentTime(),
      date: getCurrentDate(),
      foreign_id: item.foreign_id,
      source: source,
    };

    // Make a POST request to your API
    fetch("https://inventorymanaging.000webhostapp.com/shop_stock.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response from the server
        console.log(responseData);
        // appendAlert("Item Added!", "success");
        popWindow.style.display = "none";
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

let itemsLoader = document.getElementById("items");
itemsLoader.addEventListener("click", () => {
  getData();
});
/*
this section only for generating test data and it must be reformed before host.
Add 'data' tag before iteration, otherwise it through an error. Also uncomment the necessory lines.
*/
// let re =
//   '[{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"21","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"47","sku":"20240223013"}]';

// response = JSON.parse(re);
// displayItemList(response);
