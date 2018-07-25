
document.getElementById("tabdiv").addEventListener("click", (evt) => {
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
});

document.getElementById("selectButton").addEventListener("click",(evt)=>{
    let displaytype=document.getElementById(evt.target.parentElement.className);
    if(displaytype){
        displaytype.style.display=(displaytype.style.display==="block"?"none":"block");
    }
})