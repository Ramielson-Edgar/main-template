
const lottie = document.getElementById("lottie");
const giftImage = document.querySelectorAll(".is-animated");
const spinButton = document.querySelectorAll(".js-spin");
const rouletteBonus = document.querySelector(".roulette-base");
const animations = document.querySelectorAll(".animation");

const modalNotify = document.getElementById("notification");
const modalBonus = document.getElementById("giftModal");
const modals = document.querySelectorAll('.modal.roulette')


let throttleTimer = false;


window.addEventListener("DOMContentLoaded", () => {

    function onLoadRunScrollAnimation(animations) {
        return animations.forEach((animation) => {
            if (elementInView(animation) && window.scrollY === 0) {
                animation.style.transitionDelay =
                    animation.dataset.delay + "ms";
                animation.style.transitionDuration = 1000 + "ms";
                animation.classList.add("scrolled");
            }
        });
    }

    // if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    //     onLoadRunScrollAnimation();
    //     // animationOnScroll(animations)
    // }

    function addActiveClass(item) {
        item.classList.add("active");
    }

    function removActiveClass(item) {
        item.classList.remove("active");
    }

    function elementInView(item, scrollOffset = 0) {
        let elementOffsetTop = item.getBoundingClientRect().top;
        let elementOffsetBottom = item.getBoundingClientRect().bottom;

        return (
            elementOffsetTop <=
            (window.innerHeight || document.documentElement.clientHeight) -
            scrollOffset
        );
    }
 


    $('#notification').modal('show');
    $('#giftModal').modal('hide');

    function runModalAniamtion () {
      return  modals.forEach(el => {
        
            if(el.classList.contains('show')) {
    
            const animation = el.querySelectorAll('.animation');
            onLoadRunScrollAnimation(animation)
            } else {
               return
            }
    
    
        })
    
    }
    
    runModalAniamtion()
 

    spinButton.forEach((button) => {


        button.addEventListener("click", () => {
            rouletteBonus.style.setProperty("--target", `0`);
            rouletteBonus.style.animation = "";

            giftImage.forEach(el => {
                el.classList.remove('animated')
            })

 
        

            setTimeout(() => {
                rouletteBonus.style.setProperty("--target", `7200deg`);
                rouletteBonus.style.animation =
                    "spin-roulette 5s ease-in-out .2s forwards";
            }, 10);

            setTimeout(() => {
                $(modalBonus).modal('show');
                giftImage.forEach(el => {
                    el.classList.add('animated')
                });
                
                runModalAniamtion()

            }, 5000);
        });
    });

    function initAniamtion() {
        let scroll = window.scrollY;
    }

    const throttle = (callback, timer) => {
        return () => {
            if (throttleTimer) return; // Если таймер активен, выходим

            throttleTimer = true;
            setTimeout(() => {
                callback();
                throttleTimer = false;
            }, timer);
        };
    };

    window.addEventListener("scroll", throttle(initAniamtion, 250));
});

// window.addEventListener('DOMContentLoaded', () => {
//     $('#notification').modal('show')

//     spinButton.forEach(button => {
//         button.addEventListener('click', () => {
//             rouletteBonus.style.setProperty("--target", `0`);
//             rouletteBonus.style.animation = "";

//             giftImage.forEach( el => {
//                 el.classList.remove('animated')
//             })

//             lottie.stop();
//             $(popup).modal('hide');

//             setTimeout(() => {
//                 rouletteBonus.style.setProperty("--target", `7200deg`);
//                 rouletteBonus.style.animation = "spin-roulette 5s ease-in-out .2s forwards";
//             }, 10);

//             setTimeout(() => {
//                 $(popup).modal('show');
//                 lottie.play();
//                 giftImage.forEach( el => {
//                     el.classList.add('animated')
//                 })
//             }, 5000);

//         })
//     })

// })
