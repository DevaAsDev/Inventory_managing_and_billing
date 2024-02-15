document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch item data from the server
  function fetchItemData() {
    fetch("https://inventorymanaging.000webhostapp.com/get.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => displayItemList(data))
      .catch((error) => console.error("Error:", error));
  }

  // Function to display the list of items
  function displayItemList(response) {
    const itemListContainer = document.getElementById("itemList");

    // Clear previous content
    itemListContainer.innerHTML = "";

    // Check if response has a 'data' property containing an array
    if (response && response.data && Array.isArray(response.data)) {
      // Create a list element and append items
      const itemList = document.createElement("ul");

      response.data.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add(
          "item",
          "d-flex",
          "flex-wrap",
          "flex-row",
          "m-2",
          "justify-content-around",
          "align-content-center",
          "p-3",
          "bg-body-primary",
          "m-3"
        );

        // Add an onClick listener to each itemDiv
        itemDiv.addEventListener("click", () => {
          // You can perform actions when an item is clicked
          console.log(`Item clicked: ${JSON.stringify(item)}`);
          popWindow_edit.style.display = "grid";
          const update_item = document.getElementById("btn_add");
          const xName = document.getElementById("xname");
          const xStock = document.getElementById("xstock");

          xName.value = item.name;
          xStock.value = item.cStock;
          const xId = item.id;

          update_item.addEventListener("click", () => {
            const nameValues = xName.value;
            const stockValues = xStock.value;

            // Prepare the data to be sent
            const data1 = {
              item: nameValues,
              stock: stockValues,
              id: parseInt(xId),
            };

            console.log(nameValues);
            console.log(stockValues);
            console.log(xId);

            // Make a POST request to your API
            fetch("https://inventorymanaging.000webhostapp.com/update.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data1),
            })
              .then((response) => response.json())
              .then((responseData) => {
                // Handle the response from the server
                console.log(responseData);
                appendAlert("Item Updated!", "success");
                popWindow_edit.style.display = "none";
              })
              .catch((error) => {
                // Handle errors
                console.error("Error:", error);
                appendAlert(
                  "Faile to update item to database!. Check the network.",
                  "danger"
                );
              });
          });
        });

        // Add a double-click event listener to each itemDiv
        /*itemDiv.addEventListener("dblclick", () => {
            // You can perform actions when an item is double-clicked
            console.log(`Item double-clicked: ${JSON.stringify(item)}`);
            console.log(
              `Item double-clicked: ${JSON.stringify(item.name)}`
            );
          });*/

        // Create divs for the properties you want to display
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("name");
        nameDiv.textContent = "Name : " + item.name;

        const itemCodeDiv = document.createElement("div");
        itemCodeDiv.classList.add("itemCode");
        itemCodeDiv.textContent = "Item Code : " + item.itemCode;

        const cStockDiv = document.createElement("div");
        cStockDiv.classList.add("cStock");
        cStockDiv.textContent = "Stock : " + item.cStock;

        const skuDiv = document.createElement("div");
        skuDiv.classList.add("sku");
        skuDiv.textContent = "SKU : " + item.sku;

        // Append the property divs to the item div
        itemDiv.appendChild(nameDiv);
        itemDiv.appendChild(itemCodeDiv);
        itemDiv.appendChild(skuDiv);
        itemDiv.appendChild(cStockDiv);

        // Append the item div to the itemListContainer
        itemListContainer.appendChild(itemDiv);
      });
    } else {
      // Handle the case where 'data' is not an array (log or display an error message)
      console.error(
        "Invalid or unexpected response from the server:",
        response
      );
    }
  }

  // Call the function to fetch item data
  fetchItemData();
});
