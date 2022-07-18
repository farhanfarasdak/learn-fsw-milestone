alert("Selamat Datang Di Tebak Angka");
const myPromptName = prompt("Masukkan Nama Anda");
const myPromptNumber = prompt(`Hi ${myPromptName} berapa angka anda ( 1 - 9 )?`);

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