const button = document.getElementById('modal-button')
const button2 = document.getElementById('modal-button2')
const lottie = document.getElementById('lottie')
const lottie2 = document.getElementById('lottie2')
 

window.addEventListener('DOMContentLoaded',()=>{
    button.addEventListener('click',()=>{
        lottie.stop()

        setTimeout(() => {
            lottie.play();
        }, 10);
    })

    button2.addEventListener('click',()=>{
        lottie2.stop()

        setTimeout(() => {
            lottie2.play();
        }, 10);
    })

})

 