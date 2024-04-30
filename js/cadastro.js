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
        console.log(data.success);
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