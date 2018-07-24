
window.addEventListener("message", reciveMessage);

document.getElementById("setZoom").addEventListener("click", sendZoomMessage);
document.getElementById("setExtent").addEventListener("click", sendExtentMessage);
document.getElementById("extents").addEventListener("blur", checkInput);
document.getElementById("point").addEventListener("blur",checkInput);
document.getElementById("extents").addEventListener("keyup", checkPoint);
document.getElementById("point").addEventListener("keyup",checkExtent);

document.getElementById("symbol").addEventListener("click", addEvents);
document.getElementById("deleteAll").addEventListener("click", deleteAllItems);


