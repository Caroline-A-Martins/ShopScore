class Header extends HTMLElement {
    connectedCallback() {
        const user = JSON.parse(localStorage.getItem('user'));
        const type = localStorage.getItem('type');
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
                <img src=${user.image ? user.image : '../img/perfil.png'} class="user-pic" onclick="toggleMenu()">

                <div class="sub-menu-wrap" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src=${user.image ? user.image : '../img/perfil.png'}>
                            <h2>${type == 'user' ? user.name : user.fantasyName}</h2>
                        </div>
                        <hr>
        
                        <a href="../html/${type == 'user' ? 'pag-perfil.html' : 'pag-perfil-loja.html'}" class="sub-menu-link">
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

        // confg do arq index.html

        let navbar = document.querySelector('.navbar');
        let menuIcon = document.getElementById('menu-icon');

        menuIcon.onclick = () => {
            navbar.classList.toggle('active');
        }

        window.onscroll = () => {
            navbar.classList.remove('active');
        }

        let header = document.querySelector('header');

        window.addEventListener('scroll', () => {
            header.classList.toggle('shadow', window.scrollY > 0);
        });
    }

}

customElements.define('custom-header', Header);