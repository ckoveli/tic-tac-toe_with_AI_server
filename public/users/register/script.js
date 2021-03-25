function next(){
    const username = document.getElementById('username').value,
    password = document.getElementById('password').value;

    const data = {
        username: username,
        password: password
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    if(fullname == "" || username == "" || password == ""){
        document.getElementById('err').innerText = 'All fields are required.';
        document.getElementById('err').style.display = 'block';
    }else sendData();

    function sendData(){
        const response = fetch('/register', options).then(res => res.json()).then((res)=>{
            if(res.status == "success"){
                document.getElementById('err').style.display = 'none';
                optional();
            }else{
                document.getElementById('err').style.display = 'block';
            }
        }).catch(err => console.log(err));
    }
}
function optional(){
    document.querySelector('.registerForm').style.display = 'none';
    document.querySelector('.optionalForm').style.display = 'block';
}
function options(){
    document.querySelector('.profileAvatar').style.display = 'none';
    document.querySelector('.profilePic').style.display = 'none';
    document.getElementById('uploadBtn').style.display = 'none';
    document.getElementById('finishBtn').style.display = 'none';
    document.getElementById('picTitle').style.display = 'none';
    document.querySelector('.options').style.display = 'block'; 
}
function cancel(){
    document.querySelector('.profileAvatar').style.display = 'block';
    document.querySelector('.profilePic').style.display = 'block';
    document.getElementById('uploadBtn').style.display = 'inline-block';
    document.getElementById('finishBtn').style.display = 'inline-block';  
    document.getElementById('picTitle').style.display = 'block';
    document.querySelector('.options').style.display = 'none'; 
}
function setup(){
    noCanvas();
    const capture = document.getElementById('capture');
    capture.addEventListener('click', async event =>{
        const video = createCapture(VIDEO);
        video.size(640, 480);
        video.center();

        const submit = document.getElementById('submit');
        submit.style.display = 'block'
        submit.addEventListener('click', async event =>{
            video.loadPixels();
            const profilePic = document.querySelector('.profilePic');
            profilePic.src = image64;
            const image64 = video.canvas.toDataURL();
            localStorage.removeItem('image64');
            localStorage.setItem('image64', image64);

            setTimeout(()=>{
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
    const username = document.getElementById('username').value,
    password = document.getElementById('password').value,
    fullname = document.getElementById('fullname').value;
    const image64 = localStorage.getItem('image64');

    const newUser = {username: username, password: password, fullname: fullname, image: image64, score: 0};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }
    fetch('/finishreg', options).then(res => res.json()).then((res)=>{
        if(res.status == 'success'){
            localStorage.removeItem('image64');
            window.location.href = '../profile/profile.html';
        }
        if(res.status == 'fail'){
            document.getElementById('err').style.display = 'block';
        }
    }).catch(err => console.log(err));   
}