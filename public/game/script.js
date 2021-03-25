const username = localStorage.getItem('username');

playBtn3.addEventListener('click', ()=>{
    const check = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({check: username})
    }
    fetch('/check', check).then(res => res.json()).then((res)=>{
        if(res.status == 'success'){
            window.location.href = './multiPlayer/multi.html';
        }
        if(res.status == 'fail'){
            window.location.href = '../users/login/login.html';
        }
    });
});