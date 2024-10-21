
const options = {
    setAnimation: setAnimation(data),
    reduceMotion: reduceMotion(),
    scrollAnimation: onScrollAnimation(),
}

function setAnimation() {

}

function onLoadRunScrollAnimation(animations) {

    return animations.forEach(animation => {

        if (elementInView(animation) && window.scrollY === 0) {
            animation.style.transitionDelay = animation.dataset.delay + 'ms';
            animation.style.transitionDuration = 1000 + "ms";
            animation.classList.add('scrolled');
        }
    })

}

function reduceMotion(reduceAnimation) {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onLoadRunScrollAnimation(animations);
        reduceAnimation;
    }
}

reduceMotion(reduceAnimation)


function onScrollAnimation(animations) {
    if (animations.length > 1) {
        animations.forEach(animation => {
            if (elementInView(animation)) {
                animation.style.transitionDelay = animation.dataset.delay + 'ms';
                animation.style.transitionDuration = 1000 + "ms";
                animation.classList.add('scrolled');
            }

        })
    } else if (animations.length < 2 && elementInView(animations)) {
        animations.style.transitionDelay = animations.dataset.delay + 'ms';
        animations.style.transitionDuration = 1000 + "ms";
        animations.classList.add('scrolled');


    }
}

function addActiveClass(item) {
    item.classList.add('active');
}

function removActiveClass(item) {
    item.classList.remove('active')
}

function elementInView(item, scrollOffset = 0) {
    let elementOffsetTop = item.getBoundingClientRect().top
    return (elementOffsetTop <= (window.innerHeight || document.documentElement.clientHeight) - (scrollOffset))
}

function init(animations) {
    return window.addActiveClass('scroll', () => {
        const scrollY = window.scrollY
        const scrollPerncetage = scrollY / window.innerWidth;

        setAnimation()
        animationOnScroll(animations);
    })
}


const throttle = (callback, timer) => {

    if (!throttleTimer) return;

    throttleTimer = true;

    setTimeout(() => {
        callback()
        throttleTimer = false;
    }, timer);

}

throttle(init(), 250);

export default init