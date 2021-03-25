// Velickovic Djordje

var http = new XMLHttpRequest();
var url = "./local.json";

http.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        const localUsers = JSON.parse(this.responseText);
        for(let i in localUsers){
            if(i<6){
                $('.tpScores').append(
                    "<tr class=\"tp\"><td>" +localUsers[i].name+ ": "+localUsers[i].score+ "</td></tr>"
                );
            }
            if(i==6){
                $('.tpScores').append(
                    "<tr class=\"tp\"><td id=\"dotsBtn\" onclick=\"expand()\">...</td></tr>"
                ); 
                localStorage.setItem('localUsers', JSON.stringify(localUsers));        
            }
        }
    }
}
http.open("GET", url, true);
http.send();

async function expand(){
    const localUsers = JSON.parse(localStorage.getItem('localUsers'));
    const tpHidden = document.querySelector('.tpHidden');
    tpHidden.style.display = 'block';

    for(let i in localUsers){
        $('.listLeft').append(
            "<tr class=\"tp\"><td>" +localUsers[i].name+ ": "+localUsers[i].score+ "</td></tr>"
        );
        if(i == 8){
            let j = i;
            for(j in localUsers){
                $('.listCenter').append(
                    "<tr class=\"tp\"><td>" +localUsers[j].name+ ": "+localUsers[j].score+ "</td></tr>"
                );
                if(j == 16){
                    let k = j;
                    for(k in localUsers){
                        $('.listRight').append(
                            "<tr class=\"tp\"><td>" +localUsers[k].name+ ": "+localUsers[k].score+ "</td></tr>"
                        );
                        if(k == 24){
                            break;
                        }
                    }
                }
            }
        }
    }
}

function resetScore(){
    document.querySelector(".options").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
    document.querySelector(".playerName").style.display = "block";
    document.getElementById("playerName").style.display = "block";
    document.getElementById("inputHolder").style.display = "block";
    document.getElementById("okBtn").style.display = "block";
    document.getElementById("cancelBtn").style.display = "block";
}
function okay(){
    document.querySelector(".options").style.display = "block";
    document.getElementById("resetBtn").style.display = "block";
    document.querySelector(".playerName").style.display = "none";
    document.getElementById("playerName").style.display = "none";
    document.getElementById("inputHolder").style.display = "none";
    document.getElementById("okBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";

    var playerName = document.getElementById("playerName").value;

    if(document.getElementById("score1" && "score2" && "score3" && "score4" && "score5" && "score6" && "score7").innerText !== playerName +": " +score){
        document.getElementById("inputHolder").style.color = "red";
        document.getElementById("inputHolder").innerText = "No such player: \""  +playerName+ "\".";

        document.querySelector(".options").style.display = "none";
        document.getElementById("resetBtn").style.display = "none";
        document.querySelector(".playerName").style.display = "block";
        document.getElementById("playerName").style.display = "block";
        document.getElementById("inputHolder").style.display = "block";
        document.getElementById("okBtn").style.display = "block";
        document.getElementById("cancelBtn").style.display = "block";
        }
    for(let i = 1; i < 8; i++){
        if(document.getElementById("score" +i).innerText === playerName +": " +score){
            document.getElementById("score" +i).innerText = "";
            document.getElementById("playerName").value = "";
            localStorage.removeItem("tplayervalue");

            document.querySelector(".options").style.display = "block";
            document.getElementById("resetBtn").style.display = "block";
            document.querySelector(".playerName").style.display = "none";
            document.getElementById("playerName").style.display = "none";
            document.getElementById("inputHolder").style.display = "none";
            document.getElementById("okBtn").style.display = "none";
            document.getElementById("cancelBtn").style.display = "none";

            document.getElementById("inputHolder").style.color = "white";
            document.getElementById("inputHolder").innerText = "Player name:";
        }
    }
}
function cancel(){
    document.querySelector(".options").style.display = "block";
    document.getElementById("resetBtn").style.display = "block";
    document.querySelector(".playerName").style.display = "none";
    document.getElementById("playerName").style.display = "none"; document.getElementById("playerName").value = "";
    document.getElementById("inputHolder").style.color = "white";
    document.getElementById("inputHolder").innerText = "Player name:"
    document.getElementById("inputHolder").style.display = "none";
    document.getElementById("okBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";
}

// Velickovic Djordje