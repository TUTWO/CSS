
document.getElementById("tabdiv").addEventListener("click", function (evt) {
    openTab(evt);
});

function openTab(evt) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].style.display === "block") {
            tabcontent[i].style.display = "none";
            break;
        }
    }
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        if (tablinks[i].id === "active") {
            tablinks[i].removeAttribute("id");
        }
    }
    document.getElementById(evt.target.name).style.display = "block";
    evt.target.id = "active";
}

