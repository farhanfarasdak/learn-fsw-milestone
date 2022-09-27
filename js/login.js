const handleLogin = async () => {
  console.log('I am login button')
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  const resp = await fetch('http://localhost:8989/login',{
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
    console.log(data)
    localStorage.setItem('token-login', data.token)
    if(data.user.role === 'admin'){
      // todo redirect admin
      location.href = '/admin'
    }else{
      // todo redirect normal
    }
  }else{
    alert('LOGIN FAILED')
  }
}