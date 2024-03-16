//constant var and fun declaration
let isPopUpMenuVisisble = false;

let purchase = document.getElementById("purchase");

purchase.addEventListener("click", () => {
  fetch("https://inventorymanaging.000webhostapp.com/get_purchase.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((purchase) => {
      loadItems(purchase);
    })
    .catch((error) => console.error("Error:", error.message));
});

function loadItems(items) {
  let items_container = document.getElementById("items_container");

  items_container.innerHTML = "";

  items_container.innerHTML = `<div class="purchase-header">
  <button class="p-btn">
    <a href="purchase.html" target="_blank">Add Purchase</a>
  </button>
</div>
<hr />
<div id="purchase-list-container" class="purchase-list-container"/>`;

  let item_list_container = document.getElementById("purchase-list-container");

  item_list_container.innerHTML = "";
  item_list_container.innerHTML = `
  <div class="row m-2">
    <div class="col-1 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">Sl.No</div>
    <div class="col-2 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">ID</div>
    <div class="col-5 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">Item</div>
    <div class="col-2 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">AMOUNT</div>
    <div class="col-2 col-box" style="background-color: black;color: white;text-align: center;border:1px solid white;padding: 3px;vertical-align: middle;">BALANCE</div>
  </div>`;

  items.data.forEach((item, index) => {
    let listDiv = document.createElement("div");
    listDiv.className = "row m-2 mt-0 mb-0 lists";
    listDiv.innerHTML = `
    <div class="col-1 col-box">${index + 1}</div>
    <div class="col-2 col-box">${item.id}</div>
    <div class="col-5 col-box">${item.party}</div>
    <div class="col-2 col-box">0</div>
    <div class="col-2 col-box">0</div>`;

    item_list_container.appendChild(listDiv);

    listDiv.addEventListener("click", (event) => {
      let temElement = document.querySelectorAll(".selectedItem");
      temElement.forEach((element) => {
        element.classList.remove("selectedItem");
        selectedItemId = 0;
      });
      listDiv.classList.add("selectedItem");
      //selectedItemId = event.currentTarget.id;
      togglePopup(event);
    });
  });

  let deletePurchase = document.getElementById("delete-purchase");
  let makePayment = document.getElementById("make-payment");
  deletePurchase.addEventListener("click", () => {
    console.log("clickeed");
  });

  makePayment.addEventListener("click", () => {
    console.log("clickeed");
  });
}

// JavaScript function to toggle the visibility of the popup menu

function togglePopup(event) {
  var popupMenu = document.getElementById("popupMenu");
  if (popupMenu.style.display !== "none") {
    popupMenu.style.display = "none";
    isPopUpMenuVisisble = false;
  } else {
    isPopUpMenuVisisble = true;
    popupMenu.style.display = "block";
    popupMenu.style.top = `${event.clientY}px`;
    popupMenu.style.left = `${event.clientX}px`;
  }
}

// Close the popup menu if the user clicks outside of it
window.onclick = function (event) {
  var popupMenu = document.getElementById("popupMenu");
  if (event.target !== popupMenu && !popupMenu.contains(event.target)) {
    if (!isPopUpMenuVisisble) {
      popupMenu.style.display = "none";
    } else {
      isPopUpMenuVisisble = false;
    }
  }
};

/* the code below provided was moved to another place*/

//purchase.addEventListener("click", () => {
// let re =
//   '[{"item_id":"1","name":"auther1","number":"925854625"},{"item_id":"2","name":"auther2","number":"925857854"}]';
// response = JSON.parse(re);
// let res =
//   '[{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"21","sku":"20240223012","sprice":"30"},{"id":"2","name":"Apple1","foreign_id":"1","itemCode":"1002","cStock":"21","sku":"20240223012","sprice":"30"},{"id":"3","name":"Apple2","foreign_id":"3","itemCode":"1002","cStock":"21","sku":"20240223012","sprice":"30"}]';

// responses = JSON.parse(res);

// show_purchase_winsow(response, responses);
//});

// let itemListArr = [];
// function show_purchase_winsow(partyData, items) {
//   let popWindow = document.getElementById("popWindow");
//   popWindow.style.display = "grid";
//   let popUpContainer = document.getElementById("popUpContainer");
//   popUpContainer.classList.remove("popContainer");
//   popUpContainer.classList.add("p-container");
//   //popUpContainer.style.width = "90%";
//   //popUpContainer.style.height = "90%";

