//GLOBAL DECLARATION
let cName = "";
let cStock = null;
let cId = null;
let isSelected = false;

const close_receive = document.getElementById("clbtn_receive");
const popWindow_receive = document.getElementById("popWindow_receive_stock");
const popUpContainer_receive = document.getElementById(
  "popUpContainer_receive"
);

document.addEventListener("DOMContentLoaded", function () {
  // Function to display the list of items

  // Call the function to fetch item data
  fetchItemData();

  const receive_product = this.getElementById("receive_product");
  receive_product.addEventListener("click", () => {
    if (isSelected) {
      popWindow_receive.style.display = "flex";
      const myName = document.getElementById("mName");
      const mStock = document.getElementById("mStock");
      const selectElement = document.getElementById("sourceSelect");

      myName.value = cName;
      mStock.value = 0;

      const receive_stock = document.getElementById("reject_btn");
      receive_stock.addEventListener("click", () => {
        let tStock = mStock.value + cStock;
        console.log(tStock);
        console.log(cName);
        console.log(mStock.value);
        popWindow_receive.style.display = "none";
        cId = null;
        cName = "";
        cStock = null;
        isSelected = false;
        document.querySelectorAll(".item").forEach((el) => {
          el.classList.remove("activated");
        });
      });
    } else {
      appendAlert("First, Select an Item", "info");
    }
  });
});

function displayItemList(response, stock_data) {
  const itemListContainer = document.getElementById("itemList");

  // Clear previous content
  itemListContainer.innerHTML = "";

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
    cStockDiv.textContent = "Stock : " + item.stock;

    const skuDiv = document.createElement("div");
    skuDiv.classList.add("sku");
    skuDiv.classList.add("flex_grow");
    skuDiv.textContent = "SKU : " + item.sku;

    // Append the property divs to the item div
    itemDiv.appendChild(nameDiv);
    itemDiv.appendChild(itemCodeDiv);
    itemDiv.appendChild(skuDiv);
    itemDiv.appendChild(cStockDiv);

    // Append the item div to the itemListContainer
    itemListContainer.appendChild(itemDiv);
  });
}

// Function to fetch item data from the server
function fetchItemData() {
  fetch("https://inventorymanaging.000webhostapp.com/get_stock.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    httpVersion: "1.1", // Set HTTP version to 1.1
  })
    .then((response) => response.json())
    .then((data) => {
      displayItemList(data);
    })
    .catch((error) => console.error("Error:", error.message));
}

const reject_btn = document.getElementById("receive_stock");
reject_btn.addEventListener("click", () => {
  const mStock = document.getElementById("mStock");
  const selectElement = document.getElementById("sourceSelect");
  const stockValues = mStock.value;
  const selectedValue = selectElement.value;

  const stock_data = {
    id: cId,
    stock: stockValues,
    previous: cStock,
    from: selectedValue,
  };

  // Make a POST request to your API
  fetch("https://inventorymanaging.000webhostapp.com/add_stock.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stock_data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      // Handle the response from the server
      console.log(responseData);
      appendAlert("Stock Added!", "success");
      popWindow.style.display = "none";
      fetchItemData();

      popWindow_receive.style.display = "none";
      cId = null;
      cName = "";
      cStock = null;
      isSelected = false;
      document.querySelectorAll(".item").forEach((el) => {
        el.classList.remove("activated");
      });
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

issuing_product = document.getElementById("issuing_product");
issuing_product.addEventListener("click", () => {
  if (isSelected) {
    let popWindow_issuing = document.getElementById("popWindow_issuing_stock");
    popWindow_issuing.style.display = "flex";

    let issuingName = document.getElementById("iName");
    let iStock = document.getElementById("iStock");
    let selectElement = document.getElementById("issuingSelect");

    issuingName.value = cName;
    iStock.value = 0;
    let cancel_stocks = document.getElementById("cancel_stocks");
    cancel_stocks.addEventListener("click", () => {
      popWindow_issuing.style.display = "none";
      cId = null;
      cName = "";
      cStock = null;
      isSelected = false;
      document.querySelectorAll(".item").forEach((el) => {
        el.classList.remove("activated");
      });
    });
  } else {
    appendAlert("First, Select an Item", "info");
  }
});

let issuing_stock = document.getElementById("issuing_stock");
issuing_stock.addEventListener("click", () => {
  let iStock = document.getElementById("iStock");
  let selectElement_val = document.getElementById("issuingSelect");
  const popWindow_issuing = document.getElementById("popWindow_issuing_stock");

  const stock_val = {
    id: cId,
    stock: iStock.value,
    previous: cStock,
    from: selectElement_val.value,
  };

  // Make a POST request to your API
  fetch("https://inventorymanaging.000webhostapp.com/issuing_stock.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stock_val),
  })
    .then((response) => response.json())
    .then((responseData) => {
      // Handle the response from the server
      console.log(responseData);
      appendAlert("Stock issued!", "success");
      popWindow_issuing.style.display = "none";
      fetchItemData();

      popWindow_issuing.style.display = "none";
      cId = null;
      cName = "";
      cStock = null;
      isSelected = false;
      document.querySelectorAll(".item").forEach((el) => {
        el.classList.remove("activated");
      });
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
      appendAlert(
        "Faile to update the database!. Check the network.",
        "danger"
      );
    });
});

// Flag to track whether the click happened inside or outside the popUpContainer
let insideContainer_for_receive = false;

popUpContainer_receive.addEventListener("click", () => {
  insideContainer_for_receive = true;
  // You can add additional logic if needed
});

close_receive.addEventListener("click", () => {
  // Check the flag to determine the click location
  if (insideContainer_for_receive) {
    insideContainer_for_receive = false; // Reset the flag
  } else {
    popWindow_receive.style.display = "none";
  }
});

popWindow_receive.addEventListener("click", () => {
  // Check the flag to determine the click location
  if (insideContainer_for_receive) {
    insideContainer_for_receive = false; // Reset the flag
  } else {
    popWindow_receive.style.display = "none";
  }
});
