

window.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelectorAll('.card-parallax__wrap');
    const copyTrade = document.querySelector('.fiat.account-strategies');
    const fiatSection = document.querySelector('.fiat.account-banner');
    const fiatBanner = document.querySelector('.fiat.account-banner .img-container');
    const slides = document.querySelectorAll('.splide.fiat .splide__list .splide__slide');
    const benefitsSlider = document.querySelector('.splide.fiat');
    const buttonTabs = document.querySelectorAll('.nav.account-compare .nav-item .nav-link');
    const tabIndicator = document.querySelector('.nav.account-compare .indicator');
    const fiatSecurity = document.querySelector('.fiat-security');

    const animations = document.querySelectorAll('.animation');
    const bodymovins = document.querySelectorAll('.bodymovin');


    let throttleTimer = false;
    let idTimer;
    let interval;
    let currentScroll = 0;



    function onLoadRunScrollAnimation() {

        return animations.forEach(animation => {

            if (elementInView(animation) && window.scrollY === 0) {
                animation.style.transitionDelay = animation.dataset.delay + 'ms';
                animation.style.transitionDuration = 1000 + "ms";
                animation.classList.add('scrolled');
            }
        })

    }



    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onLoadRunScrollAnimation();
    } else {
        return
    }


    var splide = new Splide('#fiat-splide', {
        type: "loop",
        perPage: 1,
        arrows: false,
        pagination: true,
        autoplay: true,
        drag: false,
        fixedHeight: '40.25rem',
        breakpoints: {
            1198: {
                perPage: 1,
                fixedHeight: '35rem',
            },
            320: {
                perPage: 1,
                fixedHeight: '20.813rem',
            }

        },
    });


    function loadLottieAnimationForActiveSlid(currentIndex) {
        let slide = splide.Components.Slides.getAt(currentIndex).slide;
        let animation = slide.querySelector('.bodymovin');

        if (animation && !animation.dataset.loaded || animation.dataset.loaded === 'false') {

            let name = animation.dataset.name;
            let path = `./themes/custom/adrofx_theme/data/${name}.json`;

            let params = {
                container: animation,
                path: path,
                renderer: 'svg',
                loop: true,
                autoplay: true,
            };

            animation.dataset.loaded = 'true';
            lottie.loadAnimation(params);
        }
    }


    function lazyLottie() {

        splide.on('mounted', () => {
            loadLottieAnimationForActiveSlid(splide.index);
        })
 

        splide.on('active', (event) => {
            if (event.slide.classList.contains('is-active')) {
                loadLottieAnimationForActiveSlid(splide.index);
                splide.go(splide.index)
            }
        })


    }
 

    splide.on('autoplay:playing', function (rate) {
        const progress = document.querySelector('.splide.fiat .splide__pagination .splide__pagination__page.is-active');
        progress.style.setProperty('--progress-bullet', rate);
    });

 

    lazyLottie();
    splide.mount();








    let compareAccounts = new Splide('#fiat-accounts', {
        type: "center",
        perPage: 3,
        pagination: false,
        arrows: false,
        autoplay: false,
        drag: true,
        interval: interval,
        gap: '0.625rem',
        breakpoints: {
            1198: {
                perPage: 2,
                fixedHeight: '32rem',
                pagination: true,
            },
            700: {
                perPage: 1,
                pagination: true,
            },
            320: {
                perPage: 1,
                fixedHeight: '24rem',
                pagination: true,
            }

        },
    }).mount()



    function onHandleMoveIndicator() {

        buttonTabs.forEach(el => {
            el.addEventListener('click', () => {

                if (el.classList.contains('left')) {
                    tabIndicator.classList.remove('right');

                } else {
                    tabIndicator.classList.add('right');
                }

            });
        })

    }

    onHandleMoveIndicator()

    function setAnimation(el, offset, scroll = 0) {
        let gap = offset;
        let elementOffsetTop = copyTrade.getBoundingClientRect().top
        if (elementOffsetTop <= (window.innerHeight || document.documentElement.clientHeight) - (scroll + gap)) {
            addActiveClass(el)
        }

        copyTrade.addEventListener("mousemove", (event) => {

            const delay = el.dataset.delay;

            const value = event.clientX;
            const percentages = (window.innerWidth / 2);
            const max = (percentages - value);

            if (el.classList.contains('left')) {
                el.classList.add('active')
                el.style.transform = `translate3d(0px, 0, 100px) scale3d(1, 1, 1) rotateX(${max / 70}deg) rotateY(17deg) rotateZ(-7deg) skew(0deg, 0deg)`
            }

            if (el.classList.contains('top')) {
                el.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(15deg) rotateY(${max / 50}deg) rotateZ(-15deg) skew(0deg, 0deg)`
            }

            if (el.classList.contains('bottom')) {
                el.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(${max / 100}deg) rotateY(${max / 60}deg) rotateZ(30deg) skew(0deg, 0deg)`
            }

        });
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


    function animationOnScroll(animations) {
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



    function initAniamtion() {

        window.addEventListener('scroll', (even) => {
            // let scroll = window.scrollY;
            let scroll;
            const scrollPerncetage = window.scrollY / copyTrade.scrollHeight;

            card.forEach(el => {
                setAnimation(el, 500, scrollPerncetage)
            });


            if (elementInView(fiatSection)) {
                animationOnScroll(fiatBanner);
            }


            if (elementInView(fiatSecurity)) {
                document.querySelectorAll('.sticky-container .list .list__item .bodymovin').forEach((el, index) => {

                    if (elementInView(el) && el.dataset.loaded === 'false') {
                        addActiveClass(el);

                        let name = el.dataset.name;
                        let path = `./themes/custom/adrofx_theme/data/${name}.json`;

                        let params = {
                            container: el,
                            path: path,
                            renderer: 'svg',
                            loop: true,
                            autoplay: true,
                        };

                        el.dataset.loaded = 'true';
                        lottie.loadAnimation(params);
                    }
                })


            }


            animationOnScroll(animations);

        });

    }


    const throttle = (callback, timer) => {

        if (!throttleTimer) return;

        throttleTimer = true;

        setTimeout(() => {
            callback()
            throttleTimer = false;
        }, timer);

    }



    window.addEventListener('resize', splide.on('updated', lazyLottie))



    throttle(initAniamtion(), 250)
})