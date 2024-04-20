function login () {
    var email = document.getElementById('email').value;
    var password = document.getElementById('senha').value;
    var data = {
        email: email,
        password: password,
        type: 1
    };
    axios.post('https://c13a-177-94-22-233.ngrok-free.app/api/login', data)
        .then(function (response) {
            console.log(response.data);
            if (response.data.success === true) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '../html/index.html';
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}