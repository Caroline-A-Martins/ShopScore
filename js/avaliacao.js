moment.locale('pt-br');
async function avaliacoes() {
    var search = document.getElementById('searchInput').value;
    var token = localStorage.getItem('token');

    await axios.get(`https://shopscore-api.onrender.com/api/evaluations?search=${search}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {

            const avaliacoes = response.data.data;

            const card_container = document.getElementById('card-container');

            card_container.innerHTML = '';

            if (avaliacoes.length === 0) {
                card_container.innerHTML = `
                <div class="card">
                    <h3 class="card-title">Nenhuma avaliação encontrada</h3>
                </div>
                `;
            } else {
                avaliacoes.forEach(aval => {
                    let stars = '';

                    if (aval.rating === 5) {
                        stars = `
                    <div class="stars">
                        <span>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                        </span>
                    </div>`
                    } else if (aval.rating === 4) {
                        stars = `
                    <div class="stars">
                        <span>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                        </span>
                    </div>`
                    } else if (aval.rating === 3) {
                        stars = `
                    <div class="stars">
                        <span>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                        </span>
                    </div>`
                    } else if (aval.rating === 2) {
                        stars = `
                    <div class="stars">
                        <span>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                        </span>
                    </div>`
                    } else {
                        stars = `
                    <div class="stars">
                        <span>
                            <i class='bx bxs-star'></i>
                        </span>
                    </div>`
                    }

                    let html = `
            <div class="card">
                <!-- img -->
                <div class="card-img">
                    <img src=${aval.StoreProduct.Product.image} alt=${aval.StoreProduct.Product.name}>
                </div>

                <!-- text -->
                <div class="card-text">
                    <h3 class="card-title">${truncateText(aval.title, 50)}</h3>
                    <span>${moment(aval.createdAt).format("LL")}</span>
                    <div class="card-user">

                        <div class="card-ft">
                            <img src=${aval.User.image ? aval.User.image : '../img/perfil.png'} alt="${aval.User.name}">
                        </div>
                        <div class="card-dados">
                            <h1>${aval.User.name}</h1>
                            ${stars}
                        </div>
                    </div>
                    <p>${truncateText(aval.description, 50)}</p>
                    <a class="ver-mais" href="#">Ver mais</a>
                </div>
            </div>
            `;

                    card_container.innerHTML += html;
                })
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    } else {
        return text;
    }
}