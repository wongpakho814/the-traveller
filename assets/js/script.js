var packingInput = document.querySelector("#tobring-text");
var packingForm = document.querySelector("#tobring-form");
var packingList = document.querySelector("#tobring-list");
var packingTotalCount = document.querySelector("#tobring-count");
var clearBtn = document.querySelector("#clear-button");
var toPack = [];

// this function renders and lists the items the user inputs 
function renderToPack() {
    packingList.innerHTML = "";
    packingTotalCount.textContent = toPack.length; 

    //creating a loop to render a new li with each new input 
    for(var i =0; i < toPack.length; i++) {
        var item = toPack[i];

    var listItem = document.createElement("li"); 
    listItem.textContent = item; 
    listItem.setAttribute("data-index", i)
    listItem.classList.add("packingLi");

    
    var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✅"; 
        deleteBtn.style.marginLeft = "5px"; 
        deleteBtn.style.marginBottom = "2px";
        deleteBtn.style.cursor = "grab";
        

    packingList.appendChild(listItem);
    listItem.appendChild(deleteBtn);
        

    }
}


// function will run when page loads
function init(){
// obtaining items of packing list from localstorage 
    var storedPackingList = JSON.parse(localStorage.getItem("toPack"));

    // if list is not blank put saved packing list in to pack array 
    if (storedPackingList !== null){
        toPack = storedPackingList;
    }

    renderToPack();
}

//stringify and saves key and to pack array to localstorage 
function savePackingList(){
    localStorage.setItem("toPack", JSON.stringify(toPack)); 
}

packingForm.addEventListener("submit", function(event){
    event.preventDefault();

    var packingText = packingInput.value.trim();
    // stops function if blank input 
    if (packingText === ""){
        return; 
    }

    // adds new item to to pack array and clears input 
    toPack.push(packingText);
    packingInput.value = ""; 

    //stores updated items to  localstorage and re-render the list; 
    savePackingList();
    renderToPack();

});

packingList.addEventListener("click", function(event){
    var element = event.target;

    if (element.matches("button") === true ){
        var index = element.parentElement.getAttribute("data-index"); 
        toPack.splice(index, 1); 
        savePackingList();
        renderToPack();
    }
})

clearBtn.addEventListener("click",function(){
    localStorage.clear(); 
    packingTotalCount.textContent = 0;
    location.reload()
})



init();