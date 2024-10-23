window.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card-parallax__wrap");
    const copyTrade = document.querySelector(".fiat.account-strategies");
    const fiatSection = document.querySelector(".fiat.account-banner");
    const fiatBanner = document.querySelector(".fiat.account-banner .img-container");

    const benefitsSlider = document.querySelector(".splide.fiat");
    const buttonTabs = document.querySelectorAll(".nav.account-compare .nav-item .nav-link");
    const tabIndicator = document.querySelector(
        ".nav.account-compare .indicator"
    );
    const fiatSecurity = document.querySelector(".fiat-security");

    const animations = document.querySelectorAll(".animation");


    let throttleTimer = false;
    let idTimer;
    let interval;


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
        onLoadRunScrollAnimation();
    }

    let fiatBenefitsSplider = new Splide("#fiat-splide", {
        type: false,
        perPage: 1,
        arrows: false,
        pagination: true,
        autoplay: true,
        drag: false,
        fixedHeight: "40.25rem",
        breakpoints: {
            1198: {
                perPage: 1,
                fixedHeight: "35rem"
            },
            320: {
                perPage: 1,
                fixedHeight: "330px",
                drag: true
            }
        }
    });

    function loadLottieAnimationForActiveSlid(currentIndex) {
        let slide =
            fiatBenefitsSplider.Components.Slides.getAt(currentIndex).slide;
        let animation = slide.querySelector(".bodymovin");
        const delay = slide.dataset.splideInterval;
        interval = delay;

        if (animation.dataset.loaded === "false") {
            let name = animation.dataset.name;
            let path = `./themes/custom/adrofx_theme/data/${name}.json`;

            let params = {
                container: animation,
                path: path,
                renderer: "svg",
                loop: true,
                autoplay: true
            };

            animation.dataset.loaded = "true";
            const instance = lottie.loadAnimation(params);
        }
    }

    function lazyLottie() {
        fiatBenefitsSplider.on("mounted", () => {
            loadLottieAnimationForActiveSlid(fiatBenefitsSplider.index);
            fiatBenefitsSplider.go(fiatBenefitsSplider.index);
        });

        fiatBenefitsSplider.on("active", (event) => {
            if (event.slide.classList.contains("is-active")) {
                loadLottieAnimationForActiveSlid(fiatBenefitsSplider.index);
                fiatBenefitsSplider.go(fiatBenefitsSplider.index);
            }
        });

        fiatBenefitsSplider.on("moved", (prevIndex) => {
            if (prevIndex === 3) {
                idTimer = setTimeout(function () {
                    fiatBenefitsSplider.go(0);
                    loadLottieAnimationForActiveSlid(fiatBenefitsSplider.index);
                }, interval);
            }
        });
    }

    fiatBenefitsSplider.on("autoplay:playing", function (rate) {
        const progress = document.querySelector(
            ".splide.fiat .splide__pagination .splide__pagination__page.is-active"
        );
        progress.style.setProperty("--progress-bullet", rate);
    });

    let compareAccounts = new Splide("#fiat-accounts", {
        type: "center",
        perPage: 3,
        pagination: false,
        arrows: false,
        autoplay: false,
        drag: true,
        interval: interval,
        gap: "0.625rem",
        breakpoints: {
            1198: {
                perPage: 2,
                fixedHeight: "32rem",
                pagination: true
            },
            700: {
                perPage: 1,
                pagination: true
            },
            320: {
                perPage: 1,
                fixedHeight: "24rem",
                pagination: true
            }
        }
    }).mount();





    function onHandleMoveIndicator() {
        buttonTabs.forEach((el) => {
            el.addEventListener("click", () => {
                if (el.classList.contains("left")) {
                    tabIndicator.classList.remove("right");
                } else {
                    tabIndicator.classList.add("right");
                }
            });
        });
    }

    onHandleMoveIndicator();

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

    const itemVideo = document.querySelectorAll(
        ".video-container.fiat-security .list .list__item"
    );
    const titleItems = document.querySelectorAll(
        ".header-container.security .list .list__item"
    );


    function onHandleRotateCards(card, event) {
        const value = event.clientX;
        const percentages = window.innerWidth / 2;
        const max = percentages - value;

        if (card.classList.contains("left")) {
            card.classList.add("active");
            card.style.transform = `translate3d(0px, 0, 100px) scale3d(1, 1, 1) rotateX(${max / 70
                }deg) rotateY(17deg) rotateZ(-7deg) skew(0deg, 0deg)`;
        }

        if (card.classList.contains("top")) {
            card.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(15deg) rotateY(${max / 50
                }deg) rotateZ(-15deg) skew(0deg, 0deg)`;
        }

        if (card.classList.contains("bottom")) {
            card.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(${max / 100
                }deg) rotateY(${max / 60}deg) rotateZ(30deg) skew(0deg, 0deg)`;
        }
    }

    function setTextAnimation(videoItem, videoIndex) {
        titleItems.forEach((titleItem, titlIndex) => {
            if (videoItem.classList.contains('active') && videoIndex === titlIndex && elementInView(videoItem)) {
                addActiveClass(titleItem);
            } else {
                removActiveClass(titleItem);
            }
        });
    }

    function setActiveLottieContainer() {
        itemVideo.forEach((videoItem, videoIndex) => {
            const itemHeight = videoItem.getBoundingClientRect().height;
            const animationContainer = videoItem.querySelector('.animation')
            const animation = videoItem.querySelector('.bodymovin')

            if (elementInView(videoItem, itemHeight) && animation.dataset.loaded === "false") {

                let name = animation.dataset.name;
                let path = `./themes/custom/adrofx_theme/data/${name}.json`;

                let params = {
                    container: animation,
                    path: path,
                    renderer: "svg",
                    loop: true,
                    autoplay: true
                };

                animation.dataset.loaded = "true";
                const instance = lottie.loadAnimation(params);


                addActiveClass(animation);
                addActiveClass(videoItem);

                setTextAnimation(videoItem, videoIndex);
                animationOnScroll(animationContainer);
            } else {
                removActiveClass(videoItem);
                removActiveClass(animation)
            }
        });
    }

    function onScrolRunLottieSecurity() {
        const cards = document.querySelectorAll('.cards.fiat-benefits .card-benefits');
        const section = document.querySelector('.fiat-security').scrollHeight

        cards.forEach(card => {
            const bodymovin = card.querySelector('.bodymovin');

            animationOnScroll(animations);
 

            if (elementInView(card)) {
                addActiveClass(card);

                if (bodymovin.dataset.loaded === "false") {
                    let name = bodymovin.dataset.name;
                    let path = `./themes/custom/adrofx_theme/data/${name}.json`;

                    let params = {
                        container: bodymovin,
                        path: path,
                        renderer: "svg",
                        loop: true,
                        autoplay: true
                    };

                    bodymovin.dataset.loaded = "true";
                    const instance = lottie.loadAnimation(params);
                }


            } else {
                removActiveClass(card)
            }


        });
    }

    function initAniamtion() {

        window.addEventListener("scroll", () => {
            let scroll = window.scrollY;
            const scrollPerncetage = window.scrollY / copyTrade.scrollHeight;


            if (elementInView(copyTrade, 100) && window.innerWidth > 768) {
                cards.forEach(card => {
                    if (elementInView(card)) {
                        addActiveClass(card);
                        copyTrade.addEventListener("mousemove", (event) => onHandleRotateCards(card, event));
                    }
                });
            } else {
                cards.forEach(card => {
                    if(elementInView(card, 700)) {
                        addActiveClass(card);
                    }
                    copyTrade.removeEventListener("mousemove", (event) => onHandleRotateCards(card, event));
                });
            }


            if (elementInView(fiatSection)) {
                animationOnScroll(fiatBanner);
            }

            if (elementInView(fiatSecurity)) {
                onScrolRunLottieSecurity()
            }

            if (
                elementInView(benefitsSlider, -240) &&
                benefitsSlider.dataset.mounted === "false"
            ) {
                lazyLottie();
                fiatBenefitsSplider.mount();
                benefitsSlider.dataset.mounted = "true";
            }
        });
    }

    const throttle = (callback, timer) => {
        if (!throttleTimer) return;

        throttleTimer = true;

        setTimeout(() => {
            callback();
            throttleTimer = false;
        }, timer);
    };

    window.addEventListener("resize", () => {
        fiatBenefitsSplider.refresh();
    });

    throttle(initAniamtion(), 250);

});

