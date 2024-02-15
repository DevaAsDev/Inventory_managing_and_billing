const stockItem = document.getElementById("stock");
const mainContainer = document.getElementById("mainContainer");
/*/stockItem.addEventListener("click", () => {
        mainContainer.style.display = "none";
      });*/

function changeStock(element) {
  setActive(element);
  mainContainer.style.display = "none";
}

function viewInventory(element) {
  setActive(element);
  mainContainer.style.display = "grid";
}

function viewDashboard(element) {
  setActive(element);
}

function setActive(element) {
  // Remove 'active' class from all menu items
  var menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Add 'active' class to the selected menu item
  element.classList.add("active");
}
