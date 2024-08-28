const animations = document.querySelectorAll('.bodymovin')

function initBodymovin() {

    return animations.forEach(animation => {
        const animationName = animation.dataset.animation;
        let path;

        const instance = lottie.loadAnimation({
            container: document.getElementById(animationName),
            loop: true,
            render: "svg",
            autoplay: false,
            path: path = animationName === 'terminal' ? 'terminal.json' : animationName === "chart" ? 'chart.json' : 'uiux.json',
        })

        animation.addEventListener('mouseenter', () => {
            instance.play();
        });

        animation.addEventListener('mouseleave', () => {
            instance.pause();
        });
    })
}


initBodymovin() 
