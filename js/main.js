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

function getToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = '../html/login.html';
        return;
    }

    return token;
}

async function melhoresLojas() {
    var token = localStorage.getItem('token');

    await axios.get(`https://shopscore-api.onrender.com/api/stores?limit=6&quality=1`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            const lojas = response.data.data;

            const ranking_container = document.getElementById('ranking-container');

            if (lojas.length === 0) {
                ranking_container.innerHTML = `
            <div class="box">
                <h3 class="card-title
                ">Nenhuma loja entrou no ranking ainda...</h3>
            </div>
            `;
            } else {
                lojas.forEach(loja => {
                    let stars = '';

                    if (loja.quality === 5) {
                        stars = `
                        <span>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                        </span>`
                    } else if (loja.quality > 4 && loja.quality < 5) {
                        stars = `
                        <span>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star-half'></i>
                        </span>`
                    }

                    let html = `<div class="box">
                <img src=${loja.image} alt=${loja.fantasyName}>
                <h3>${loja.fantasyName}</h3>
                <div class="content">
                    ${stars}
                    <a href="#">Ver comentarios</a>
                </div>
            </div>`

                    ranking_container.innerHTML += html;
                })
            }

        })
}

async function avaliacoesClientes() {
    var token = localStorage.getItem('token');

    await axios.get(`https://shopscore-api.onrender.com/api/users?limit=5`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {

            const clientes = response.data.data;

            const customers_container = document.getElementById('customers-container');

            if (clientes.length === 0) {
                customers_container.innerHTML = `
                <div class="box">
                    <h3 class="card-title">Nenhuma avaliação encontrada</h3>
                </div>      
                `;
            } else {
                clientes.forEach(cli => {
                    let stars = '';

                    if (cli.Evaluations[0].rating === 5) {
                        stars = `<div class="stars">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                    </div>`
                    } else if (cli.Evaluations[0].rating === 4) {
                        stars = `<div class="stars">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                    </div>`
                    } else if (cli.Evaluations[0].rating === 3) {
                        stars = `<div class="stars">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                    </div>`
                    } else if (cli.Evaluations[0].rating === 2) {
                        stars = `<div class="stars">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                    </div>`
                    } else if (cli.Evaluations[0].rating === 1) {
                        stars = `<div class="stars">
                        <i class='bx bxs-star'></i>
                    </div>`
                    }

                    let html = `<div class="box">
                        ${stars}
                        <p>${cli.Evaluations[0].description}</p>
                        <h2>${cli.name}</h2>
                        <img src=${cli.image ? cli.image : '../img/perfil.png'} alt=${cli.name}>
                    </div>`

                    customers_container.innerHTML += html;
                })
            }
        })
}