//   popUpContainer.innerHTML = `<div id="clbtn" class="cls_btns">
//   <div class="purchase-heading"><h6>Add Purchase</h6></div>
//   <div id="close_x" class="close_x">X</div>
// </div>
// <div class="purchase-container">
//   <div class="box">
//     <div class="row">
//       <div class="col-25">
//         <label for="party">Party Name</label>
//       </div>
//       <div class="col-75">
//         <select id="party" name="party">
//           <option value="None">No Party</option>
//         </select>
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-25">
//         <label for="mNumber">Mobile No</label>
//       </div>
//       <div class="col-75">
//         <input
//           type="text"
//           disabled
//           style="border: none"
//           id="mNumber"
//           name="mNumber"
//           placeholder="Mobile Number"
//         />
//       </div>
//     </div>
//   </div>
//   <div class="box">
//     <div class="row">
//       <div class="col-25">
//         <label for="bNumber">Bill No</label>
//       </div>
//       <div class="col-75">
//         <input
//           type="text"
//           disabled
//           style="border: none"
//           id="bNumber"
//           name="bNumber"
//           placeholder="Bill Number"
//         />
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-25">
//         <label for="bDate">Date</label>
//       </div>
//       <div class="col-75">
//         <input
//           type="text"
//           disabled
//           style="border: none"
//           id="bDate"
//           name="bDate"
//           placeholder="Bill Date"
//         />
//       </div>
//     </div>
//   </div>
// </div>

// <div class="sub-container mt-4 d-flex justify-content-center">
//   <select id="search"
//   name="search"
//   placeholder="Add Items"></select>
// </div>
// <div id="list-container" class="list-container mt-2">
//   <div class="row m-2">
//     <div class="col-1 col-box">Sl No</div>
//     <div class="col-5 col-box">Item</div>
//     <div class="col-2 col-box">Quantity</div>
//     <div class="col-1 col-box">Unit</div>
//     <!--<div class="col-1 col-box">MRP</div>-->
//     <div class="col-2 col-box">Unit Price</div>
//     <div class="col-1 col-box">Total</div>
//   </div>

//   <div id="itemList" class="listCont">
//   </div>
//   <!--<div class="row m-2 mt-0">
//     <div class="col-1 col-box p-0">
//       <input
//         type="text"
//         name=""
//         id=""
//         style="width: 100%; border: none"
//       />
//     </div>
//     <div class="col-4 col-box">Item</div>
//     <div class="col-2 col-box">Quantity</div>
//     <div class="col-1 col-box">Unit</div>
//     <div class="col-1 col-box">MRP</div>
//     <div class="col-2 col-box">Unit Price</div>
//     <div class="col-1 col-box">Total</div>
//   </div>-->

// </div>

// <div class="list-container pay_method">
//   <div class="lase-box col-6 p-5 pt-3">
//     <div class="row">
//       <div class="col-6">
//         <label for="pType">Payment Type</label>
//       </div>
//       <div class="col-6">
//         <select id="pType">
//           <option value="C">Cash</option>
//           <option value="IMPS">IMPS</option>
//         </select>
//       </div>
//     </div>

//     <div class="row mt-4">
//       <div class="col-4">
//         <label for="remarks">Remarks</label>
//       </div>
//       <div class="col-8">
//         <textarea id="remarks" name="remarks"></textarea>
//       </div>
//     </div>
//   </div>
//   <div class="lase-box col-6 p-5 pt-3">
//     <div class="row">
//       <div class="col-6">
//         <label for="btotal">Total</label>
//       </div>
//       <div class="col-6">
//         <input
//           type="text"
//           disabled
//           style="border: none"
//           id="btotal"
//           name="btotal"
//           placeholder="Total Amount"
//         />
//       </div>
//     </div>

//     <div class="row">
//       <div class="col-6">
//         <label for="discount">Discount</label>
//       </div>
//       <div class="col-6">
//         <input type="text" id="discount" name="discount" value="0" />
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-6">
//         <label for="pAmount">Payable Amount</label>
//       </div>
//       <div class="col-6">
//         <input
//           type="text"
//           style="border: none"
//           id="pAmount"
//           name="pAmount"
//           placeholder="Payable Amount"
//         />
//       </div>
//     </div>

//     <div class="row">
//       <div class="col-6">
//         <label for="Paid">Paid</label>
//       </div>
//       <div class="col-6">
//         <input
//           type="text"
//           style="border: none"
//           id="paid"
//           name="paid"
//           placeholder="paid" value="0"
//         />
//       </div>
//     </div>

//     <div class="row pt-3">
//       <div class="col-6">
//         <input
//           id="cancel_purchase"
//           type="submit"
//           value="Cancel"
//           style="width: 100%; padding: 10px"
//         />
//       </div>
//       <div class="col-6">
//         <input
//           id="cancel_purchase"
//           type="submit"
//           value="Save"
//           style="width: 100%; padding: 10px"
//         />
//       </div>
//     </div>
//   </div>
// </div>`;

