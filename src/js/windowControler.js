const close_btn = document.getElementById("clbtn");
const popWindow = document.getElementById("popWindow");
const add_product = document.getElementById("add_product");
const popUpContainer = document.getElementById("popUpContainer");

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

add_product.addEventListener("click", () => {
  popWindow.style.display = "grid";
});
