var currListItemID;
var currListItem;

// Renders the event list after retrieving data from the POI API call
async function renderEvents() {
    let data = await getPOI(lon, lat);
    console.log(data);
    for (let i = 0; i < 10; i++) {
        let eventULEl = document.querySelector(".first-list");
        let newEventEl = document.createElement("li");
        newEventEl.setAttribute("class", "first-list-item");
        newEventEl.setAttribute("data-id", data[i].id);
        newEventEl.textContent = data[i].name + " ";
        let addBtnEL = document.createElement("button");
        addBtnEL.setAttribute("class", "add-btn");
        addBtnEL.textContent = "+";
        newEventEl.appendChild(addBtnEL);
        eventULEl.appendChild(newEventEl);
    }
}

// Handles the "+" button in the event list
async function addEventHandler(event) {
    let userListEl = document.querySelector(".user-list");
    let copiedListItem = cloneItem(event.target.closest("li"));
    userListEl.appendChild(copiedListItem);
}

// Handles the "-" button in the user list
function removeEventHandler(event) {
    let modalContent = document.querySelector(".modal-content-p");
    modalContent.textContent = "You're about to remove " + event.target.closest("li").getAttribute("data-id") + ", are you sure?";
    modal.style.display = "block";
    currListItemID = event.target.closest("li").getAttribute("data-id");
}

// Clone the list item to copy over to another list
function cloneItem(item) {
    let newListEl = document.createElement("li");
    newListEl.setAttribute("class", "user-list-item");
    newListEl.textContent = item.textContent;
    // Remove the text of the button since textContent get the texts in the child elements as well
    newListEl.textContent = newListEl.textContent.replace("+", "").slice(0, -1);
    newListEl.setAttribute("data-id", newListEl.textContent);
    newListEl.textContent = newListEl.textContent + " ";
    // Create the "-" button in the user's list
    let newListBtnEl = document.createElement("button");
    newListBtnEl.textContent = "-";
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
    let listItem = document.querySelector("[data-id= '" + currListItemID + "']");
    listItem.closest("ul").removeChild(listItem.closest("li"));
    modal.style.display = "none";
});

// Initiate the script by adding event listeners to the "+" and "-" buttons
function init() {
    $(".first-list").on("click", addEventHandler);
    $(".user-list").on("click", removeEventHandler);
}
init();