// function onHandleActiveBodymovin() {
//     itemVideo.forEach((videoItem, videoIndex) => {
//            if (elementInView(videoItem, 570)) {

//                addActiveClass(videoItem);
//                slideText(videoItem, videoIndex);

//                let bodymovin = videoItem.querySelector('.bodymovin');

//                if(bodymovin && (bodymovin.dataset.loaded || bodymovin.dataset.loaded === 'false')) {
//                    let name = bodymovin.dataset.name;
//                    let path =`./themes/custom/adrofx_theme/data/${name}.json`

//                    let params = {
//                        container: bodymovin,
//                        autoplay:true,
//                        loop:true,
//                        render: 'svg',
//                        path: path,
//                    }

//                    bodymovin.dataset.loaded = 'true';
//                    lottie.loadAnimation(params);
//                }

//            } else {
//                removActiveClass(videoItem);
//                // title.classList.remove('animation','scrolled');
//                // text.classList.remove('animation','scrolled');

//            }
//        });
//    }

// ============================================

// function slideText(videoItem, videoIndex) {
//     window.clearTimeout(id);

//     titleItems.forEach((titleItem, titlIndex) => {
//         if (videoIndex === titlIndex && elementInView(videoItem)) {
//             const title = titleItem.querySelector(".section-header__title");
//             const text = titleItem.querySelector(".section-header__text");

