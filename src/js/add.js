const add_item = document.getElementById("btn-item");
add_item.addEventListener("click", () => {
  const stockInput = document.getElementById("stock");
  const nameInput = document.getElementById("name");
  const popWindow = document.getElementById("popWindow");

  // Get the value of the input
  const nameValue = nameInput.value;
  const stockValue = stockInput.value;

  // Prepare the data to be sent
  const data = {
    item: nameValue,
    stock: stockValue,
  };

  // Make a POST request to your API
  fetch("https://inventorymanaging.000webhostapp.com/add.php", {
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
      appendAlert("Item Added!", "success");
      popWindow.style.display = "none";
      fetchItemData();
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
