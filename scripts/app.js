const shortener =  document.getElementById("shorten");

function addShortLink(long, short) {
    
    if(!long){ return; }

    const item = `<div class="shortened-card">
                    <span class="long-link left m-shortened">Link 1</span>
                    <hr>
                    <span class="short-link left m-shortened">Link 2</span>
                    <a class="shorten_button button center m-shortened">Copy</a>
                </div>`;
    
    const position = "beforeend";
    shortener.insertAdjacentHTML(position, item);
}

shortener.addEventListener("click", function(event){
    const element = event.target;
    
    element.innerHTML = "Copied!";
    element.parentNode.querySelect(".long-link");
})