//             addActiveClass(titleItem);

//             title.addEventListener(
//                 "transitionrun",
//                 () => {
//                     isAnimationRun = true;
//                 },
//                 { once: true }
//             );

//             id = setTimeout(function () {
//                 addActiveClass(title);
//                 addActiveClass(text);
//             }, 50);

//             title.addEventListener(
//                 "transitionend",
//                 () => {
//                     isAnimationRun = false;
//                 },
//                 { once: true }
//             );
//         } else {
//             removActiveClass(titleItem);
//             title.classList.remove("animation", "scrolled");
//             text.classList.remove("animation", "scrolled");
//         }
//     });
// }

// function setBodyMovin(bodymovins) {
//     return bodymovins.forEach((bodymovin, index) => {
//         if (
//             (elementInView(bodymovin) && bodymovin.dataset.loaded) ||
//             bodymovin.dataset.loaded === "false"
//         ) {
//             let name = bodymovin.dataset.name;
//             let path = `./themes/custom/adrofx_theme/data/${name}.json`;

//             let params = {
//                 container: bodymovin,
//                 path: path,
//                 renderer: "svg",
//                 loop: true,
//                 autoplay: true
//             };

//             bodymovin.dataset.loaded = "true";
//             lottie.loadAnimation(params);
//         }
//     });
// }

// function onHandleActiveBodymovin() {
//     itemVideo.forEach((videoItem, videoIndex) => {
//         if (elementInView(videoItem, 570) && isAnimationRun === true) {
//             addActiveClass(videoItem);
//             setBodyMovin(bodymovins);
//             slideText(videoItem, videoIndex);
//         } else {
//             removActiveClass(videoItem);
//             title.classList.remove("animation", "scrolled");
//             text.classList.remove("animation", "scrolled");
//         }
//     });
// }

// function initAniamtion() {
//     window.addEventListener("scroll", (even) => {
//         let scroll = window.scrollY;
//         const scrollPerncetage = window.scrollY / copyTrade.scrollHeight;

//         card.forEach((el) => {
//             setAnimation(el, 500, scrollPerncetage);
//         });

//         if (elementInView(fiatSection)) {
//             animationOnScroll(fiatBanner);
//         }

//         if (elementInView(fiatSecurity, 800) && !isAnimationRun) {
//             onHandleActiveBodymovin();
//         } else {
//             itemVideo.forEach((el) => removActiveClass(el));
//             title.classList.remove("animation", "scrolled");
//             text.classList.remove("animation", "scrolled");
//         }

//         if (
//             elementInView(benefitsSlider, -240) &&
//             benefitsSlider.dataset.mounted === "false"
//         ) {
//             benefitsSlider.dataset.mounted = "true";
//             lazyLottie();
//             splide.mount();
//         } else {
//             return;
//         }

//         animationOnScroll(animations);
//     });
// }

// function setAnimation(el, offset, scroll = 0) {
//     let gap = offset;
//     let elementOffsetTop = copyTrade.getBoundingClientRect().top;
//     if (
//         elementOffsetTop <=
//         (window.innerHeight || document.documentElement.clientHeight) -
//             (scroll + gap)
//     ) {
//         addActiveClass(el);
//     }

//     if(window.innerWidth < 768) {
//         copyTrade.addEventListener("mousemove", (event) => {
//             const delay = el.dataset.delay;

//             const value = event.clientX;
//             const percentages = window.innerWidth / 2;
//             const max = percentages - value;

//             if (el.classList.contains("left")) {
//                 el.classList.add("active");
//                 el.style.transform = `translate3d(0px, 0, 100px) scale3d(1, 1, 1) rotateX(${
//                     max / 70
//                 }deg) rotateY(17deg) rotateZ(-7deg) skew(0deg, 0deg)`;
//             }

//             if (el.classList.contains("top")) {
//                 el.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(15deg) rotateY(${
//                     max / 50
//                 }deg) rotateZ(-15deg) skew(0deg, 0deg)`;
//             }

//             if (el.classList.contains("bottom")) {
//                 el.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(${
//                     max / 100
//                 }deg) rotateY(${max / 60}deg) rotateZ(30deg) skew(0deg, 0deg)`;
//             }
//         });
//     } else {

//        return;
//     }

// }

// bodymovins.forEach((bodymovin, index) => {
//     if (videoItem.classList.contains('active') && elementInView(bodymovin) &&bodymovin.dataset.loaded === "false") {
//         addActiveClass(bodymovin);

//         let name = bodymovin.dataset.name;
//         let path = `./themes/custom/adrofx_theme/data/${name}.json`;

//         let params = {
//             container: bodymovin,
//             path: path,
//             renderer: "svg",
//             loop: true,
//             autoplay: true
//         };

//         bodymovin.dataset.loaded = "true";
//         const instance = lottie.loadAnimation(params);
//     }
// });