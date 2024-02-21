const close_issuing = document.getElementById("clbtn_issuing");
const popWindow_issuing = document.getElementById("popWindow_issuing_stock");
const popUpContainer_issuing = document.getElementById(
  "popUpContainer_issuing"
);

// Flag to track whether the click happened inside or outside the popUpContainer
let insideContainer_for_issuing = false;

popUpContainer_issuing.addEventListener("click", () => {
  insideContainer_for_issuing = true;
  // You can add additional logic if needed
});

close_issuing.addEventListener("click", () => {
  // Check the flag to determine the click location
  if (insideContainer_for_issuing) {
    insideContainer_for_issuing = false; // Reset the flag
  } else {
    popWindow_issuing.style.display = "none";
  }
});

popWindow_issuing.addEventListener("click", () => {
  // Check the flag to determine the click location
  if (insideContainer_for_issuing) {
    insideContainer_for_issuing = false; // Reset the flag
  } else {
    popWindow_issuing.style.display = "none";
  }
});
