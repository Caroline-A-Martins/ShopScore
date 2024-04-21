class Header extends HTMLElement {
    connectedCallback() {
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
                    <li><a href="#ranking">Ranking</a></li>
                </ul>
                <img src="../img/perfil.png" class="user-pic" onclick="toggleMenu()">

                <div class="sub-menu-wrap" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src="../img/perfil.png">
                            <h2>Nome de Usuario</h2>
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