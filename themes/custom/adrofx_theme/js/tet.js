
const animations = document.querySelectorAll('.animation');
const infiniteScroll = document.querySelectorAll(".infinite-scroll");
const sections = document.querySelectorAll('.list.allpips-headers .list__item');
const cards = document.querySelectorAll('.list.allpips-cards .list__item');
const bannerPhone = document.querySelector('.banner-container.allpisp-banner .phone-container .phone');
const bodymovins = document.querySelectorAll('.bodymovin')


let throttleTimer = false;
let mm = gsap.matchMedia();

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");


window.addEventListener('DOMContentLoaded', () => {

    function onLoadAnimation() {
        animations.forEach(animation => {
            if (elementInView(animation)) {
                animationOnScroll(animation);
            }
        })
    }


    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
        onLoadAnimation()
    }

    function addAnimation() {
        infiniteScroll.forEach((scrolled) => {

            scrolled.setAttribute("data-animated", true);

            const scrollerInner = scrolled.querySelector(".infinite-scroll-aniamiton");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    function addActiveClass(item) {
        item.classList.add('active');
    }

    function removActiveClass(item) {
        item.classList.remove('active')
    }


    function elementInView(item, scrollOffset = 0) {
        let elementOffsetTop = item.getBoundingClientRect().top;
        return (elementOffsetTop <= (window.innerHeight || document.documentElement.clientHeight) - scrollOffset)

    }


    function initBodymovin() {

        return bodymovins.forEach(bodymovin => {
            bodymovin.addEventListener('mouseenter', () => {
                instance.play();
            });

            bodymovin.addEventListener('mouseleave', () => {
                instance.pause();
            });
        })
    }


    initBodymovin()



    function animationOnScroll() {

        return animations.forEach(animation => {
            if (elementInView(animation)) {
                animation.style.transitionDelay = animation.dataset.delay + 'ms';
                animation.style.transitionDuration = 1000 + "ms";
                animation.classList.add('scrolled');
            }
        })

    }


    function stackCard() {
        let elementOffsetTop = document.querySelector('.scroll-container.allpips-advantages').getBoundingClientRect().top;
        let startAnimation = 250;

        if (elementOffsetTop <= window.scrollY / window.innerHeight) {

            for (let i = 0; i < sections.length; i++) {
                let title = sections[i].getBoundingClientRect().top;
                let sectionIndex = i + 1;

                if (title <= sections[i].scrollHeight / window.innerHeight + startAnimation) {
                    addActiveClass(sections[i]);

                    cards.forEach((card, index) => {
                        let cardIndex = index + 1;

                        if (sectionIndex === cardIndex) {
                            addActiveClass(card);
                            card.style.top = index * 80 + 100 + "px";
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
        }


    }




    canvas.width = 1336;
    canvas.height = 786;

    const frameCount = 86;
    const currentFrame = (index) => `https://adro.b-cdn.net/img/${(index).toString().padStart(4, "0")}.png`;

    const images = [];
    const airpods = { frame: 0 };


    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }

    mm.add("(min-width:575px)", () => {

        gsap.to(airpods, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: ".allpips-hero",
                start: "top top",
                end: false,
                markers: false,
                pin: false,
                scrub: 1,
                pinSapcing: false,
            },
            onUpdate: render
        });
    })


    images[0].onload = render;

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const img = images[airpods.frame];
        const dx = (canvas.width - img.width) / 2;
        const dy = (canvas.height - img.height) / 2;

        context.drawImage(img, dx, dy);
    }

    function ininAniamtion() {
        stackCard();
        animationOnScroll();
    }


    const throttle = (callback, timer) => {

        if (!throttleTimer) return;

        throttleTimer = true;

        setTimeout(() => {
            callback()
            throttleTimer = false;
        }, timer);

    }


    window.addEventListener('scroll', () => {
        throttle(ininAniamtion, 250)
    })
})






