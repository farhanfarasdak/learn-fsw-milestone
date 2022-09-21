const submitLogin = async () => {
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  // console.log("Im clicked")
  const resp = await fetch('http://localhost:8989/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  if(resp.status === 200){
    const data = await resp.json()
    localStorage.setItem('token-login', data.token)
    if(data.user.role === 'GameMaster'){
      location.href = '/gm-dashboard'
    }else{
      location.href = '/player-dashboard'
    }
  }else{
    alert('WRONG USERNAME OR PASSWORD')
    location.reload()
  }
}