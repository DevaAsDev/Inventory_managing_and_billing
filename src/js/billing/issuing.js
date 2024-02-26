let issuing = document.getElementById("issuing");
issuing.addEventListener("click", () => {
  show_popup();
});

function show_popup() {
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
              name="Name">
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
