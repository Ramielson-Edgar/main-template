

const animations = document.querySelectorAll('.animation')
let throttleTimer = false;

const options = {
    init: initAniamtion,
    setAnimation: setCustomAnimation,
}

function setCustomAnimation(callback) {
    return callback;
}


function onLoadRunScrollAnimation() {
    return animations.forEach((animation) => {
        if (elementInView(animation) && window.scrollY === 0) {
            animation.style.transitionDelay =
                animation.dataset.delay + "ms";
            animation.style.transitionDuration = 1000 + "ms";
            animation.classList.add("scrolled");
        }
    });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const animations = document.querySelectorAll('.animation')
    onLoadRunScrollAnimation(animations);
    animationOnScroll(animations)
}



function addActiveClass(item) {
    item.classList.add("active");
}

function removActiveClass(item) {
    item.classList.remove("active");
}

function elementInView(item, scrollOffset = 0) {
    let elementOffsetTop = item.getBoundingClientRect().top;
    return (
        elementOffsetTop <=
        (window.innerHeight || document.documentElement.clientHeight) -
        scrollOffset
    );
}

function animationOnScroll(animations) {
    if (animations && animations.length) {
        animations.forEach((animation) => {
            if (elementInView(animation)) {
                animation.style.transitionDelay =
                    animation.dataset.delay + "ms";
                animation.style.transitionDuration = 1000 + "ms";
                animation.classList.add("scrolled");
            }
        });
    } else if (animations && !animations.length) {
        if (elementInView(animations)) {
            animations.style.transitionDelay =
                animations.dataset.delay + "ms";
            animations.style.transitionDuration = 1000 + "ms";
            animations.classList.add("scrolled");
        }
    }
}



function initAniamtion() {

    window.addEventListener("scroll", () => {
        let scroll = window.scrollY;

        throttle(()=> {
            setCustomAnimation()
        },250);

        throttle(() => {
            onScrollAnimation(animations);
        }, 250);
        
 
    });
}


const throttle = (callback, timer) => {
    if (!throttleTimer) {
        throttleTimer = true;
        setTimeout(() => {
            callback();
            throttleTimer = false;
        }, timer);
    }
}


// document.addEventListener('DOMContentLoaded', () => {
//     initAniamtion();
// });


export default options;