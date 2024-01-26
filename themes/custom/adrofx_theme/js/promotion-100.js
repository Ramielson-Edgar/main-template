window.addEventListener('DOMContentLoaded', ()=> {
    var marqueeWhite = new Splide('#marquee-white', {
        type: 'loop',
        perPage: 4,
        pagination: false,
        arrows: false,
        gap: '0',
        autoScroll: {
            speed: -1,
            pauseOnHover: false,

        },
        breakpoints: {
            1200: {
                perPage: 3,

            }
        },

    }).mount(window.splide.Extensions);

    var marqueeDark = new Splide('#marquee-dark', {
        type: 'loop',
        perPage: 4,
        pagination: false,
        arrows: false,
        gap: '0',
        autoScroll: {
            speed: 1,
            pauseOnHover: false,
        },
        breakpoints: {
            1200: {
                perPage: 3,

            }
        },

    }).mount(window.splide.Extensions);
   

    gsap.registerPlugin(ScrollTrigger);
     

    gsap.to('.icon-front', {
        scrollTrigger:{
            trigger: ".icon-front",
            scrub:true,
        },
        yPercent:10,
       
    })

    
    // gsap.to('.icons-back', {
    //     scrollTrigger:{
    //         trigger: ".icons-back",
    //         markers:true,
    //         scrub:true,
    //     },
    //     y: -20,
       
    // })

 
    gsap.to('.image-dollar', {
        scrollTrigger:{
            trigger: ".image-dollar",
            scrub:true,
        },
        yPercent: -10,
        duration: .3,
       
    })
  


})