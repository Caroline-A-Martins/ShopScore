function openModal() {
    window.location.href = '../html/fazer-avaliacao.html';
}

async function getProdutos() {
    try {
        const lojasSelect = $('#lojas-select').val();
        const token = localStorage.getItem('token');
        const produtosSelectize = $('#produtos-select')[0].selectize;
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
    const lojaInput = document.getElementById('loja-input');
    const isVisible = lojaInput.classList.contains("visivel");
    if (isVisible) {
        lojaInput.classList.remove("visivel");
    } else {
        lojaInput.classList.add("visivel");
    }
}

function showProduct() {
    const produtoInput = document.getElementById('produto-input');
    const isVisible = produtoInput.classList.contains("visivel");
    if (isVisible) {
        produtoInput.classList.remove("visivel");
    } else {
        produtoInput.classList.add("visivel");
    }
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

function limitarArquivos(input) {
    if (input.files.length > 3) {
        alert('Você só pode selecionar no máximo 3 arquivos!');
        input.value = '';
    }
}

async function getLojas() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://shopscore-api.onrender.com/api/stores', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const lojas = response.data.data;
        $('#lojas-select').selectize({
            options: lojas.map(loja => {
                return { value: loja.id, text: loja.fantasyName };
            }),
            create: false,
            sortField: 'text',
            placeholder: 'Selecione uma loja'
        });
    } catch (error) {
        console.error('Erro ao buscar lojas:', error);
    }
}