moment.locale('pt-br');
async function avaliacoes() {
    var search = document.getElementById('searchInput').value;
    var token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    const query = type == 'store' ? `&idstore=${localStorage.getItem('id')}` : '';

    await axios.get(`https://shopscore-api.onrender.com/api/evaluations?search=${search}${query}`, {
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
                    <a class="ver-mais" href="../html/comentarios-avalia.html?id=${aval.id}">Ver mais</a>
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

async function avaliar() {
    let cadastrarLoja, cadastrarProdutoLoja; 

    var idstore = document.getElementById('lojas-select').value;
    var idstoreproduct = document.getElementById('produtos-select').value;
    var title = document.getElementById('titulo').value;
    var description = document.getElementById('descricao').value;
    var rating = document.getElementById('rating').value;

    var cnpj = document.getElementById('cnpj').value;

    if (cnpj != '') {
        const loja = await pegarInfos();
        cadastrarLoja = await cadastrarLoja(loja);
        idstore = cadastrarLoja.id;
    }

    var produto = document.getElementById('produto').value;
    var descricao_prod = document.getElementById('descricao_prod').value;
    var imagem = document.getElementById('imagem').files[0];

    if (produto != '') {
        const cadastrarProduto = await cadastrarProduto(produto, descricao_prod, imagem);
        cadastrarProdutoLoja = await cadastrarProdutoLoja(cadastrarProduto.id, idstore);
        idstoreproduct = cadastrarProduto.id;
    }

    var token = localStorage.getItem('token');
    var iduser = localStorage.getItem('id');

    const data = {
        iduser,
        idstore,
        idstoreproduct,
        title,
        description,
        rating
    }

    await axios.post('https://shopscore-api.onrender.com/api/evaluations', data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            alert('Avaliação cadastrada com sucesso!');
            window.location.href = '../html/avaliacoes.html';
            return;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao cadastrar avaliação!');
            return;
        });

}

async function getAvaliacao() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    if (id) {
        await axios.get(`https://shopscore-api.onrender.com/api/evaluations/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                let aval = response.data.data;

                const id = document.getElementById('id');
                id.value = aval.id;
                const container = document.getElementById('avaliacao-container');

                let stars = '';

                if (aval.rating === 5) {
                    stars = `<i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>`
                } else if (aval.rating === 4) {
                    stars = `<i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>`
                } else if (aval.rating === 3) {
                    stars = `<i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>`
                } else if (aval.rating === 2) {
                    stars = `<i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>`
                } else {
                    stars = `<i class="bx bxs-star"></i>`
                }

                let anexos = '';
                if (aval.Annexes.length > 0) {
                    anexos = `<div class="anexos">`;
                    aval.Annexes.forEach(annex => {
                        anexos += `<img src=${annex.url} alt=${annex.name}>`
                    })
                    anexos += `</div>`;
                }

                const html = `
                <div class="container">
                    <div class="titulo">
                        ${aval.title}
                    </div>
                    <div class="inner-user">
                    <div class="card-user">
                        <div class="card-ft">
                            <img src=${aval.User.image ? aval.User.image : ''} alt=${aval.User.name}>
                        </div>
                        <div class="card-dados">
                            <h1>${aval.User.name}</h1>
                            <div class="stars">
                                <span class="stars">
                                    ${stars}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p>${aval.description}</p>
                    <span>${moment(aval.createdAt).format("LL")}</span>
                    ${anexos}
                </div>
            </div>`

                container.innerHTML += html;

                const comentarios_container = document.getElementById('comentarios-container');

                if (aval.answer) {
                    comentarios_container.innerHTML += `<section class="card-comentarios">
                    <div class="container" id="comentarios-container">
                        <div class="inner-user">
                            <div class="card-user">
                                <div class="card-ft">
                                    <img src=${aval.Store.image ? aval.Store.image : '../img/perfil.png'} alt="Foto de Perfil">
                                </div>
                                <div class="card-dados">
                                    <h1>${aval.Store.fantasyName} (RESPOSTA DA EMPRESA)</h1>
                                </div>
                            </div>
                            <p>${aval.answer}</p>
                            <span>${moment(aval.updatedAt).format("LL")}</span>
                        </div>
                    </div>
                </section>`

                    if (type === 'store') {
                        const fazerComentario = document.getElementById('fazer-comentario');
                        fazerComentario.style.display = 'none';
                    }
                }

                aval.Comments.forEach(comment => {

                    const commentHtml = `<section class="card-comentarios">
                    <div class="container" id="comentarios-container">
                        <div class="inner-user">
                            <div class="card-user">
                                <div class="card-ft">
                                    <img src=${comment.User.image ? comment.User.image : '../img/perfil.png'} alt="Foto de Perfil">
                                </div>
                                <div class="card-dados">
                                    <h1>${comment.User.name}</h1>
                                </div>
                            </div>
                            <p>${comment.comment}</p>
                            <span>${moment(comment.createdAt).format("LL")}</span>
                        </div>
                    </div>
                </section>`

                    comentarios_container.innerHTML += commentHtml;

                })

            })
            .catch((error) => {
                alert('Avaliação não encontrada!');
                console.error('Error:', error.message);
            });
    } else {
        alert('Avaliação não encontrada!');
        window.location.href = '../html/avaliacao.html';
        return;
    }
}

async function pegarInfos() {
    const cnpj = document.getElementById('cnpj').value;

    await axios.get(`https://shopscore-api.onrender.com/api/stores/cnpj/info?cnpj=${cnpj}`)
    .then(response => {
        let data = response.data.data;

        return data;
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