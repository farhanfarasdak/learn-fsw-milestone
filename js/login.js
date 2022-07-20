const submitLogin = () => {
  let email = document.getElementById("exampleInputEmail1")
  localStorage.setItem("logged-in", email.value)
  location.replace("feeds.html");
}