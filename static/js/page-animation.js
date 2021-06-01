


$( document ).ready(function() {
    $("#id").hide();
    $(".container").hide();
});

// Refs
const wrapCta  = document.querySelector('#wrap-cta'),
      btnCta   = document.querySelector('#cta'),
      content  = document.querySelector('#content'),
      btnClose = document.querySelector('#close');


// Anime.js Commons Values for SVG Morph
const common = {
  targets: '.polymorph',
  easing: 'easeOutQuad',
  duration: 600,
  loop: false
};


// Show content
btnCta.addEventListener('click', () => {
  // Elements apparence
  wrapCta.classList.remove('active');
  content.classList.add('active');
  
  // Morph SVG
  anime({
    ...common,
    points: [
      { value: '215,110 0,110 186,86 215,0' }
    ],
  });
});


// Hide content  
btnClose.addEventListener('click', () => {
  // Elements apparence

   $("#cta").hide();

  content.classList.remove('active');
  wrapCta.classList.add('active');
  
  // Morph SVG
  anime({
    ...common,
    points: [
      { value: '215,110 0,110 0,0 215,0' }
    ]
  }); 


  setTimeout(
  function() 
  {
   $("#id").show();
    $(".container").show();
    $("#my-section").hide().fadeOut(2000);;

    header_animate();
    header_animate2();

    dropdown()
  }, 1000);

     
});






// Text letter animation

// Wrap every letter in a span

function header_animate(){
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml12 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  });

  $(".line1").hide();
}


function header_animate2(){
var textWrapper = document.querySelector('.ml12 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml12 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml12 .line',
    translateX: [0, document.querySelector('.ml12 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml12 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  });

  $(".line1").hide();
}
