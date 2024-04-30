class Modal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div onclick="openModal()" class="btn">+</div>

        <div id="modal-container" class="modal-container">
        <div class="modal">
            <button class="fechar" id="fechar">X</button>
            <h1>Inserir Avaliação</h1>
            <form action="">           
                <div class="form-inputs">

                    <div class="form-group">
                        <div class="input">
                            <input type="radio">
                            <span>Loja<span>
                        </div>

                        <div class="form-input">
                            <div class="input">
                                <input type="radio">
                                <span>Produto<span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <select id="lojas" onchange="checkSelectedOption()">
                        <option value="">Selecione uma loja</option>
                        <option value="loja1">Loja 1</option>
                        <option value="loja2">Loja 2</option>
                        <option value="loja3">Loja 3</option>
                        <option value="naoencontrei">Não encontrei</option>
                    </select>

                    <div id="inputLoja" style="display: none;">
                        <label for="outraLoja">Digite o nome da loja:</label>
                        <input type="text" id="outraLoja" name="outraLoja">
                    </div>

                    <label for="">Descrição</label>
                    <textarea name="" id="textarea" cols="50" rows="5"></textarea>
                </div>
                <ul class="avaliacao">
                    <li class="star-icon ativo" data-avaliacao="1"></li>
                    <li class="star-icon" data-avaliacao="2"></li>
                    <li class="star-icon" data-avaliacao="3"></li>
                    <li class="star-icon" data-avaliacao="4"></li>
                    <li class="star-icon" data-avaliacao="5"></li>
                    </ul>
            </form>
        </div>`;
  }
}

customElements.define("custom-modal", Modal);
// $(async function () {
//     const token = getToken();
//     await axios.get('')
//   $("products-select").selectize(options);
// });
