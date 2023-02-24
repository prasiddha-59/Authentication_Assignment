function navSilde() {
    const burger = document.querySelector('.burger');
    const sideNav = document.querySelector('.nav_links');
    const navLinks = document.querySelectorAll('.nav_links li');

    burger.addEventListener('click', () => {
        sideNav.classList.toggle('nav_active')
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinksFade 0.5s ease forwards ${index / 4}s`;
            }
        });

        burger.classList.toggle('toogle');


    });

}

navSilde();
