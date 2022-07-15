let myContent = document.getElementById("my-content")
let angka = 0

const goodNight = () => {
  let newH2 = document.createElement("h2") // memori3
  // '<h2></h2>'
  let myInput = document.getElementById("my-input")
  newH2.innerText = "Selamat Malam " + myInput.value
  // <h2>Selamat Malam</h2>
  newH2.setAttribute("id", "my-custom-h2")
  newH2.classList.add("simerah")
  angka++
  document.getElementById("counter").innerText = angka
  myContent.append(newH2)
  newH2.addEventListener("click", () => {
    newH2.innerText = "Selamat Pagi " + myInput.value
    newH2.style.color = "blue"
    myInput.value = ""
  })
}

let myJudul = document.getElementById("judul")
myJudul.style.cursor = "pointer"
myJudul.addEventListener("mouseenter", () => {
  if(myJudul.innerText === "Hi Semua!"){
    myJudul.innerText = "Hi Kamu!"
    myJudul.style.color = "green"
  }else{
    myJudul.innerText = "Hi Semua!"
    myJudul.style.color = "black"
  }
})

myJudul.addEventListener("mouseout", () => {
  if(myJudul.innerText === "Hi Semua!"){
    myJudul.innerText = "Hi Kamu!"
    myJudul.style.color = "green"
  }else{
    myJudul.innerText = "Hi Semua!"
    myJudul.style.color = "black"
  }
})


let searchResults = ["Kura-kura", "Kambing", "Kucing", "Kodok", "Kupu-kupu"]

const generateSearchResults = (keyword) => {
  for(let i = 0; i < searchResults.length; i++){
    if(searchResults[i].toLowerCase().includes(keyword)){
      let myResult = document.getElementById("search-result")
      let newH3 = document.createElement("h3")
      newH3.innerText = searchResults[i]
      myResult.append(newH3)
    }
  }
}

generateSearchResults()

let mySearch = document.getElementById("my-search")
mySearch.addEventListener("keyup", (element) => {
  // console.log(element.target.value)
  let myResult = document.getElementById("search-result")
  myResult.innerHTML = ''
  if(element.target.value !== ""){
    generateSearchResults(element.target.value)
  }
})