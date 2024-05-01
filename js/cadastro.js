async function cadastro() {
    var name = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var cpf = document.getElementById('cpf').value;
    var birthDate = document.getElementById('data-nasc').value;
    var telephone = document.getElementById('telefone').value;
    var gender = document.querySelector('input[name="genero"]:checked').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password != confirmPassword) {
        alert('Senhas não conferem!');
        return;
    }

    var data = {
        name,
        email,
        telephone,
        password,
        birthDate,
        cpf,
        gender, 
        type: 1
    };

    await fetch('https://shopscore-api.onrender.com/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success === true) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../html/login.html';
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
            } else if (data.message === 'The password must be at least 8 characters long, one of which must be special!') {
                alert('A senha precisa ter pelo menos 8 caracteres alfanuméricos, sendo pelo menos um especial!');
                return;
            } else {
                alert('Erro ao realizar cadastro!');
                return;
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

async function cadastroLoja() {
    var cnpj = document.getElementById('cnpj').value;
    var fantasyName = document.getElementById('nome-fantasia').value;
    var corporateName = document.getElementById('razao-social').value;
    var email = document.getElementById('email').value;
    var description = document.getElementById('descricao').value;
    var cell = document.getElementById('celular').value;
    var telephone = document.getElementById('telefone').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password != confirmPassword) {
        alert('Senhas não conferem!');
        return;
    }

    var data = {
        cnpj,
        fantasyName,
        corporateName,
        email,
        description,
        cell,
        telephone,
        password
    };

    await fetch('https://shopscore-api.onrender.com/api/stores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success === true) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../html/login.html';
        } else {
            if (data.message === 'Fields is missing!') {
                alert('Preencha todos os campos!');
                return;
            } else if (data.message === 'The already email is in use!') {
                alert('O email já está em uso!');
                return;
            } else if (data.message === 'The already cnpj is in use!') {
                alert('O CNPJ já está em uso!');
                return;
            } else if (data.message === 'The already telephone is in use!') {
                alert('O telefone já está em uso!');
                return;
            } else if (data.message === 'The already cell is in use!') {
                alert('O celular já está em uso!');
                return;
            } else if (data.message === 'The password must be at least 8 characters long, one of which must be special!') {
                alert('A senha precisa ter pelo menos 8 caracteres alfanuméricos, sendo pelo menos um especial!');
                return;
            } else {
                alert('Erro ao realizar cadastro!');
                return;
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

async function pegarInfos() {
    const cnpj = document.getElementById('cnpj').value;

    await axios.get(`https://shopscore-api.onrender.com/api/stores/cnpj/info?cnpj=${cnpj}`)
    .then(response => {
        let data = response.data.data;

        document.getElementById('nome-fantasia').value = data.fantasyName;
        document.getElementById('razao-social').value = data.corporateName;
        document.getElementById('email').value = data.email;
        document.getElementById('celular').value = data.cell;
        document.getElementById('descricao').value = data.description;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}