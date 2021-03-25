// Velickovic Djordje

function readMore(){
    var gameInfo = document.querySelector(".gameInfo");
    var more = document.getElementById("more");
    if(more.style.display === "none"){
        more.style.display = "inline";
        gameInfo.style.height = "195px";
        gameInfo.style.border = "1px solid #e67e00";
        document.getElementById("readBtn").innerText = "Less";
        document.getElementById("dots").style.display = "none";
    } else{
        more.style.display = "none";
        gameInfo.style.height = "65px";
        document.getElementById("readBtn").innerText = "Read more";
        document.getElementById("dots").style.display = "inline";
    }
}
readMore();

if(screen.width < 684){
    gameInfo.style.height = "300px";
}

// Velickovic Djordje
