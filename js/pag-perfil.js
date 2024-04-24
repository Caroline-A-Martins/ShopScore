async function editar() {
    var name = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var telephone = document.getElementById('telefone').value;
    var password = document.getElementById('senha').value;
    var data = {
        name,
        email,
        telephone,
        password: password != '' ? password : null
    };

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    await fetch(`https://shopscore-api.render.com/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success === true) {
            alert('Edição realizada com sucesso!');
            localStorage.setItem('user', JSON.stringify(data.data));
            window.location.href = '../html/pag-perfil.html';
        } else {
            if (data.message === 'Fields is missing!') {
                alert('Preencha todos os campos!');
                return;
            } else if (data.message === 'The already email is in use!') {
                alert('O email já está em uso!');
                return;
            } else if (data.message === 'The already cpf is in use!') {
                alert('O CPF já está em uso!');
                return;
            } else if (data.message === 'The already telephone is in use!') {
                alert('O telefone já está em uso!');
                return;
            } else if (data.message === 'User not found!') {
                alert('O usuário não foi encontrado!');
            } else {
                alert('Erro ao realizar edição!');
                return;
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}