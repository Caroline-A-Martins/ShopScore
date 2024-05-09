function abrirModalComentario() {
    const formularioComentario = document.getElementById('form-div');

    formularioComentario.style.display = 'block';
}

async function comentar() {
    const comment = document.getElementById('comentario').value;
    const idevaluation = document.getElementById('id').value;
    const iduser = localStorage.getItem('id');
    const type = localStorage.getItem('type');
    const token = localStorage.getItem('token');

    let data = {};
    let url = '';
    let method = '';
    if (type == 'user') {
        data = {
            iduser,
            idevaluation,
            comment
        }

        url = 'https://shopscore-api.onrender.com/api/comments';
        method = 'post';
    } else {
        data = {
            answer: comment
        }

        url = `https://shopscore-api.onrender.com/api/evaluations/${idevaluation}`;
        method = 'put';
    }

    await axios({
        url: url,
        method: method,
        data: data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            alert(`${type === 'user' ? 'Comentário' : 'Resposta'} cadastrado com sucesso!`);
            window.location.href = `../html/comentarios-avalia.html?id=${idevaluation}`;
            return;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao cadastrar comentário!');
            return;
        });

}
