var currListItemID;
var currListItem;

// Renders the event list after retrieving data from the POI API call
async function renderEvents(lat, lon) {
    let data = await getPOIlist(lat, lon);
    console.log(data);
    for (let i = 0; i < 10; i++) {
        let eventULEl = document.querySelector(".first-list");
        let newEventEl = document.createElement("li");
        newEventEl.setAttribute("class", "first-list-item box");
        newEventEl.setAttribute("data-id", data[i].id);
        newEventEl.textContent = data[i].name + " ";
        let addBtnEL = document.createElement("button");
        addBtnEL.setAttribute("class", "add-btn");
        addBtnEL.textContent = "➕";
        newEventEl.appendChild(addBtnEL);
        eventULEl.appendChild(newEventEl);
    }
}

// Handles the "+" button in the event list
async function addEventHandler(event) {
    let userListEl = document.querySelector(".user-list");
    let currentListItem = event.target.closest("li");
    let copiedListItem = cloneItem(currentListItem, "remove-btn");
    userListEl.appendChild(copiedListItem);
    currentListItem.remove();
}

// Handles the "-" button in the user list
function removeEventHandler(event) {
    let modalContent = document.querySelector(".modal-content-p");
    modalContent.textContent = "You're about to remove " + event.target.closest("li").getAttribute("data-id") + ", are you sure?";
    modal.style.display = "block";
    currListItemID = event.target.closest("li").getAttribute("data-id");
}

// Clone the list item to copy over to another list
function cloneItem(item, btnClass) {
    let newListEl = document.createElement("li");
    newListEl.setAttribute("class", "user-list-item box");
    newListEl.textContent = item.textContent;
    // Remove the text of the button since textContent get the texts in the child elements as well
    newListEl.textContent = newListEl.textContent.replace("➕", "").slice(0, -1);
    newListEl.setAttribute("data-id", newListEl.textContent);
    newListEl.textContent = newListEl.textContent + " ";
    // Create the "-" button in the user's list
    let newListBtnEl = document.createElement("button");
    newListBtnEl.textContent = "➖";
    newListBtnEl.setAttribute("class", btnClass);
    newListEl.appendChild(newListBtnEl);
    return newListEl;
}

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
    let firstListEl = document.querySelector(".first-list");
    let listItem = document.querySelector("[data-id= '" + currListItemID + "']");
    let currentListItem = listItem.closest("li");
    let copiedListItem = cloneItem(currentListItem, "add-btn")
    listItem.closest("ul").removeChild(currentListItem);
    firstListEl.appendChild(copiedListItem);
    modal.style.display = "none";
});

// Initiate the script by adding event listeners to the "+" and "-" buttons
function init() {
    $(document).on("click", ".add-btn", addEventHandler);
    $(document).on("click", ".remove-btn", removeEventHandler);
}

init();