window.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card-parallax__wrap");
    const copyTrade = document.querySelector(".fiat.account-strategies");
    const fiatSection = document.querySelector(".fiat.account-banner");
    const fiatBanner = document.querySelector(".fiat.account-banner .img-container");

    const benefitsSlider = document.querySelector(".splide.fiat-advantages");
    const buttonTabs = document.querySelectorAll(".nav.account-compare .nav-item .nav-link");
    const tabIndicator = document.querySelector(".nav.account-compare .indicator");
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
        animationOnScroll(animations)
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
            ".splide.fiat-advantages .splide__pagination .splide__pagination__page.is-active"
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
                fixedHeight: "36rem",
                pagination: true
            },
            1024: {
                perPage: 2,
                pagination: true,
            },
            575:{
                perPage: 1,
                pagination: true
            },

            320: {
                perPage: 1,
                fixedHeight: "36rem",
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

    function onHandleRotateCards(card, event) {
        const value = event.clientX;
        const percentages = window.innerWidth / 2;
        const max = percentages - value;

        if (card.classList.contains("left")) {
            card.classList.add("active");
            card.style.transform = `translate3d(0px, 0, 100px) scale3d(1, 1, 1) rotateX(${max / 70
                }deg) rotateY(15deg) rotateZ(-7deg) skew(0deg, 0deg)`;
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


            if (elementInView(copyTrade, 100) && window.innerWidth > 991) {
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

 