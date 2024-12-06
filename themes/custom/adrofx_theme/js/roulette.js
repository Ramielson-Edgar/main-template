const email = document.getElementById('eml');
const email_error_popup = document.getElementById('errorEmailModal');

const giftImage = document.querySelectorAll(".is-animated");
const spinButton = document.querySelectorAll(".js-spin");
const rouletteBonus = document.querySelector(".roulette-base");
const popup = document.getElementById('giftModal');
const modals = document.querySelectorAll('.modal.roulette');
const animations = document.querySelectorAll('.animation');
const btn = document.querySelector('.btn-red-green')



window.addEventListener("DOMContentLoaded", () => {


 
    $("#notification").modal('show');


    if ($("#notification").hasClass('show')) {
        document.querySelector('.input.email .input-field + .btn-red-green').addEventListener('click', () => {
            $("#errorEmailModal").modal('show');
            $("#notification").modal('hide')
        })
    }

    function elementInView(item, scrollOffset = 0) {
        const elementOffsetTop = item.getBoundingClientRect().top;
        return (elementOffsetTop <= (window.innerHeight || document.documentElement.clientHeight) - scrollOffset);
    }


    function runAnimationsInModal() {
        return modals.forEach(modal => {

            if ($(modal).hasClass('show')) {
                const animationsInModal = modal.querySelectorAll('.animation');
                animationsInModal.forEach((animation) => {
                    if (elementInView(animation)) {
                        animation.style.transitionDelay = animation.dataset.delay + "ms";
                        animation.style.transitionDuration = "1000ms";
                        animation.classList.add("scrolled");
                    }
                });

            } else {

                $(modal).on('shown.bs.modal', (event) => {
                    if ($(modal).hasClass('show') && (event.type === 'shown' || event.type === 'show')) {
                        const animationsInModal = modal.querySelectorAll('.animation');
                        animationsInModal.forEach((animation) => {
                            if (elementInView(animation)) {
                                animation.style.transitionDelay = animation.dataset.delay + "ms";
                                animation.style.transitionDuration = "1000ms";
                                animation.classList.add("scrolled");
                            }
                        });

                    }

                });
            }





        })




    }


    runAnimationsInModal()



    function startSpinAnimation() {
        rouletteBonus.style.setProperty("--target", `7200deg`);
        rouletteBonus.style.animation = "spin-roulette 5s cubic-bezier(0.4, 0, 0.2, 1) forwards";
    }

    function resetRoulette() {
        rouletteBonus.style.setProperty("--target", `0`);
        rouletteBonus.style.animation = "";
    }

    function showGiftModal() {
        $('#giftModal').modal('show');
        runAnimationsInModal();
        giftImage.forEach((el) => el.classList.add('animated'));
    }

    spinButton.forEach((button) => {
        button.addEventListener("click", () => {
            resetRoulette();
            giftImage.forEach((el) => el.classList.remove('animated'));

            setTimeout(startSpinAnimation, 10);
            setTimeout(showGiftModal, 5000);
        });
    });

    // spinButton.forEach(button => {
    //     button.addEventListener('click', () => {
    //         const eml = getCookie('agiftemail');
    //         if (eml) {
    //             resetRoulette();
    //             giftImage.forEach((el) => el.classList.remove('animated'));

    //             setTimeout(startSpinAnimation, 10);
    //             setTimeout(showGiftModal, 5000)
    //         } else {
    //             alert("You have entered an invalid email address!");
    //         }

    //     })
    // })



});


// window.addEventListener("DOMContentLoaded", () => {

//     function hideAllModals() {
//         return modals.forEach(modal => {
//             $(modal).modal('hide');
//             $("#errorEmailModal").modal('show');
//         })
//     }

//     hideAllModals()

//     function onLoadRunScrollAnimation(animations) {

//         if (animations.length) {
//             animations.forEach((animation) => {
//                 if (elementInView(animation) && window.scrollY === 0) {
//                     animation.style.transitionDelay =
//                         animation.dataset.delay + "ms";
//                     animation.style.transitionDuration = 1000 + "ms";
//                     animation.classList.add("scrolled");
//                 } else {
//                     animation.classList.remove("scrolled");
//                     animation.classList.remove("animation");
//                 }
//             });

//         } else if (!animations.length) {
//             if (elementInView(animations) && window.scrollY === 0) {
//                 animations.style.transitionDelay =
//                     animations.dataset.delay + "ms";
//                 animations.style.transitionDuration = 1000 + "ms";
//                 animations.classList.add("scrolled");
//             } else {
//                 animations.classList.remove("scrolled");
//                 animations.classList.remove("animation");

//             }
//         }
//     }

//     function elementInView(item, scrollOffset = 0) {
//         let elementOffsetTop = item.getBoundingClientRect().top;

//         return (elementOffsetTop <= (window.innerHeight || document.documentElement.clientHeight) - scrollOffset);
//     }

//     function onModalOpenRunAnimationFonrModal() {
//         return modals.forEach(modal => {

//             if ($(modal).hasClass('show')) {
//                 const anim = modal.querySelectorAll('.animation');
//                 onLoadRunScrollAnimation(anim);
//             } else {
//                 $(modal).modal('hide');
//             }
//         })

//     }

//     onModalOpenRunAnimationFonrModal()

//     spinButton.forEach((button) => {

//         button.addEventListener("click", () => {
//             rouletteBonus.style.setProperty("--target", `0`);
//             rouletteBonus.style.animation = "";

//             giftImage.forEach(el => { el.classList.remove('animated')})

//             setTimeout(() => {
//                 rouletteBonus.style.setProperty("--target", `7200deg`);
//                 rouletteBonus.style.animation = "spin-roulette 5s cubic-bezier(0.4, 0, 0.2, 1) forwards";
//             }, 10);

//             setTimeout(() => {
//                 $('#giftModal').modal('show');

//                 onModalOpenRunAnimationFonrModal()

//                 giftImage.forEach(el => {el.classList.add('animated')});
//             }, 5000);
//         });
//     });

// });

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
