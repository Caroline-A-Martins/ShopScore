async function avaliacoes() {
    var search = document.getElementById('searchInput').value;
    var token = getCookie('token');

    await axios.get(`https://f394-177-94-22-233.ngrok-free.app/api/evaluations?search=${search}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {

            const avaliacoes = response.data.data;

            const card_container = document.getElementById('card-container');
            console.log(card_container)

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
                    <h3 class="card-title">${aval.StoreProduct.Product.name}</h3>
                    <span>${aval.createdAt}</span>
                    <div class="card-user">

                        <div class="card-ft">
                            <img src=${aval.User.image} alt="">
                        </div>
                        <div class="card-dados">
                            <h1>${aval.User.name}</h1>
                            ${stars}
                        </div>
                    </div>
                    <p>${aval.description}</p>
                    <a class="ver-mais" href="#">Ver mais</a>
                </div>
            </div>
            `;

                card_container.innerHTML += html;
            })

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}