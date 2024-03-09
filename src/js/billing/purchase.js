let purchase = document.getElementById("purchase");

purchase.addEventListener("click", () => {
  let re =
    '[{"item_id":"1","name":"auther1","number":"925854625"},{"item_id":"2","name":"auther2","number":"925857854"}]';

  response = JSON.parse(re);

  let res =
    '[{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"21","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"0","sku":"20240223013"},{"id":"1","name":"Apple","foreign_id":"2","itemCode":"1002","cStock":"0","sku":"20240223012"},{"id":"2","name":"Beetroot","foreign_id":"3","itemCode":"1003","cStock":"47","sku":"20240223013"}]';

  responses = JSON.parse(res);

  show_purchase_winsow(response, responses);
});

function show_purchase_winsow(partyData, items) {
  let popWindow = document.getElementById("popWindow");
  popWindow.style.display = "grid";
  let popUpContainer = document.getElementById("popUpContainer");
  popUpContainer.classList.remove("popContainer");
  popUpContainer.classList.add("p-container");
  //popUpContainer.style.width = "90%";
  //popUpContainer.style.height = "90%";

  popUpContainer.innerHTML = `<div id="clbtn" class="cls_btns">
  <div class="purchase-heading"><h6>Add Purchase</h6></div>
  <div id="close_x" class="close_x">X</div>
</div>
<div class="purchase-container">
  <div class="box">
    <div class="row">
      <div class="col-25">
        <label for="party">Party Name</label>
      </div>
      <div class="col-75">
        <select id="party" name="party">
          <option value="None">No Party</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="mNumber">Mobile No</label>
      </div>
      <div class="col-75">
        <input
          type="text"
          disabled
          style="border: none"
          id="mNumber"
          name="mNumber"
          placeholder="Mobile Number"
        />
      </div>
    </div>
  </div>
  <div class="box">
    <div class="row">
      <div class="col-25">
        <label for="bNumber">Bill No</label>
      </div>
      <div class="col-75">
        <input
          type="text"
          disabled
          style="border: none"
          id="bNumber"
          name="bNumber"
          placeholder="Bill Number"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="bDate">Date</label>
      </div>
      <div class="col-75">
        <input
          type="text"
          disabled
          style="border: none"
          id="bDate"
          name="bDate"
          placeholder="Bill Date"
        />
      </div>
    </div>
  </div>
</div>

<div class="sub-container mt-4 d-flex justify-content-center">
  <select id="search"
  name="search"
  placeholder="Add Items"></select>
</div>
<div class="list-container mt-5">
  <div class="row m-2">
    <div class="col-1 col-box">Sl No</div>
    <div class="col-4 col-box">Item</div>
    <div class="col-2 col-box">Quantity</div>
    <div class="col-1 col-box">Unit</div>
    <div class="col-1 col-box">MRP</div>
    <div class="col-2 col-box">Sales Price</div>
    <div class="col-1 col-box">Total</div>
  </div>
  <div class="row m-2 mt-0">
    <div class="col-1 col-box p-0">
      <input
        type="text"
        name=""
        id=""
        style="width: 100%; border: none"
      />
    </div>
    <div class="col-4 col-box">Item</div>
    <div class="col-2 col-box">Quantity</div>
    <div class="col-1 col-box">Unit</div>
    <div class="col-1 col-box">MRP</div>
    <div class="col-2 col-box">Sales Price</div>
    <div class="col-1 col-box">Total</div>
  </div>
  <!-- <table id="dataTable">
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>MRP</th>
        <th>Sales Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr id="emptyRow">
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td></td>
      </tr>
    </tbody>
  </table> -->
</div>
<div class="list-container pay_method">
  <div class="lase-box col-6 p-5">
    <div class="row">
      <div class="col-6">
        <label for="pType">Payment Type</label>
      </div>
      <div class="col-6">
        <select id="pType">
          <option value="C">Cash</option>
          <option value="U">UPI</option>
          <option value="CR">Credit</option>
        </select>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-4">
        <label for="remarks">Remarks</label>
      </div>
      <div class="col-8">
        <textarea id="remarks" name="remarks"></textarea>
      </div>
    </div>
  </div>
  <div class="lase-box col-6 p-5">
    <div class="row">
      <div class="col-6">
        <label for="total">Total</label>
      </div>
      <div class="col-6">
        <input
          type="text"
          disabled
          style="border: none"
          id="total"
          name="total"
          placeholder="Total Amount"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <label for="discount">Discount</label>
      </div>
      <div class="col-6">
        <input type="text" id="discount" name="discount" value="0" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <label for="pAmount">Payable Amount</label>
      </div>
      <div class="col-6">
        <input
          type="text"
          style="border: none"
          id="pAmount"
          name="pAmount"
          placeholder="Payable Amount"
        />
      </div>
    </div>

    <div class="row pt-5">
      <div class="col-6">
        <input
          id="cancel_purchase"
          type="submit"
          value="Cancel"
          style="width: 100%; padding: 10px"
        />
      </div>
      <div class="col-6">
        <input
          id="cancel_purchase"
          type="submit"
          value="Save"
          style="width: 100%; padding: 10px"
        />
      </div>
    </div>
  </div>
</div>`;

  let party = document.getElementById("party");
  let billDate = document.getElementById("bDate");
  let billNumber = document.getElementById("bNumber");
  let mobileNum = document.getElementById("mNumber");
  let search = document.getElementById("search");

  partyData.forEach((item) => {
    let optionElement = document.createElement("option");
    optionElement.value = item.item_id;
    optionElement.text = item.name;
    party.appendChild(optionElement);
  });

  party.addEventListener("change", function (event) {
    let ob = findObjectById(event.target.value);
    mobileNum.value = ob.number;
  });

  let primeFlag = true;

  items.forEach((item) => {
    let optionElement = document.createElement("option");
    if (primeFlag) {
      let noneElm = document.createElement("option");
      noneElm.value = 0;
      noneElm.text = "Select Item";
      search.appendChild(noneElm);
      primeFlag = false;
    }
    optionElement.value = item.item_id;
    optionElement.text = item.name;
    search.appendChild(optionElement);
  });

  billDate.value = getCurrentDate();
  billNumber.value = generateUniqueCode(existingCodes);

  /* popUpContainer.innerHTML = `
    <div id="clbtn" class="cls_btns">X</div>
    `;*/

  function findObjectById(id) {
    return partyDatas.find((item) => item.item_id === id);
  }

  let close_btn = document.getElementById("close_x");
  // Flag to track whether the click happened inside or outside the popUpContainer
  let insideContainer = false;

  popUpContainer.addEventListener("click", () => {
    insideContainer = true;
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

//brlow code is responsible for generation of 12 digit code,.

const existingCodes = []; // Keep track of generated codes

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

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Use only the last 4 digits of the time for variety
  return hours + minutes + seconds;
}

//for table functionality
const dataTable = document.getElementById("dataTable");
const emptyRow = document.getElementById("emptyRow");

emptyRow.addEventListener("input", function () {
  const newRow = emptyRow.cloneNode(true);
  dataTable.appendChild(newRow);
});
