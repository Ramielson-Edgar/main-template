
const animations = document.querySelectorAll('.animation');
const infiniteScroll = document.querySelectorAll(".infinite-scroll");
const sections = document.querySelectorAll('.scroll-container .list.headers .list__item');
const cards = document.querySelectorAll('.scroll-container .list.cards .list__item');
const bannerPhone = document.querySelector('.allpips-banner .phone-container .phone');
const sequenceContainer = document.querySelector('.sequence');

let throttleTimer = false;

function addActiveClass(item) {
    item.classList.add('active');
}

function removActiveClass(item) {
    item.classList.remove('active')
}


function elementInView(item, scrollOffset = 0) {
    let elementOffsetTop = item.getBoundingClientRect().top;
    return (elementOffsetTop <= (window.innerHeight || document.documentElement.innerHeight) - scrollOffset)

}

function animationOnScroll() {

    return animations.forEach(animation => {
        if (elementInView(animation)) {
            animation.style.transitionDelay = animation.dataset.delay + 'ms';
            animation.style.transitionDuration = 1000 + "ms";
            animation.classList.add('scrolled');
        }
    })

}





if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    infiniteScroll.forEach((scrolled) => {

        scrolled.setAttribute("data-animated", true);

        const scrollerInner = scrolled.querySelector(".list.scroll-market");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}


function stackCard() {
    let elementOffsetTop = document.querySelector('.scroll-container').getBoundingClientRect().top;
    let startAnimation = 200;

    // if (elementOffsetTop <= window.scrollY / window.innerHeight) {

    for (let i = 0; i < sections.length; i++) {
        let title = sections[i].getBoundingClientRect().top;
        let sectionIndex = i + 1;

        if (title <= sections[i].scrollHeight / window.innerHeight + startAnimation) {
            addActiveClass(sections[i]);

            cards.forEach((card, index) => {
                let cardIndex = index + 1;

                if (sectionIndex === cardIndex) {
                    addActiveClass(card);
                    card.style.top = index * 50 + "px";
                }
            });

        } else {
            removActiveClass(sections[i]);

            cards.forEach((card, index) => {
                let cardIndex = index + 1;

                if (sectionIndex === cardIndex) {
                    removActiveClass(card);
                    card.style.top = index * 80 + 100 + "px";
                }
            })
        }
    }
    // } 


}







// const html = document.documentElement;
// const canvas = document.getElementById('laptop-sequence');
// const context = canvas.getContext('2d')

// const frameCount = 148;
// const currentFrame = index => (
//       `https://upcdn.io/FW25cBa/image/${index.toString().padStart(4, '0')}.png?w=1920&h=1080`
// )


// const preloadImages = () => {
//     for (let i = 1; i < frameCount; i++) {
//         const img = new Image();
//         img.src = currentFrame(i);
//     }
// };


// const img = new Image()
// img.src = currentFrame(1);
// canvas.width = 1920;
// canvas.height = 1080;
// img.onload = function () {
//     context.drawImage(img, 0, 0);
// }

// const updateImage = index => {
//     img.src = currentFrame(index);
//     context.drawImage(img, 0, 0);
// }


// function scrollSequence() {

//     if (elementInView(sequenceContainer)) {
//         const scrollTop = html.scrollTop;
//         const maxScrollTop = html.scrollHeight - window.innerHeight;
//         const scrollFraction = scrollTop / maxScrollTop;
//         const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));
//         requestAnimationFrame(() => updateImage(frameIndex + 1))

//     } else {
//         return
//     }







// }


window.addEventListener('DOMContentLoaded', () => {

    animations.forEach(animation => {
        if (elementInView(animation)) {
            animationOnScroll(animation)
        }
    })

})



var splide = new Splide('.splide', {
    type: 'slide',
    direction: 'ttb',
    // wheel: true,
    // releaseWheel: true,
    height: '100vh',
    width: '100vw',

    speed: 1000,
    pagination: false,
    arrows: false,
    perPage: 1,
    aesing:'cubic-bezier(0.4, 0, 0.2, 1)',
});

splide.mount()






function splideOnscroll() {
    const container = document.querySelector('.scroll-container');
    const containerOffsetop = document.querySelector('.scroll-container').getBoundingClientRect().top;
    const items = document.querySelectorAll('.splide .splide__list .splide__slide');


    // const newScroll = window.scrollY / window.innerHeight;
    // const trigerMarks = Number(newScroll.toFixed(0));
    // let scrollIndex = Math.min(Math.ceil(trigerMarks), Math.max(4));
    let scrollIndex = Math.min(Math.ceil(window.scrollY / window.innerHeight), items.length);
    console.log(scrollIndex)


    if (containerOffsetop <= container.scrollHeight / window.innerHeight) {



        items.forEach((el, i) => {
            let index = i + 1;

            if (elementInView(el)) {

                if (scrollIndex === index) {
                    splide.go(index)
                }

            }  

        })







    }



}


function initAniamtion() {
    window.addEventListener('scroll', () => {
        let scroll = window.scrollY;
        let scrollPercent = (scroll / window.innerHeight) * 100;



        splideOnscroll()

        stackCard();
        animationOnScroll();


        // scrollSequence()
    })
    // preloadImages()
}




const throttle = (callback, timer) => {

    if (!throttleTimer) return;

    throttleTimer = true;

    setTimeout(() => {
        callback()
        throttleTimer = false;
    }, timer);

}

throttle(initAniamtion(), 250)