//   let party = document.getElementById("party");
//   let billDate = document.getElementById("bDate");
//   let billNumber = document.getElementById("bNumber");
//   let mobileNum = document.getElementById("mNumber");
//   let search = document.getElementById("search");

//   partyData.forEach((item) => {
//     let optionElement = document.createElement("option");
//     optionElement.value = item.item_id;
//     optionElement.text = item.name;
//     party.appendChild(optionElement);
//   });

//   party.addEventListener("change", function (event) {
//     let ob = partyData.find((item) => item.item_id === event.target.value);
//     mobileNum.value = ob.number;
//   });

//   let primeFlag = true;

//   items.forEach((item) => {
//     let optionElement = document.createElement("option");
//     if (primeFlag) {
//       let noneElm = document.createElement("option");
//       noneElm.value = 0;
//       noneElm.text = "Select Item";
//       search.appendChild(noneElm);
//       primeFlag = false;
//     }
//     optionElement.value = item.id;
//     optionElement.text = item.name;
//     search.appendChild(optionElement);
//   });

//   search.addEventListener("change", (event) => {
//     // Access the selected option using event.target
//     let selectedOption = event.target.value;
//     let ob = items.find((item) => item.id === selectedOption);
//     let listContainer = document.getElementById("itemList");

//     const objectExists = itemListArr.some((item) => item.id === ob.id);

//     ob.quantity = 1;
//     ob.total = parseInt(ob.quantity) * parseInt(ob.sprice);
//     //If the object doesn't exist, add it to the array
//     if (!objectExists) {
//       console.log(itemListArr);
//       itemListArr.push(ob);
//     } else {
//       alert("Item already added.");
//     }

//     //itemListArr.push(ob);

//     listContainer.innerHTML = "";
//     let itemCount = 0;
//     itemListArr.forEach((item, index) => {
//       itemCount += 1;
//       let idFor = "quantity" + item.id;
//       let ids = item.id;
//       console.log(item.total);
//       console.log(item);
//       console.log(itemListArr);

//       const newRowDiv = document.createElement("div");
//       newRowDiv.className = "row m-2 mt-0 mb-0 subItems";
//       newRowDiv.innerHTML = `
//       <div class="col-1 col-box">${itemCount}</div>
//       <div class="col-5 col-box">${item.name}</div>
//       <div class="col-2 col-box p-0"><input onchange="myQuantity(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>
//       <div class="col-1 col-box p-0">kg</div>
//       <!--<div class="col-1 col-box p-0"><input onchange="myFunction(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>-->
//       <div class="col-2 col-box p-0"><input onchange="myPrice(this, ${ids})" style="width:100%;" value="${item.sprice}"/></div>
//       <div id="total" class="col-1 col-box p-0">${item.total}</div>
//       `;

//       // Append the newly created div to the container div
//       listContainer.appendChild(newRowDiv);
//     });

//     addTotal();
//     getDiscount();

//   });

//   billDate.value = getCurrentDate();
//   billNumber.value = generateUniqueCode(existingCodes);

//   function findObjectById(id) {
//     return response.find((item) => item.item_id === id);
//   }

//   let close_btn = document.getElementById("close_x");
//   // Flag to track whether the click happened inside or outside the popUpContainer
//   let insideContainer = false;

//   popUpContainer.addEventListener("click", () => {
//     insideContainer = true;
//   });

//   close_btn.addEventListener("click", () => {
//     // Check the flag to determine the click location
//     if (insideContainer) {
//       insideContainer = false; // Reset the flag
//     } else {
//       popWindow.style.display = "none";
//     }
//   });

//   popWindow.addEventListener("click", () => {
//     // Check the flag to determine the click location
//     if (insideContainer) {
//       insideContainer = false; // Reset the flag
//     } else {
//       popWindow.style.display = "none";
//     }
//   });
// }

// //function to calculate discount
// function getDiscount() {
//   let discount = document.getElementById('discount');
//   discount.addEventListener('change', (event)=>{
//     let val = event.target.value;
//     let pAmount = document.getElementById('pAmount');
//     pAmount.value = parseInt(addTotal()) - parseInt(val);
//   });
//   let pAmount = document.getElementById('pAmount');
//   pAmount.value = parseInt(addTotal()) - parseInt(discount.value);
// }

// //function to find and publish total
// function addTotal() {
//   let totalInput = document.getElementById('btotal');
//   const totalSum = itemListArr.reduce((sum, item) => sum + parseFloat(item.total), 0);
//   totalInput.value= totalSum;
//   return totalSum;
// }

// function myQuantity(inputElement, ids) {
//   // Access the value of the input element
//   var inputValue = inputElement.value;
//   let clkObj = itemListArr.find((item) => {
//     return parseInt(item.id) ===parseInt(ids);
//   });
//   clkObj.quantity = inputValue;
//   clkObj.total = parseInt(inputValue) * parseInt(clkObj.sprice);
//   updateObjectById(itemListArr, ids, clkObj);

