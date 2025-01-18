const Links = document.querySelectorAll("[data-tab-panel] > li > a");
const Tabs = document.querySelectorAll("[data-tab-content]");

let Title = ["Mohd Aman Shah - ", Tabs.item(0).id];
let TabIndex = 1;

document.title = Title.join("");
Links.forEach((element) => {
  element.addEventListener("click", LinkEventHandler);
});


function LinkEventHandler(element) {
  
  Links.forEach((ele) => {
    ele.classList.remove("active");
  });
  
  Tabs.forEach((ele) => {
    ele.classList.remove("active");
  });
  
  element.target.classList.add("active");
  document
    .querySelector(element.target.dataset.tabTarget)
    .classList.add("active");
  Title[1] = element.target.dataset.tabTarget.substr(1);
  document.title = Title.join("");
}
