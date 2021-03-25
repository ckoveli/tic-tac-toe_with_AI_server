const username = localStorage.getItem('username');

function check(){
    const check = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({check: username})
    }
    fetch('/check', check).then(res => res.json()).then((res)=>{
        if(res.status == 'success'){
            document.querySelector('.profilePic').src = res.image;
            document.getElementById('username').innerText = '@' +res.username;
            document.getElementById('fullname').innerText = res.fullname;
            document.getElementById('score').innerText = 'Score: ' +res.score;
            localStorage.setItem('username', res.username);
        }
        if(res.status == 'fail'){
            window.location.href = '../login/login.html';
        }
    });
}
function options(){
    document.querySelector('.gearBtn').style.display = 'none';
    document.querySelector('.profileAvatar').style.display = 'none';
    document.querySelector('.options').style.display = 'block'; 
    document.getElementById('username').style.display = 'none';
    document.getElementById('fullname').style.display = 'none';  
    document.getElementById('score').style.display = 'none';
}
function options2(){
    document.querySelector('.gearBtn').style.display = 'none';
    document.getElementById('username').style.display = 'none';
    document.getElementById('fullname').style.display = 'none';  
    document.getElementById('score').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
    document.querySelector('.options2').style.display = 'block';
    document.querySelector('.profileAvatar').style.display = 'block';
    document.querySelector('.profilePic').style.display = 'block';
    document.querySelector('.profileAvatar').style.marginTop = '70px';
}
function options3(){
    document.querySelector('.gearBtn').style.display = 'none';
    document.getElementById('username').style.display = 'none';
    document.getElementById('fullname').style.display = 'none';  
    document.getElementById('score').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
    document.querySelector('.options2').style.display = 'none';
    document.querySelector('.options3').style.display = 'block';
}
function options4(){
    document.querySelector('.gearBtn').style.display = 'none';
    document.getElementById('username').style.display = 'none';
    document.getElementById('fullname').style.display = 'none'; 
    document.getElementById('score').style.display = 'none'; 
    document.querySelector('.options').style.display = 'none';
    document.querySelector('.options2').style.display = 'none';
    document.querySelector('.options3').style.display = 'none';
    document.querySelector('.options4').style.display = 'block';
}
function cancel(){
    window.top.location = window.top.location;
}
function setup(){
    noCanvas();
    const capture = document.getElementById('capture');
    capture.addEventListener('click', async event =>{
        document.getElementById('picTitle').style.display = 'none';
        const video = createCapture(VIDEO);
        video.size(640, 480);
        video.center();

        const submit = document.getElementById('submit');
        submit.style.display = 'block';
        submit.addEventListener('click', async event =>{
            video.loadPixels();
            const profilePic = document.querySelector('.profilePic');
            profilePic.src = image64;
            const image64 = video.canvas.toDataURL();
            localStorage.removeItem('image64');
            localStorage.setItem('image64', image64);

            setTimeout(()=>{
                document.getElementById('picTitle').style.display = 'block';
                video.hide();
                cancel();
            }, 500);  
        });
    });
}
function upload(){
    document.getElementById('inputFile').click();
}
function viewImage(event){
    var reader = new FileReader();
    reader.onload = ()=>{
        const profilePic = document.querySelector('.profilePic');
        profilePic.src = reader.result;
        localStorage.removeItem('image64');
        localStorage.setItem('image64', reader.result);

        setTimeout(()=>{
            document.getElementById('label').innerText = 'Profile picture set';
            document.getElementById('uploadBtn').innerText = 'Change';
            cancel();
        }, 500);
    }
    reader.readAsDataURL(event.target.files[0]);
}
function finish(){
    const username = localStorage.getItem('username');
    image64 = localStorage.getItem('image64');

    const newImage = {username: username, image: image64};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newImage)
    }
    fetch('/profilepic', options).then(res => res.json()).then((res)=>{
        if(res.status == "success"){
            localStorage.removeItem('image64');
            window.top.location = window.top.location;
        }else{
            document.getElementById('err').style.display = 'block';
        }
    }).catch(err => console.log(err));   
}
function changeFullName(){
    const username = localStorage.getItem('username'),
    newName = document.getElementById('newFullName').value,
    password = document.getElementById('password').value;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({username: username, password: password, fullname: newName})
    }
    fetch('/fullname', options).then(res => res.json()).then((res)=>{
        if(res.status == 'success'){
            window.top.location = window.top.location;
        }
        if(res.status == 'fail'){
            document.getElementById('err').style.display = 'block';
            document.getElementById('err').innerText = 'Incorrect password';
        }
    })
}
function changePass(){
    const oldPassword = document.getElementById('oldPassword').value,
    newPassword = document.getElementById('newPassword').value;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({username: username, oldPassword: oldPassword, newPassword: newPassword})
    }
    fetch('/password', options).then(res => res.json()).then((res)=>{
        if(res.status == 'success'){
            localStorage.removeItem('username');
            window.top.location = window.top.location;
        }
        if(res.status == 'fail'){
            document.getElementById('err').style.display = 'block';
        }
    })
}
function logOut(){
    const log = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username})
    }
    fetch('/logout', log).then(res => res.json()).then((res)=>{
        if(res.status == 'success'){
            localStorage.removeItem('username');
            window.top.location = window.top.location;
        }
        if(res.status == 'fail'){
            alert('Something went wrong, please try again later');
        }
    })
}