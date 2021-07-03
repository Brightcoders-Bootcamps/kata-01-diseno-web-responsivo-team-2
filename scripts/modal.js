const modal = document.getElementById("modal");
const buttonModal = document.getElementById("burguerMenu");

buttonModal.onclick = function() {
    modal.style.display = "block";
}

window.onclick = function(event){
    if (event.target == modal) {
        modal.style.display = "none";
   }
}