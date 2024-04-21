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
                    <label for="nome"> Nome produto/loja</label>
                    <input type="text" id="nome" placeholder="Digite o nome do produto/loja " required>
                    <label for="">Descrição</label>
                    <textarea name="" id="" cols="70" rows="5"></textarea>
                </div>
            </form>
        </div>`;
    }
}

customElements.define('custom-modal', Modal);
