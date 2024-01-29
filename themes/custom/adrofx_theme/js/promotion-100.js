window.addEventListener('DOMContentLoaded', () => {


    gsap.registerPlugin(ScrollTrigger);

    const marqueeWhite = gsap.utils.toArray('.marquee.white .list .list__item');
    const marqueeDark = gsap.utils.toArray('.marquee.dark .list .list__item');
    
    gsap.set(".marquee .list", {xPercent: -50});

    gsap.to(marqueeWhite, {
        xPercent: 100,
        repeat: -1,
        duration: 10,
        ease: "linear"
     }).totalProgress(0.5);

     gsap.to(marqueeDark, {
        xPercent: -100,
        repeat: -1,
        duration: 10,
        ease: "linear"
     }).totalProgress(0.5)



    // gsap.to('.icon-front', {
    //     scrollTrigger: {
    //         trigger: ".icon-front",
    //         scrub: true,
    //     },
    //     yPercent: 10,

    // })


    // gsap.to('.icons-back', {
    //     scrollTrigger:{
    //         trigger: ".icons-back",
    //         markers:true,
    //         scrub:true,
    //     },
    //     y: -20,

    // })


    // gsap.to('.image-dollar', {
    //     scrollTrigger: {
    //         trigger: ".image-dollar",
    //         scrub: true,
    //     },
    //     yPercent: -10,
    //     duration: .3,

    // })




})