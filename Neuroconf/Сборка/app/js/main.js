

const tl = gsap.timeline()

tl.fromTo('.video__content-title h1', {
  y: 50,
  scaleY: 0.5,
  opacity: 0,

},
  {
    y: 0,
    scaleY: 1,
    opacity: 0.2,
    duration: 2
  }, 1,).fromTo('.video__content-title p', {
    y: 50,
    opacity: 0,

  }, {
    y: 0,
    opacity: 1,
    duration: 2,


  }, 2,).fromTo('.video__content-data p', {
    x: 300,
    opacity: 0,
  }, {
    x: 0,
    opacity: 1,
    duration: 2
  }, 1,).fromTo('.video__content-data h4', {
    x: -300,
    opacity: 0,
  }, {
    x: 0,
    opacity: 1,
    duration: 2
  }, 1,).fromTo('.header__wrapper', {
    opacity: 0,
  }, {
    opacity: 1,
    duration: 2
  })





gsap.to('.video__content-title-go', {
  scrollTrigger: {
    trigger: '.video__intro',
    start: 'top top',
    scrub: true,

  },
  opacity: 0,
  scaleY: 0.1,
  rotateY: 0,

})

gsap.to('.video__media', {
  scrollTrigger: {
    trigger: '.video__intro',
    start: 'top top',
    scrub: true,

  },
  scale: 2,
  y: -200,

})

gsap.to('.video__content-data-title', {
  scrollTrigger: {
    trigger: '.video',
    start: 'top top',
    scrub: true,

  },
  yPercent: 80,
  x: -100,
  opacity: 0,
})
gsap.to('.video__content-subtitle', {
  scrollTrigger: {
    trigger: '.video',
    start: 'top top',
    scrub: true,

  },
  yPercent: 80,
  y: -100,
  opacity: 0,
  scaleY: 0.1,
})
gsap.to('.video__content-data-text', {
  scrollTrigger: {
    trigger: '.video',
    start: 'top top',
    scrub: true,

  },
  yPercent: 80,
  x: 100,
  opacity: 0,
})


gsap.from('.mussage__title-content-title', {
  scrollTrigger: {
    trigger: '.video',
    start: 'center start',
    scrub: true,
  },
  y: 100,
  opacity: 0,
  ease: "power2.out"



})
gsap.from('.mussage__title-content-subtitle', {
  scrollTrigger: {
    trigger: '.video',
    start: 'center top',
    scrub: true,
    ease: "power2.out"
  },
  y: 200,
  opacity: 0,

})
gsap.from('.mussage__title-content-svg-left', {
  scrollTrigger: {
    trigger: '.video',
    start: 'top top',
    scrub: true,
  },
  y: 400,
  rotate: 360,

})
gsap.from('.mussage__info-item', {
  scrollTrigger: {
    trigger: '.mussage',
    start: 'top top',
    scrub: true,
  },
  opacity: 0,
  x: -400,
  stagger: 0.2,

})


gsap.from('.mussage__background', {
  scrollTrigger: {
    trigger: '.video',
    start: 'top top',
    scrub: true,
  },
  opacity: 0,
  scaleY: 4,
});



function initAnimations() {
  if (window.innerWidth > 900) {
    gsap.to('.header__button', {
      scrollTrigger: {
        trigger: '.video__intro',
        start: 'top top',
        scrub: true,

      },
      opacity: 1,

    })
  } else {
    gsap.to('.header__button', {
      scrollTrigger: {
        trigger: '.video__intro',
        start: 'top top',
        scrub: true,

      },
      opacity: 0,
      y: -20,
      scaleY: 0.8,
      rotateY: 0,

    })
  }
}

initAnimations();

// Также можно добавить слушатель события resize
window.addEventListener('resize', initAnimations);



