
const handleInsertData = async () => {
  let inputName = document.getElementById("inputName")
  let inputDesc = document.getElementById("inputDescription")
  let inputPrice = document.getElementById("inputPrice")

  // POST /menus
  const resp = await fetch('http://localhost:7575/menu',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputName.value,
      description: inputDesc.value,
      price: inputPrice.value
    })
  })

  location.reload()
}

const handleDelete = async (menuId) => {
  let ans = confirm('Are you sure?')
  if (ans){
    // DELETE /menu/:id
    await fetch(`http://localhost:7575/menu/${menuId}`, {
      method: 'DELETE'
    })

    location.reload()
  }
}

const handlePrepareEdit = (id) => {
  const trEl = document.getElementById(id)
  //console.log(trEl.children[1].innerText)
  document.getElementById("inputName").value = trEl.children[1].innerText
  document.getElementById("inputDescription").value = trEl.children[2].innerText
  document.getElementById("inputPrice").value = trEl.children[3].innerText

  document.getElementById("btnInsert").disabled = true
  document.getElementById("btnEdit").disabled = false
  document.getElementById("btnEdit").setAttribute('onclick', `handleSubmitEdit(${id})`)
}

const handleSubmitEdit = async (id) => {
  let inputName = document.getElementById("inputName")
  let inputDesc = document.getElementById("inputDescription")
  let inputPrice = document.getElementById("inputPrice")

  // PUT /menu/:id
  await fetch(`http://localhost:7575/menu/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputName.value,
      description: inputDesc.value,
      price: inputPrice.value
    })
  })

  location.reload()
}