var currListItem;

// Modal related functions
var modal = document.getElementById("remove-modal");
var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
$("#modal-confirm").click(function() {
    let listItem = document.querySelector("[data-name= '" + currListItem + "']");
    listItem.closest("ul").removeChild(listItem.closest("li"));
    modal.style.display = "none";
});

// Handles the "+" button in the event list
function addEventHandler(event) {
    let userListEl = document.querySelector(".user-list");
    let copiedListItem = cloneItem(event.target.closest("li"));
    userListEl.appendChild(copiedListItem);
}

// Handles the "-" button in the user list
function removeEventHandler(event) {
    let modalContent = document.querySelector(".modal-content-p");
    modalContent.textContent = "You're about to remove " + event.target.closest("li").getAttribute("data-name") + ", are you sure?";
    modal.style.display = "block";
    currListItem = event.target.closest("li").getAttribute("data-name");
}

// Clone the list item to copy over to another list
function cloneItem(item) {
    let newListEl = document.createElement("li");
    newListEl.setAttribute("class", "user-list-item");
    newListEl.setAttribute("data-name", item.getAttribute("data-name") + " (user)");
    newListEl.textContent = item.textContent;
    // Remove the text of the button since textContent get the texts in the child elements as well
    newListEl.textContent = newListEl.textContent.replace("➕", "");
    // Create the "-" button in the user's list
    let newListBtnEl = document.createElement("button");
    newListBtnEl.textContent = "-";
    newListEl.appendChild(newListBtnEl);
    return newListEl;
}

$(".first-list").on("click", addEventHandler);
$(".user-list").on("click", removeEventHandler);