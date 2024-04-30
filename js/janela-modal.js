function openModal() {
    const modal = document.getElementById('modal-container')
    modal.classList.add('mostrar')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'modal-container' || e.target.id == "fechar") {
            modal.classList.remove('mostrar')
            localStorage.fechaModal = 'modal-container'
        }
    })
}

//avaliações estrelas
var stars = document.querySelectorAll('.star-icon');

document.addEventListener('click', function (e) {
    var classStar = e.target.classList;
    if (!classStar.contains('ativo')) {
        stars.forEach(function (star) {
            star.classList.remove('ativo');
        });
        classStar.add('ativo');
        console.log(e.target.getAttribute('data-avaliacao'));
    }
});

//select 
function checkSelectedOption() {
    var select = document.getElementById("lojas");
    var inputDiv = document.getElementById("inputLoja");

    if (select.value === "naoencontrei") {
        inputDiv.style.display = "block";
    } else {
        inputDiv.style.display = "none";
    }
}