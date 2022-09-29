var shoppingInput = document.querySelector("#shopping-text");
var shoppingForm = document.querySelector("#shopping-form");
var shoppingList = document.querySelector("#shopping-list");
var shoppingTotalCount = document.querySelector("#shopping-count");
var clearBtn = document.querySelector("#clear-button");
var toBuy = [];

// this function renders and lists the items the user inputs 
function renderToBuy() {
    shoppingList.innerHTML = "";
    shoppingTotalCount.textContent = toBuy.length; 

    //creating a loop to render a new li with each new input 
    for(var i =0; i < toBuy.length; i++) {
        var item = toBuy[i];

    var listItem = document.createElement("li"); 
    listItem.textContent = item; 
    listItem.setAttribute("data-index", i)
    listItem.classList.add("shoppingLi");

    
    var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✅"; 
        deleteBtn.style.marginLeft = "5px"; 
        deleteBtn.style.marginBottom = "2px";
        deleteBtn.style.cursor = "grab";
        

    shoppingList.appendChild(listItem);
    listItem.appendChild(deleteBtn);
        

    }}



// function will run when page loads
function init(){
// obtaining items of shopping list from localstorage 
    var storedShoppingList = JSON.parse(localStorage.getItem("toBuy"));

    // if list is not blank put saved shopping list in to pack array 
    if (storedShoppingList !== null){
        toBuy = storedShoppingList;
    }

    renderToBuy();
}

//stringify and saves key and to buy array to localstorage 
function saveShoppingList(){
    localStorage.setItem("toBuy", JSON.stringify(toBuy)); 
}

shoppingForm.addEventListener("submit", function(event){
    event.preventDefault();

    var shoppingText = shoppingInput.value.trim();
    // stops function if blank input 
    if (shoppingText === ""){
        return; 
    }

    // adds new item to to buy array and clears input 
    toBuy.push(shoppingText);
    shoppingInput.value = ""; 

    //stores updated items to  localstorage and re-render the list; 
    saveShoppingList();
    renderToBuy();

});

shoppingList.addEventListener("click", function(event){
    var element = event.target;

    if (element.matches("button") === true ){
        var index = element.parentElement.getAttribute("data-index"); 
        toBuy.splice(index, 1); 
        saveShoppingList();
        renderToBuy();
    }
})

clearBtn.addEventListener("click",function(){
    window.localStorage.removeItem('toBuy'); 
    shoppingList.innerHTML= "";
    shoppingTotalCount.textContent = 0;
})



init()