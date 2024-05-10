class Modal extends HTMLElement {
    async connectedCallback() {
        const type = localStorage.getItem('type');
        this.innerHTML = `
        ${type === 'user' ? '<div onclick="openModal()" class="btn">+</div>' : ''}
        <dialog id="modal-container" class="modal-container">
            <h2>Inserir Avaliação</h2>
            <form enctype="multipart/form-data" action="#">
                <div class="input-group">
                    <label for="lojas-select">Loja</label>
                    <select id="lojas-select" onchange="getProdutos()" name="idstore"></select>
        
                    <div class="n-encontra">
                    <label for="cnpj">Não encontrou a loja?</label>
                    <button class="icon-wrapper" onclick="showCnpj()">+</button>
                    </div>
        
                    <div class="oculto" id="loja-input">
                    <input type="text" id="cnpj" name="cnpj" placeholder="Insira o CNPJ...">
                    </div>
        
        
                    <label for="produtos-select">Produto</label>
                    <select id="produtos-select" name="idstoreproduct"></select>
        
                    <div class="n-encontra">
                    <label for="produto">Não encontrou o produto?</label>
                    <button class="icon-wrapper" onclick="showProduct()">+</button>
                    </div>
        
                    <div class="oculto" id="produto-input">
                    <input type="text" id="produto" name="produto" placeholder="Insira o nome do produto...">
                    <input type="text" id="descricao_prod" name="descricao_prod" placeholder="Insira a descrição...">
                    <input type="file" id="imagem" name="imagem" accept="image/*">
                    </div>
        
                    <label for="titulo">Título</label>
                    <input type="text" id="titulo" name="titulo">
        
                    <label for="descricao">Descrição</label>
                    <textarea name="descricao" id="descricao" cols="50" rows="5"></textarea>
                </div>
        
                <div class="input-group">
                    <ul class="avaliacao">
                    <li class="star-icon ativo" data-avaliacao="1" onclick="setNote(1)"></li>
                    <li class="star-icon" data-avaliacao="2" onclick="setNote(2)"></li>
                    <li class="star-icon" data-avaliacao="3" onclick="setNote(3)"></li>
                    <li class="star-icon" data-avaliacao="4" onclick="setNote(4)"></li>
                    <li class="star-icon" data-avaliacao="5" onclick="setNote(5)"></li>
                    </ul>
                </div>
        
                <input type="hidden" id="rating" name="rating" value="1">
        
                <div class="input-group">
                    <button class="btn-enviar" onclick="avaliar()">Enviar</button>
                </div>
            </form>

            <button class="fechar" onclick="fecharModal()">Fechar</button>
        </dialog>
`;

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
}

$(document).ready(function () {
    $('#produtos-select').selectize({
        create: false,
        sortField: 'text',
        placeholder: 'Selecione um produto'
    });
});

customElements.define("custom-modal", Modal);