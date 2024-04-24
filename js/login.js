async function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('senha').value;
    var data = {
        email: email,
        password: password,
        type: 1
    };
    await fetch('https://shopscore-api.onrender.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(response => response.json())
        .then(data => {
            console.log(data.data);
            if (data.success === true) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.data.id);
                localStorage.setItem('user', JSON.stringify(data.data));
                alert('Login realizado com sucesso!');
                window.location.href = '../html/index.html';
                return;
            } else {
                if (data.message === 'Fields is missing!') {
                    alert('Preencha todos os campos!');
                    return;
                } else if (data.message === 'Email or password is incorrect, please try again!') {
                    alert('Email ou senha incorretos, por favor tente novamente!');
                    return;
                } else {
                    alert('Erro ao realizar login!');
                    return;
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}