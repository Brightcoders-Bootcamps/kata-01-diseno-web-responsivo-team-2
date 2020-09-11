const containerLinks =  document.getElementById("containerLinks");
const input = document.getElementById("input");
const button = document.getElementById("shortenIt");
const label = document.getElementById("labelform");
const clear = document.getElementById("logoHeader");
const api_url = 'https://rel.ink/api/links/';

let LIST;

//Local Storage Rendering
let saved = localStorage.getItem("shortenLinks");

if(saved){
    LIST = JSON.parse(saved);
    loadList(LIST); 
}else{
    LIST = [];
}

//Loads every item of the localStorage and renders it to the user
function loadList(array){
    array.forEach(function(item){
        addShortLink(item.url, item.hashid);
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});



//Main function, it injects the HTML Template of a card and clear the error state of input
function addShortLink(long, short) {
    const item = `<div class="shortened-card">
                    <span class="long-link left m-shortened">${long}</span>
                    <hr>
                    <input class="short-link left m-shortened" value="https://rel.ink/${short}" disabled>
                    <input class="button center m-shortened copy-button" type="button" value="Copy">
                </div>`;
    const position = "afterbegin";

    input.classList.remove("error");
    label.classList.remove("labelform");
    containerLinks.insertAdjacentHTML(position, item);
    input.value = "";
}


//Function to call the Relink API
function callApi() {
    let data = {url: input.value};
    return fetch(api_url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        } 
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
}


//Function to check if input is empty
function validate() {
    if(input.value == ""){ 
        input.classList.add("error");
        label.classList.add("is-visible");
    }
}


//Function to copy the value of selected element to Clipboard
function copyLink(element) {

    navigator.clipboard.writeText(element).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
}


// Listeners

//Main listener, used to send the data from the input and call the API
//Saving the returned data to localStorage trhough push in LIST
button.addEventListener("click", function(event){
    validate();
    callApi()
        .then(data => {
            LIST.push(data);
            localStorage.setItem("shortenLinks", JSON.stringify(LIST));
            addShortLink(input.value, data['hashid']);
        })
        .catch(error => console.error('Error:', error));
});

//Listener to select the button and shortened link GENERATED DYNAMICALLY
containerLinks.addEventListener("click", function(event){
    const element = event.target;
    const inputLink = element.parentNode.querySelector(".short-link");
    console.log(element);
    copyLink(inputLink.value);

    element.value = "Copied!";
});