//   let listContainer = document.getElementById("itemList");
//   listContainer.innerHTML = "";
//     let itemCount = 0;
//     itemListArr.forEach((item) => {
//       itemCount += 1;
//       let ids = item.id;

//       const newRowDiv = document.createElement("div");
//       newRowDiv.className = "row m-2 mt-0 mb-0 subItems";
//       newRowDiv.innerHTML = `
//       <div class="col-1 col-box">${itemCount}</div>
//       <div class="col-5 col-box">${item.name}</div>
//       <div class="col-2 col-box p-0"><input onchange="myQuantity(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>
//       <div class="col-1 col-box p-0">kg</div>
//       <!--<div class="col-1 col-box p-0"><input onchange="myFunction(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>-->
//       <div class="col-2 col-box p-0"><input onchange="myPrice(this, ${ids})" style="width:100%;" value="${item.sprice}"/></div>
//       <div id="total" class="col-1 col-box p-0">${item.total}</div>
//       `;

//       // Append the newly created div to the container div
//       listContainer.appendChild(newRowDiv);
//       addTotal();
//       getDiscount();
//     });
// }

// function myPrice(inputElement, ids) {
//   // Access the value of the input element
//   var inputValue = inputElement.value;
//   let clkObj = itemListArr.find((item) => {
//     return parseInt(item.id) ===parseInt(ids);
//   });
//   clkObj.sprice = inputValue;
//   clkObj.total = parseInt(clkObj.quantity) * parseInt(inputValue);
//   updateObjectById(itemListArr, ids, clkObj);
//   let listContainer = document.getElementById("itemList");
//   listContainer.innerHTML = "";
//     let itemCount = 0;
//     itemListArr.forEach((item) => {
//       itemCount += 1;
//       let ids = item.id;

//       const newRowDiv = document.createElement("div");
//       newRowDiv.className = "row m-2 mt-0 mb-0 subItems";
//       newRowDiv.innerHTML = `
//       <div class="col-1 col-box">${itemCount}</div>
//       <div class="col-5 col-box">${item.name}</div>
//       <div class="col-2 col-box p-0"><input onchange="myQuantity(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>
//       <div class="col-1 col-box p-0">kg</div>
//       <!--<div class="col-1 col-box p-0"><input onchange="myFunction(this, ${ids})" style="width:100%;" value="${item.quantity}"/></div>-->
//       <div class="col-2 col-box p-0"><input onchange="myPrice(this, ${ids})" style="width:100%;" value="${item.sprice}"/></div>
//       <div id="total" class="col-1 col-box p-0">${item.total}</div>
//       `;

//       // Append the newly created div to the container div
//       listContainer.appendChild(newRowDiv);
//       addTotal();
//       getDiscount();
//     });
// }

// //function to update object
// function updateObjectById(array, id, updatedObject) {
//   const index = array.findIndex(obj => {
//     return parseInt(obj.id) === parseInt(id);
//   });

//   if (index !== -1) {
//     // If the object with the specified ID is found, update it
//     array[index] = { ...array[index], ...updatedObject };
//   } else {
//     // Handle the case where the object with the specified ID is not found
//     console.error('Object not found with ID:', id);
//   }
// }

// //brlow code is responsible for generation of 12 digit code,.

// const existingCodes = []; // Keep track of generated codes

// function generateUniqueCode(existingCodes) {
//   let code;
//   do {
//     code = generateRandomCode();
//   } while (existingCodes.includes(code));

//   return code;
// }

// function generateRandomCode() {
//   const currentDate = getCurrentDate();
//   const currentTime = getCurrentTime();

//   // Combine date and time to form a 10-digit code
//   const code = currentDate + currentTime;
//   return code;
// }

// function getCurrentDate() {
//   const now = new Date();
//   const dd = String(now.getDate()).padStart(2, "0");
//   const mm = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
//   const yy = String(now.getFullYear()).slice(-2);

//   return dd +"-"+ mm +"-"+ yy;
// }

// function getCurrentTime() {
//   const now = new Date();
//   const hours = String(now.getHours()).padStart(2, "0");
//   const minutes = String(now.getMinutes()).padStart(2, "0");
//   const seconds = String(now.getSeconds()).padStart(2, "0");

//   // Use only the last 4 digits of the time for variety
//   return hours + minutes + seconds;
// }

// //for table functionality
// /*const dataTable = document.getElementById("dataTable");
// const emptyRow = document.getElementById("emptyRow");

// emptyRow.addEventListener("input", function () {
//   const newRow = emptyRow.cloneNode(true);
//   dataTable.appendChild(newRow);
// });*/
