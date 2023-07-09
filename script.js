let arr = [];
const btn = document.getElementById("submit");
const inputBox = document.getElementById("box");
const listItems = document.getElementById("list");
console.log(listItems);
const completedItems = document.getElementById("completed");

const dateElement = document.getElementById("date");
function displayDate() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  console.log(formattedDate);
  dateElement.textContent = "Date: " + formattedDate;
}
displayDate();

const leadsJson = JSON.parse(localStorage.getItem("ToDo"));

btn.addEventListener("click", function () {
  //   console.log("clicked");
  arr.push(inputBox.value);
  inputBox.value = "";
  localStorage.setItem("ToDO", JSON.stringify(arr));

  renderListI(arr);
});

function renderListI(listI) {
  let li = "";
  for (let i = 0; i < listI.length; i++) {
    li += `
   <div id="boxes">  
   <li>
    <span>${listI[i]}</span>
    <input type="checkbox" id="list-b" onchange="toggleBtn(this)">
    
  </li>
  </div> 
    `;
  }
  listItems.innerHTML = li;
  console.log(arr);
}

function toggleBtn(checkbox) {
  // const listItem = checkbox.parentNode;
  const listItem = document.getElementById("boxes");
  const textSpan = listItem.querySelector("span");
  if (checkbox.checked) {
    // textSpan.style.textDecoration = "line-through";
    listItem.style.display = "none";
    const completedText = textSpan.textContent;
    completedList(completedText);
    const index = arr.indexOf(completedText);
    if (index > -1) {
      arr.splice(index, 1);
    }
  } else {
    textSpan.style.textDecoration = "none";
    listItem.style.display = "block";
  }
}

function completedList(text) {
  const completedItem = document.createElement("li");
  completedItem.textContent = text;
  completedItems.appendChild(completedItem);
  // completedItem.style.textDecoration = "line-through";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    completedItem.remove();
  });
  completedItem.appendChild(deleteBtn);
}
