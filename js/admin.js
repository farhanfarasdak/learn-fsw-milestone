const getCandidates = async () => {
  const resp = await fetch('http://localhost:8989/candidate', {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token-login')
    }
  })
  if(resp.status === 200){
    const data = await resp.json()
    console.log(data)
  
    let listEl = ""
    data.forEach(element => {
      listEl = listEl + `<li>ID : ${element.id} | ${element.name}-${element.Users.length}</li>`
    });

    const candidateListEl = document.getElementById("candidate-list")
    candidateListEl.innerHTML = listEl
  }
}

const handleInputCandidate = async () => {
  const candidateName = document.getElementById("candidateName").value

  const resp = await fetch('http://localhost:8989/candidate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token-login')
    },
    body: JSON.stringify({
      name: candidateName
    })
  })

  if(resp.status === 201){
    location.reload()
  } else {
    alert('Failed to insert data')
  }

}

getCandidates()