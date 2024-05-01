function abrirModalComentario() {
    const formularioComentario = document.getElementById('formulario-comentario');

    formularioComentario.style.display = 'block';
}

async function comentar() {
    const comment = document.getElementById('comentario').value;
    const idevaluation = document.getElementById('id').value;
    console.log(idevaluation)
    const iduser = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const data = {
        iduser,
        idevaluation,
        comment
    }

    await axios.post('https://shopscore-api.onrender.com/api/comments', data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        alert('Comentário cadastrado com sucesso!');
        window.location.href = `../html/comentarios-avalia.html?id=${idevaluation}`;
        return;
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Erro ao cadastrar comentário!');
        return;
    });

}
