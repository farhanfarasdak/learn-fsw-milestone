alert("Selamat Datang Di Tebak Angka");
let myPromptName = prompt("Masukkan Nama Anda");
let myPromptNumber = prompt(`Hi ${myPromptName} berapa angka anda ( 1 - 9 )?`);

let myName = document.getElementById("my-name")
let myNumber = document.getElementById("my-number")
let randomNumber = document.getElementById("random-number")
let myResult = document.getElementById("my-result")
let attempt = 0

myName.innerText = myPromptName
myNumber.innerText = myPromptNumber

const generateNumber = () => {
  attempt++
  let number = Math.floor(Math.random() * 10)
  randomNumber.innerText = number
  if(number === parseInt(myPromptNumber)){
    myResult.innerText = `Anda Benar! dalam ${attempt} percobaan`
  }else{
    myResult.innerText = `SUDAH ${attempt}X COBA MASIH SALAH!!!`
  }
}

const startGame = () => {
  myPromptName = prompt("Masukkan Nama Anda");
  myPromptNumber = prompt(`Hi ${myPromptName} berapa angka anda ( 1 - 9 )?`);
  myName.innerText = myPromptName
  myNumber.innerText = myPromptNumber
  attempt = 0
  myResult.innerText = ""
  randomNumber.innerText = "?"
}

myResult.addEventListener("mouseenter", () => {
  myResult.innerText = "Klik untuk coba dari awal"
  myResult.style.cursor = "pointer"
  myResult.style.color = "blue"
})

myResult.addEventListener("click", () => {
  let confirmResult = confirm("Yakin mau ulang?")
  if (confirmResult){
    startGame()
  }
})