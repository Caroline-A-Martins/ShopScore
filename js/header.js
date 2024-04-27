class Header extends HTMLElement {
    connectedCallback() {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        this.innerHTML = `
            <!-- Inicio Navbar -->
            <header>
                <a href="../html/index.html" class="logo">
                    <span>ShopScore</span>
                </a>
                <!-- Menu-Icon -->
                <i class='bx bx-menu' id="menu-icon"></i>
                <!-- Links -->
                <ul class="navbar">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="avaliacao.html">Avaliações</a></li>
                </ul>
                <img src=${user.image} class="user-pic" onclick="toggleMenu()">

                <div class="sub-menu-wrap" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src=${user.image}>
                            <h2>${user.name}</h2>
                        </div>
                        <hr>
        
                        <a href="../html/pag-perfil.html" class="sub-menu-link">
                            <i class='bx bx-user'></i>
                            <p>Perfil</p>
                            <span>></span>
                        </a>
                        <a href="#" class="sub-menu-link">
                            <i class='bx bxs-exit'></i>
                            <p onclick='logout()'>Logout</p>
                            <span>></span>
                        </a>
                    </div>
                </div>
            </header>
            <!-- Final Navbar -->`;
    }
}

customElements.define('custom-header', Header);