function showHide(type) {
    let password = type == 'password' ? document.getElementById('password') : document.getElementById('confirmPassword');
    let icon = type == 'password' ? document.getElementById('icon') : document.getElementById('confirmIcon');

    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        icon.classList.add('hide');
    } else {
        password.setAttribute('type', 'password');
        icon.classList.remove('hide');
    }
}

