const handleRegister = async () => {
  let regUsername = document.getElementById("regUsername").value
  let regFullname = document.getElementById("regFullname").value
  let regAddress = document.getElementById("regAddress").value
  let regJob = document.getElementById("regJob").value
  let regAge = document.getElementById("regAge").value

  const resp = await fetch('http://localhost:7070/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: regUsername,
      fullname: regFullname,
      address: regAddress,
      job: regJob,
      age: regAge
    })
  })

  if(resp.status === 201){
    alert("Successfully insert data")
    document.getElementById("regUsername").value = null
    document.getElementById("regAddress").value = null
    document.getElementById("regFullname").value = null
    document.getElementById("regJob").value = null
    document.getElementById("regAge").value = null
  }else{
    alert("Inser data failed")
  }
}

const handleFindUser = async () => {
  const username = document.getElementById("findUsername").value
  const resp = await fetch(`http://localhost:7070/find/${username}`)

  if(resp.status===404){
    alert("User Not Found")
  }else{
    const data = await resp.json()
    window.location.href = `/detail/${data.id}`
  }
}

const handleEditBiodata = async (biodataId) => {
  let Fullname = document.getElementById("Fullname").value
  let Address = document.getElementById("Address").value
  let Job = document.getElementById("Job").value
  let Age = document.getElementById("Age").value

  
  const resp = await fetch(`http://localhost:7070/biodata/${biodataId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullname: Fullname,
      address: Address,
      job: Job,
      age: Age
    })
  })
  if(resp.status === 202){
    alert("Data Has Been Updated")
  }else{
    alert("Failed Update Data")
  }
}