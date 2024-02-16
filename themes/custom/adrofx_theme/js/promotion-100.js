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
})