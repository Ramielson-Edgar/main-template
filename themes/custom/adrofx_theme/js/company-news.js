document.addEventListener("DOMContentLoaded", function () {
    const buttonsPagination = document.querySelectorAll('.pagination .page-item');

    function removeActiveClass() {
        buttonsPagination.forEach(button => {
            button.classList.remove('active');
        })
    }


    function setActiveClass() {
        buttonsPagination.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                removeActiveClass();

                button.classList.add('active');
            })
        })
    }


    setActiveClass();

    new Splide('.splide', {
        type: 'slide',
        focus:'center',
        perPage: 1,
        arrows: false,
        pagination: true,
        autoplay: true,
        gap:'1rem',
        breakpoints: {
            1198: {
                perPage: 3,
            },
            991:{
                perPage:3,
                gap: '0.5rem',
            },
            575: {
                perPage: 1,
                gap: '1rem',
            }
        }
    }).mount()



});

