//global constant and var
let itemListArr = [];
const existingCodes = []; // Keep track of generated codes
let selectedItemId = 0;

let mobileNumber = 0;
let party_name = "";
let party_id = 0;

fetchPartyData();

function fetchPartyData() {
  fetch("https://inventorymanaging.000webhostapp.com/shopItems.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((item) => {
      show_item_window(item);
    })
    .catch((error) => console.error("Error:", error.message));
}

function show_item_window(items) {
  let popWindow = document.getElementById("popWindow");
  popWindow.style.display = "grid";
  let popUpContainer = document.getElementById("popUpContainer");
  popUpContainer.classList.remove("popContainer");
  popUpContainer.classList.add("p-container");

  let billDate = document.getElementById("bDate");
  let billNumber = document.getElementById("bNumber");
  let search = document.getElementById("search");

  let primeFlag = true;

  items.data.forEach((item) => {
    let optionElement = document.createElement("option");
    if (primeFlag) {
      let noneElm = document.createElement("option");
      noneElm.value = 0;
      noneElm.text = "Select Item";
      search.appendChild(noneElm);
      primeFlag = false;
    }
    optionElement.value = item.id;
    optionElement.text = item.name;
    search.appendChild(optionElement);
  });

  search.addEventListener("change", (event) => {
    // Access the selected option using event.target
    let selectedOption = event.target.value;
    let ob = items.data.find((item) => item.id === selectedOption);
    let listContainer = document.getElementById("itemList");

    const objectExists = itemListArr.some((item) => item.id === ob.id);

    ob.quantity = 1;
    ob.total = parseInt(ob.quantity) * parseInt(ob.sprice);
    //If the object doesn't exist, add it to the array
    if (!objectExists) {
      itemListArr.push(ob);
    } else {
      alert("Item already added.");
    }

    //itemListArr.push(ob);

    listContainer.innerHTML = "";
    let itemCount = 0;
    itemListArr.forEach((item, index) => {
      itemCount += 1;
      let ids = item.id;

      const newRowDiv = document.createElement("div");
      newRowDiv.className = "row m-2 mt-0 mb-0 subItems";
      newRowDiv.id = ids;
      newRowDiv.innerHTML = `
      <div class="col-1 col-box">${itemCount}</div>
      <div class="col-5 col-box">${item.name}</div>
      <div class="col-2 col-box p-0"><input onchange="myQuantity(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>
      <div class="col-1 col-box p-0">kg</div>
      <!--<div class="col-1 col-box p-0"><input onchange="myFunction(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>-->
      <div class="col-2 col-box p-0"><input onchange="myPrice(this, ${ids})" style="width:100%;" value="${item.sprice}"/></div>
      <div id="total" class="col-1 col-box p-0">${item.total}</div>
      `;

      // Append the newly created div to the container div
      listContainer.appendChild(newRowDiv);
      newRowDiv.addEventListener("click", (event) => {
        let temElement = document.querySelectorAll(".selectedItem");
        temElement.forEach((element) => {
          element.classList.remove("selectedItem");
          selectedItemId = 0;
        });
        newRowDiv.classList.add("selectedItem");
        selectedItemId = event.currentTarget.id;
      });
    });

    addTotal();
    getDiscount();
  });

  billDate.value = getCurrentDateWith();
  billNumber.value = "S" + generateUniqueCode(existingCodes);

  // function findObjectById(id) {
  //   return response.data.find((item) => item.item_id === id);
  // }
}

//function to calculate discount
function getDiscount() {
  let discount = document.getElementById("discount");
  discount.addEventListener("change", (event) => {
    let val = parseFloat(event.target.value);
    let pAmount = document.getElementById("pAmount");
    // Validate discount value (optional)
    if (isNaN(val) || val < 0) {
      alert("Please enter a valid discount value (positive number).");
      return; // Exit the function if discount is invalid
    } else {
      pAmount.value = parseInt(addTotal()) - parseInt(val);
    }
  });
  let pAmount = document.getElementById("received");
  pAmount.value = parseInt(addTotal()) - parseInt(discount.value);
}

//function to find and publish total
function addTotal() {
  let totalInput = document.getElementById("btotal");
  const totalSum = itemListArr.reduce(
    (sum, item) => sum + parseFloat(item.total),
    0
  );
  totalInput.value = totalSum;
  return totalSum;
}

function myQuantity(inputElement, ids) {
  // Access the value of the input element
  var inputValue = inputElement.value;
  let clkObj = itemListArr.find((item) => {
    return parseInt(item.id) === parseInt(ids);
  });
  clkObj.quantity = inputValue;
  clkObj.total = parseInt(inputValue) * parseInt(clkObj.sprice);
  updateObjectById(itemListArr, ids, clkObj);

  let listContainer = document.getElementById("itemList");
  listContainer.innerHTML = "";
  let itemCount = 0;
  itemListArr.forEach((item) => {
    itemCount += 1;
    let ids = item.id;

    const newRowDiv = document.createElement("div");
    newRowDiv.className = "row m-2 mt-0 mb-0 subItems";
    newRowDiv.innerHTML = `
      <div class="col-1 col-box">${itemCount}</div>
      <div class="col-5 col-box">${item.name}</div>
      <div class="col-2 col-box p-0"><input onchange="myQuantity(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>
      <div class="col-1 col-box p-0">kg</div>
      <!--<div class="col-1 col-box p-0"><input onchange="myFunction(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>-->
      <div class="col-2 col-box p-0"><input onchange="myPrice(this, ${ids})" style="width:100%;" value="${item.sprice}"/></div>
      <div id="total" class="col-1 col-box p-0">${item.total}</div>
      `;

    // Append the newly created div to the container div
    listContainer.appendChild(newRowDiv);
    newRowDiv.addEventListener("click", (event) => {
      let temElement = document.querySelectorAll(".selectedItem");
      temElement.forEach((element) => {
        element.classList.remove("selectedItem");
        selectedItemId = 0;
      });
      newRowDiv.classList.add("selectedItem");
      selectedItemId = event.currentTarget.id;
    });
    addTotal();
    getDiscount();
  });
}

