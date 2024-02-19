document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch item data from the server
  function fetchItemData() {
    fetch("https://inventorymanaging.000webhostapp.com/get_stock.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        displayItemList(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  let cName = "";
  let cStock = null;
  let cId = null;
  let isSelected = false;

  // Function to display the list of items
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
        cStock = item.cSock;
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

  // Call the function to fetch item data
  fetchItemData();

  const receive_product = this.getElementById("receive_product");
  receive_product.addEventListener("click", () => {
    if (!isSelected) {
      popWindow_receive.style.display = "flex";
      const myName = document.getElementById("mName");
      const mStock = document.getElementById("mStock");
      myName.value = cName;
      mStock.value = 0;
      //myName.textContent = "cName";

      const reject_btn = document.getElementById("reject_btn");
      reject_btn.addEventListener("click", () => {
        const mStock = document.getElementById("mStock");
        const stockValues = mStock.value;

        const stock_data = {
          id: cId,
          stock: stockValues,
          previous: cStock,
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
            appendAlert("Item Added!", "success");
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

      const receive_stock = document.getElementById("receive_stock");
      receive_stock.addEventListener("click", () => {
        let tStock = mStock.value + cStock;
        console.log(tStock);
      });
    } else {
      appendAlert("First, Select an Item", "info");
    }
  });
});

const close_receive = document.getElementById("clbtn_receive");
const popWindow_receive = document.getElementById("popWindow_receive_stock");
const popUpContainer_receive = document.getElementById(
  "popUpContainer_receive"
);

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
