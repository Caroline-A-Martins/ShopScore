document.addEventListener('DOMContentLoaded', function () {
    const fazerComentarioBtn = document.getElementById('fazer-comentario');
    const formularioComentario = document.getElementById('formulario-comentario');

    // Esconde o formulário ao carregar a página
    formularioComentario.style.display = 'none';

    // Evento de clique no botão para mostrar o formulário
    fazerComentarioBtn.addEventListener('click', function () {
        formularioComentario.style.display = 'block';
    });

    // Evento de envio do formulário
    formularioComentario.addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o comportamento padrão de enviar o formulário

        // Captura os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const comentario = document.getElementById('comentario').value;

        // Cria um novo elemento para exibir o comentário
        const novoComentario = document.createElement('div');
        novoComentario.classList.add('card-comentarios');

        novoComentario.innerHTML = `
            <div class="container">
                <div class="inner-user">
                    <div class="card-user">
                        <div class="card-ft">
                            <img src="../img/default-user-image.jpg" alt="Foto de Perfil">
                        </div>
                        <div class="card-dados">
                            <h1>${nome}</h1>
                        </div>
                    </div>
                    <p>${comentario}</p>
                </div>
            </div>
        `;

        // Adiciona o novo comentário ao container de comentários
        comentariosContainer.appendChild(novoComentario);

        // Limpa os campos do formulário
        document.getElementById('nome').value = '';
        document.getElementById('comentario').value = '';

        // Esconde o formulário novamente
        formularioComentario.style.display = 'none';
    });
});