function myPrice(inputElement, ids) {
  // Access the value of the input element
  var inputValue = inputElement.value;
  let clkObj = itemListArr.find((item) => {
    return parseInt(item.id) === parseInt(ids);
  });
  clkObj.sprice = inputValue;
  clkObj.total = parseInt(clkObj.quantity) * parseInt(inputValue);
  updateObjectById(itemListArr, ids, clkObj);
  let listContainer = document.getElementById("itemList");
  listContainer.innerHTML = "";
  let itemCount = 0;
  itemListArr.forEach((item) => {
    itemCount += 1;
    let ids = item.id;

    const newRowDiv = document.createElement("div");
    newRowDiv.className = "row m-2 mt-0 mb-0 subItems";
    newRowDiv.innerHTML = `
      <div class="col-1 col-box">${itemCount}</div>
      <div class="col-5 col-box">${item.name}</div>
      <div class="col-2 col-box p-0"><input onchange="myQuantity(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>
      <div class="col-1 col-box p-0">kg</div>
      <!--<div class="col-1 col-box p-0"><input onchange="myFunction(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>-->
      <div class="col-2 col-box p-0"><input onchange="myPrice(this, ${ids})" style="width:100%;" value="${item.sprice}"/></div>
      <div id="total" class="col-1 col-box p-0">${item.total}</div>
      `;

    // Append the newly created div to the container div
    listContainer.appendChild(newRowDiv);
    newRowDiv.addEventListener("click", (event) => {
      let temElement = document.querySelectorAll(".selectedItem");
      temElement.forEach((element) => {
        element.classList.remove("selectedItem");
        selectedItemId = 0;
      });
      newRowDiv.classList.add("selectedItem");
      selectedItemId = event.currentTarget.id;
    });
    addTotal();
    getDiscount();
  });
}

//function to update object
function updateObjectById(array, id, updatedObject) {
  const index = array.findIndex((obj) => {
    return parseInt(obj.id) === parseInt(id);
  });

  if (index !== -1) {
    // If the object with the specified ID is found, update it
    array[index] = { ...array[index], ...updatedObject };
  } else {
    // Handle the case where the object with the specified ID is not found
    console.error("Object not found with ID:", id);
  }
}

//brlow code is responsible for generation of 12 digit code,.

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

function getCurrentDate() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const yy = String(now.getFullYear()).slice(-2);

  return dd + mm + yy;
}

function getCurrentDateWith() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const yy = String(now.getFullYear()).slice(-2);

  return dd + "-" + mm + "-" + yy;
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Use only the last 4 digits of the time for variety
  return hours + minutes + seconds;
}

let remove = document.getElementById("remove");
remove.addEventListener("click", () => {
  if (selectedItemId < 1) {
    alert("Select an item");
  } else {
    itemListArr = itemListArr.filter((item) => item.id !== selectedItemId);
    let listContainer = document.getElementById("itemList");
    listContainer.innerHTML = "";
    let itemCount = 0;
    itemListArr.forEach((item) => {
      itemCount += 1;
      let ids = item.id;

      const newRowDiv = document.createElement("div");
      newRowDiv.className = "row m-2 mt-0 mb-0 subItems";
      newRowDiv.innerHTML = `
      <div class="col-1 col-box">${itemCount}</div>
      <div class="col-5 col-box">${item.name}</div>
      <div class="col-2 col-box p-0"><input onchange="myQuantity(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>
      <div class="col-1 col-box p-0">kg</div>
      <!--<div class="col-1 col-box p-0"><input onchange="myFunction(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>-->
      <div class="col-2 col-box p-0"><input onchange="myPrice(this, ${ids})" style="width:100%;" value="${item.sprice}"/></div>
      <div id="total" class="col-1 col-box p-0">${item.total}</div>
      `;

      // Append the newly created div to the container div
      listContainer.appendChild(newRowDiv);
      newRowDiv.addEventListener("click", (event) => {
        let temElement = document.querySelectorAll(".selectedItem");
        temElement.forEach((element) => {
          element.classList.remove("selectedItem");
          selectedItemId = 0;
        });
        newRowDiv.classList.add("selectedItem");
        selectedItemId = event.currentTarget.id;
      });
      addTotal();
      getDiscount();
    });
  }
});

let save_purchase = document.getElementById("save_purchase");
let cancel_purchase = document.getElementById("cancel_purchase");

save_purchase.addEventListener("click", () => {
  let name = document.getElementById("name").value;
  let mobileNum = document.getElementById("mNumber").value;
  let bNumber = document.getElementById("bNumber");

  let discount = document.getElementById("discount");
  let paid = document.getElementById("received");

  let pType = document.getElementById("pType");
  let remarks = document.getElementById("remarks");
  let totalAmout = addTotal();

  const purchase_data = {
    bId: bNumber.value,
    pName: name,
    pNumber: mobileNum,
    discount: discount.value,
    paid: paid.value,
    pType: pType.value,
    remarks: remarks.value,
    totalAmout: totalAmout,
    date: getCurrentDate(),
    time: getCurrentTime(),
    items: itemListArr,
  };

  // Make a POST request to your API
  fetch("https://inventorymanaging.000webhostapp.com/add_sales.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchase_data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      // Handle the response from the server
      console.log(responseData);
      window.close();
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
});

cancel_purchase.addEventListener("click", () => {
  window.close();
});
