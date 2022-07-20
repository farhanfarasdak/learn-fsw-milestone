const POST_KEY = "all-post"
const LOGGED_IN_KEY = "logged-in"

class Post{
  constructor(text, ownerEmail){
    this.text = text
    this.ownerEmail = ownerEmail
  }

  savePost(){
    let currPosts = JSON.parse(localStorage.getItem(POST_KEY))
    let post = {
      text: this.text,
      ownerEmail: this.ownerEmail
    }
    if(currPosts){
      currPosts.push(post)
    }else{
      currPosts = [post]
    }
    localStorage.setItem(POST_KEY, JSON.stringify(currPosts))
  }
}

class User{
  constructor(email){
    this.email = email
  }

  getAllPosts(){
    let posts = JSON.parse(localStorage.getItem(POST_KEY))
    if(posts){
      return posts
    }else{
      return []
    }
  }
}


let currentLoginEmail = localStorage.getItem(LOGGED_IN_KEY)
let user = new User(currentLoginEmail)

const displayLoginInfo = () => {
  let loginInfo = document.getElementById("login-info")
  loginInfo.innerText = `Logged in as ${user.email}`
}

const publishPost = () => {
  let postText = document.getElementById("textarea-feeds").value
  let newPost = new Post(postText, user.email)
  newPost.savePost()
  displayPost()
}

const logoutUser = () => {
  localStorage.removeItem(LOGGED_IN_KEY)
  location.replace("login.html")
}

const displayPost = () => {
  let postsEl = document.getElementById("posts")
  postsEl.innerHTML = ""
  let postsData = user.getAllPosts()
  for(let i = 0; i < postsData.length; i++){
    let post = document.createElement("blockquote")
    post.classList.add("blockquote")
    post.classList.add("post")
    let content = document.createElement("p")
    content.innerText = postsData[i].text
    let footer = document.createElement("footer")
    footer.classList.add("blockquote-footer")
    footer.innerText = postsData[i].ownerEmail
    post.append(content)
    post.append(footer)
    postsEl.prepend(post)
  }
}


displayLoginInfo()
displayPost()
