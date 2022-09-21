const validateLogin = () => {
  const data = localStorage.getItem('token-login')
  if(data === null){
    location.href = '/login'
  }
}

validateLogin()


const getServerData = async () => {
  console.log('I am called')
  const resp = await fetch('http://localhost:8989/server', {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token-login')
    }
  })
  const data = await resp.json()
  const listServer = document.getElementById("list-server")

  let serverList = ""
  data.forEach(element => {
    serverList = serverList + `<li>${element.name}</li>`
  });

  listServer.innerHTML = serverList
}

const handleCreateServer = async () => {
  console.log('I am clicked')
  const servername = document.getElementById("servername").value
  const resp = await fetch('http://localhost:8989/server', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token-login')
    },
    body: JSON.stringify({
      name: servername
    })
  })

  if(resp.status !== 201){
    alert('FAILED TO CREATE NEW SERVER')
  }else{
    alert('NEW SERVER IS CREATED')
    location.reload()
    // getServerData()
  }
}

const handleLogout = () => {
  localStorage.removeItem('token-login')
  location.href = '/login'
}

getServerData()