class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Inicio Navbar -->
            <header>
                <a href="#" class="logo">
                    <span>ShopScore</span>
                </a>
                <!-- Menu-Icon -->
                <i class='bx bx-menu' id="menu-icon"></i>
                <!-- Links -->
                <ul class="navbar">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="avaliacao.html">Avaliações</a></li>
                    <li><a href="#ranking">Ranking</a></li>
                    <li><a href="#customers">clientes</a></li>
                </ul>
                <!--Icons-->
                <div class="header-icon">
                    <a href="pag-perfil.html"><i class='bx bx-user'></i></a>
                </div>
                <div class="search-box">
                    <input type="search" name="" id="" placeholder="Pesquisa">
                </div>
            </header>
            <!-- Final Navbar -->`;
    }
}

customElements.define('custom-header', Header);
