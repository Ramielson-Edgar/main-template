const popup = document.getElementById('giftModal');
const lottie = document.getElementById('lottie');
const giftImage = document.querySelector('.is-animated')
const spinButton = document.querySelectorAll('.js-spin')
const rouletteBonus = document.querySelector('.roulette-base')


window.addEventListener('DOMContentLoaded', () => {
    $('#notification').modal('show')

    spinButton.forEach(button => {
        button.addEventListener('click', () => {
            rouletteBonus.style.setProperty("--target", `0`);
            rouletteBonus.style.animation = "";
            giftImage.classList.remove('animated');
            lottie.stop();
            $(popup).modal('hide');


            setTimeout(() => {
                rouletteBonus.style.setProperty("--target", `7200deg`);
                rouletteBonus.style.animation = "spin-roulette 5s ease-in-out .2s forwards";
            }, 10);

            setTimeout(() => {
                $(popup).modal('show');
                lottie.play();
                giftImage.classList.add('animated');
            }, 5000);

        })
    })

})






