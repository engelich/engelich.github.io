$(document).ready(function(){
const burger = document.querySelector("#burger")
const menu = document.querySelector("#menu")

burger.addEventListener("click",()=>{
  menu.classList.toggle("disp");
})

$('.cook-content').slick({
  infinite: true,
slidesToShow: 3,
slidesToScroll: 3,
  autoplay: true,
  autoplaySpead: 2000,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
});
