document.addEventListener('DOMContentLoaded', () => {
    const homepage = document.getElementById('home');
    const navbar = document.querySelector('.navbar');

    function updatenav() {
        navbar.classList.toggle('vertical', window.scrollY > homepage.offsetHeight || window.location.hash !== '#home');
    }

    window.addEventListener('scroll', updatenav);
    window.addEventListener('hashchange', updatenav);

    updatenav();
});


