let subMenu = document.getElementById("subMenu");
function toggleMenu() {
    subMenu.classList.toggle("open-menu")
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '../html/login.html';
}