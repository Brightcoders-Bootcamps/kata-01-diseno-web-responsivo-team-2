const modal = document.getElementById("modal");
const button = document.getElementById("burguerMenu");

button.onclick = function() {
    modal.style.display = "block";
}

window.onclick = function(event){
    if (event.target == modal) {
        modal.style.display = "none";
   }
}