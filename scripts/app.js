const shortener =  document.getElementById("shorten");
const input = document.getElementById("input");
const button = document.getElementById("shortenIt");

const api_url = 'https://rel.ink/api/links/';


function addShortLink(long, short) {
    
    if(!long){ return; }

    const item = `<div class="shortened-card">
                    <span class="long-link left m-shortened">${long}</span>
                    <hr>
                    <span class="short-link left m-shortened">${short}</span>
                    <a class="shorten_button button center m-shortened">Copy</a>
                </div>`;
    
    const position = "afterend";
    shortener.insertAdjacentHTML(position, item);
    input.value = "";
}

button.addEventListener("click", function(event){
    callApi()
        .then(data => {debugger; addShortLink(input.value, data['hashid'])})
        .catch(error => {debugger; console.error('Error:', error)});
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


// function callApi() {
      
//   let data = {url: input.value};
//   fetch(api_url, {
//   method: 'POST', 
//   body: JSON.stringify(data), 
//   headers:{
//       'Content-Type': 'application/json'
//   }
//   }).then(res => res.json())
//   .then(data => obj = data)
//   .catch(error => console.error('Error:', error))
//   .then(response => console.log('Success:', obj));

// }



// function callApi() {
      
//   let data = {url: input.value};
//   fetch(api_url, {
//   method: 'POST', 
//   body: JSON.stringify(data), 
//   headers:{
//       'Content-Type': 'application/json'
//   }
//   }).then(function(response) {
//      response.json();
//   }) 
//   .catch(error => console.error('Error:', error))
//   .then(response => console.log('Success:', response));
// }

// const element = event.target;

// element.innerHTML = "Copied!";
// element.parentNode.querySelect(".long-link");