
function login(){
    const username = document.getElementById('username').value,
    password = document.getElementById('password').value;

    const user = {
        username: username,
        password: password
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    if(username == "" || password == ""){
        document.getElementById('err').innerText = 'Please enter both your username and password.';
        document.getElementById('err').style.display = 'block';
    }else sendData();

    function sendData(){
        const response = fetch('/login', options).then(res => res.json()).then((res)=>{
            if(res.status == "success"){
                document.getElementById('err').style.display = 'none';
                localStorage.setItem('username', username);
                window.location.href = '../profile/profile.html';
            }
            if(res.status == "fail"){
                document.getElementById('err').style.display = 'block';
            }
        }).catch(err => console.log(err));
    }
}