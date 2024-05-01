function openModal() {
    const modal = document.getElementById('modal-container')
    modal.classList.add('mostrar')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'modal-container' || e.target.id == "fechar") {
            modal.classList.remove('mostrar')
            localStorage.fechaModal = 'modal-container'
        }
    })
}

async function getProdutos() {
    try {
        const lojasSelect = $('#lojas-select').val();
        const token = localStorage.getItem('token');
        const produtosSelectize = $('#produtos-select')[0].selectize;
        console.log(produtosSelectize);
        produtosSelectize.clearOptions();

        const response = await axios.get(`https://shopscore-api.onrender.com/api/products/stores/${lojasSelect}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const produtos = response.data.data;
        produtos.forEach(produto => {
            produtosSelectize.addOption({ value: produto.StoreProducts[0].id, text: produto.name });
        });
        produtosSelectize.refreshOptions();
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function showCnpj() {
    const cnpj = document.getElementById('cnpj');
    cnpj.style.display = 'block';
}

function showProduct() {
    const produto = document.getElementById('produto');
    const descricao = document.getElementById('descricao');
    const imagem = document.getElementById('imagem');
    produto.style.display = 'block';
    descricao.style.display = 'block';
    imagem.style.display = 'block';
}

function setNote() {
    const stars = document.querySelectorAll('.star-icon');
    stars.forEach(star => {
        star.classList.remove('ativo');
    });

    event.target.classList.add('ativo');
    const rating = event.target.getAttribute('data-avaliacao');
    document.getElementById('rating').value = rating;
}