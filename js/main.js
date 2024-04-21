// confg do arq index.html

let navbar = document.querySelector('.navbar');
let menuIcon = document.getElementById('menu-icon');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

// confg do arq pag-perfil.html

document.querySelector("#firstName").addEventListener("input", function () {
    const firstName = this.value;
    console.log(`Primeiro nome: ${firstName}`);
});

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        var token = parts.pop().split(";").shift();
    }

    if (!token) {
        window.location.href = '../html/login.html';
        return;
    } 

    return token;
}

