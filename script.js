let jumboContainer = document.querySelector('.jumbo-container');
let thumbsContainer = document.querySelector('.thumbs-container');

thumbsContainer.addEventListener('click', function(e){
  if(e.target.className === 'thumb'){
    jumboContainer.children[0].src = e.target.src
  }
})