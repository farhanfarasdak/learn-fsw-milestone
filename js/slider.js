let imgs = [
  'https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg',
  'https://img.jakpost.net/c/2017/08/02/2017_08_02_30495_1501654303._large.jpg',
  'https://pix10.agoda.net/geo/country/114/3_114_singapore_02.jpg',
]
let sliding = true
let slidingInd = 0

const insertImgs = () => {
  for(let i = 0; i<imgs.length; i++){
    $("#thumbnails").append(`<img src=${imgs[i]} class="img-thumbnail">`)
  }
}

const playSlider = (currentIndex) => {
  if(sliding){
    currentIndex = currentIndex % imgs.length
    slidingInd = currentIndex
    $("#main-slide").fadeOut('fast', () => {
      $("#main-slide").attr("src", imgs[currentIndex])
      $("#main-slide").fadeIn('fast')
    })
    // Opacity is 1 if active slide
    // Opacity is 0.5 if not active slide
    for(let i=0; i<imgs.length; i++){
      if(i===currentIndex){
        $($(".img-thumbnail")[i]).css("opacity", "1")
      }else{
        $($(".img-thumbnail")[i]).css("opacity", "0.5")
      }
    }
    setTimeout(()=>{
      playSlider(currentIndex+1)
    },2000)
  }
}

insertImgs()
playSlider(slidingInd)

$(".img-thumbnail").on("mouseenter", (element)=>{
  sliding = false
  let currSrc = element.target.src
  $(element.target).css("opacity", "1")
  $("#main-slide").attr("src", currSrc)
})

$(".img-thumbnail").on("mouseout", (element)=>{
  sliding = true
  playSlider(slidingInd)
})