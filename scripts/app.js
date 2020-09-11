const shortener =  document.getElementById("gridtwo");
const input = document.getElementById("input");
const button = document.getElementById("shortenIt");

const api_url = 'https://rel.ink/api/links/';
let LIST = [];

function addShortLink(long, short) {
    
    if(!long){ return; }

    const item = `<div class="shortened-card">
                    <span class="long-link left m-shortened">${long}</span>
                    <hr>
                    <span class="short-link left m-shortened">https://rel.ink/${short}</span>
                    <a class="button center m-shortened copy-button">Copy</a>
                </div>`;
    
    const position = "afterbegin";
    shortener.insertAdjacentHTML(position, item);
    input.value = "";
}

button.addEventListener("click", function(event){
    callApi()
        .then(data => addShortLink(input.value, data['hashid']))
        .catch(error => console.error('Error:', error));
});

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


