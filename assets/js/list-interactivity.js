// Handles the "+" button in the event list
function addEventHandler(event) {
    let userListEl = document.querySelector(".user-list");
    let copiedListItem = cloneItem(event.target.closest("li"));
    userListEl.appendChild(copiedListItem);
}

// Handles the "-" button in the user list
function removeEventHandler(event) {
    let userListEl = document.querySelector(".user-list");
    event.target.closest("li").innerHTML = "";
}

// Clone the list item to copy over to another list
function cloneItem(item) {
    let newListEl = document.createElement("li");
    newListEl.setAttribute("class", "user-list-item");
    newListEl.textContent = item.textContent;
    // Remove the text of the button and change to "-"
    newListEl.textContent = newListEl.textContent.replace("➕", "");
    // Create the "-" button in the user's list
    let newListBtnEl = document.createElement("button");
    newListBtnEl.textContent = "-";
    newListEl.appendChild(newListBtnEl);
    return newListEl;
}

$(".first-list").on("click", addEventHandler);
$(".user-list").on("click", removeEventHandler);