function showForm(formType) {
    const formLoja = document.getElementById('formLoja');
    const formProduto = document.getElementById('formProduto');

    if (formType === 'loja') {
        formLoja.style.display = 'block';
        formProduto.style.display = 'none';
    } else if (formType === 'produto') {
        formLoja.style.display = 'none';
        formProduto.style.display = 'block';
    }
}
