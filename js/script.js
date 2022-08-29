const handleInputClassRoom = async () => {
  let inputData = document.getElementById("my-classroom-input").value
  console.log(inputData)
  // POST localhost:8090/class-room
  // { "name": inputData }
  await fetch('http://localhost:8090/class-room', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: inputData })
  })

  // fetch GET /class-room
  // get element by id table
  // looping ulang

  location.reload()
}

const handleInputStudent = async (classRoomId) => {
  let inputData = document.getElementById("my-student-input").value

  await fetch('http://localhost:8090/student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputData,
      ClassRoomId: classRoomId
    })
  })

  location.reload()
}