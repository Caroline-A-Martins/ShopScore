async function editar() {
    var name = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var telephone = document.getElementById('telefone').value;
    var picture = document.getElementById('picture__input').files[0];

    var data = {
        name,
        email,
        telephone
    };

    const user = JSON.parse(localStorage.getItem('user'));

    if (picture) {
        if (user.image) {
            await removeImage(user.image);
        }
        var image = await saveImage(picture, 'users');
        data.image = image.urls ? image.urls[0] : '';
    }

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    await axios.put(`https://shopscore-api.onrender.com/api/users/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.data.success === true) {
                alert('Edição realizada com sucesso!');
                localStorage.setItem('user', JSON.stringify(response.data.data));
                window.location.href = '../html/pag-perfil.html';
            } else {
                if (response.data.message === 'Fields is missing!') {
                    alert('Preencha todos os campos!');
                    return;
                } else if (response.data.message === 'The already email is in use!') {
                    alert('O email já está em uso!');
                    return;
                } else if (response.data.message === 'The already telephone is in use!') {
                    alert('O telefone já está em uso!');
                    return;
                } else if (response.data.message === 'User not found!') {
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

async function editarLoja() {
    var fantasyName = document.getElementById('nome-fantasia').value;
    var corporateName = document.getElementById('razao-social').value;
    var email = document.getElementById('email').value;
    var telephone = document.getElementById('telefone').value;
    var cell = document.getElementById('celular').value;
    var description = document.getElementById('descricao').value;
    var picture = document.getElementById('picture__input').files[0];

    var data = {
        fantasyName,
        corporateName,
        email,
        telephone,
        cell,
        description
    };

    const user = JSON.parse(localStorage.getItem('user'));

    if (picture) {
        if (user.image) {
            await removeImage(user.image);
        }
        var image = await saveImage(picture, 'stores');
        data.image = image.urls ? image.urls[0] : '';
    }

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    await axios.put(`https://shopscore-api.onrender.com/api/stores/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.data.success === true) {
                alert('Edição realizada com sucesso!');
                localStorage.setItem('user', JSON.stringify(response.data.data));
                window.location.href = '../html/pag-perfil-loja.html';
            } else {
                if (response.data.message === 'Fields is missing!') {
                    alert('Preencha todos os campos!');
                    return;
                } else if (response.data.message === 'The already email is in use!') {
                    alert('O email já está em uso!');
                    return;
                } else if (response.data.message === 'The already telephone is in use!') {
                    alert('O telefone já está em uso!');
                    return;
                } else if (response.data.message === 'The already cell is in use!') {
                    alert('O celular já está em uso!');
                    return;
                } else if (response.data.message === 'Store not found!') {
                    alert('A loja não foi encontrada!');
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

async function saveImage(picture, folder) {
    const formData = new FormData();
    formData.append('file', picture);

    const token = localStorage.getItem('token');

    const response = await axios.post(`https://shopscore-api.onrender.com/api/files/${folder}`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
        .catch((error) => {
            console.error('Error:', error);
        });

    return response.data.data;

}

async function removeImage(image) {
    const token = localStorage.getItem('token');

    await axios.delete(`https://shopscore-api.onrender.com/api/files?urls=${image}`, {
        'headers': {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(_ => {
            return true;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}