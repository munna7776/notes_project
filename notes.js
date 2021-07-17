// console.log("Munna Kumar Barnwal");
showNotes();
// user add a note , add to the localstorage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj={
        Title:addTitle.value,
        Text:addTxt.value
    }
    if(myObj.Title.length>=3 && myObj.Text.length>=3)
    {
        console.log("Success");
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
    else{
        console.log("error");
        let showAlert = document.getElementById("showAlert");
        showAlert.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Sorry!</strong> You can not add this to Notes.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
        setTimeout(() => {
            showAlert.innerHTML="";
        }, 2000);
    }
    
    addTxt.value = "";
    addTitle.value="";
    // console.log(notesObj);
})

// function to get elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `  <div class="noteCard card mx-2 my-2" style="width: 18rem;">
                         <div class="card-body">
                             <h5 class="card-title">${element.Title}</h5>
                             <p class="card-text">${element.Text}</p>
                             <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                             <button id="${index}" onclick="editNote(this.id)" class="btn btn-primary">Edit</button>
                        </div>
                    </div>
                `
    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length!= 0)
    {
        notesElm.innerHTML = html;
    }
    else
    {
        notesElm.innerHTML = `Nothing to show! Please refer to add a note section`;
    }
}

// delete a note function
function deleteNote(index)
{
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// search a input in the search box
let search=document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!');
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})


// function to edit a notes
function editNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // console.log(notesObj);
    notesObj.findIndex((element,index)=>{
        addTitle.value=element.Title;
        addTxt.value=element.Text;
    })
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}