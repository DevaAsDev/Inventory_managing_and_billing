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

  response.data.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add(
      "item",
      "d-flex",
      "flex-wrap",
      "flex-row",
      "justify-content-between",
      "align-content-center",
      "p-1",
      "bg-body-primary"
    );

    // Add an onClick listener to each itemDiv
    itemDiv.addEventListener("click", () => {
      // You can perform actions when an item is clicked
      document.querySelectorAll(".item").forEach((el) => {
        el.classList.remove("activated");
      });

      // Add "active" class to the clicked item
      itemDiv.classList.add("activated");

      //global declaration
      cName = item.name;
      cStock = item.stock;
      cId = item.id;
      isSelected = true;
    });

    // Create divs for the properties you want to display
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.classList.add("flex_grow");
    nameDiv.textContent = "Name : " + item.name;

    const itemCodeDiv = document.createElement("div");
    itemCodeDiv.classList.add("itemCode");
    itemCodeDiv.classList.add("flex_grow");
    itemCodeDiv.textContent = "Item Code : " + item.itemCode;

    const cStockDiv = document.createElement("div");
    cStockDiv.classList.add("cStock");
    cStockDiv.classList.add("flex_grow");
    cStockDiv.textContent = "Stock : " + item.cStock;

    const skuDiv = document.createElement("div");
    skuDiv.classList.add("sku");
    skuDiv.classList.add("flex_grow");
    skuDiv.textContent = "SKU : " + item.sku;

    // Append the property divs to the item div
    itemDiv.appendChild(nameDiv);
    itemDiv.appendChild(itemCodeDiv);
    itemDiv.appendChild(skuDiv);
    itemDiv.appendChild(cStockDiv);

    // Append the item div to the itemContainer
    itemContainer.appendChild(itemDiv);
  });
}

console.log("before fetching data");
getData();
