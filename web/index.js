

function redirectToClassificacao(documentoId) {
        const classificacaoUrl = `../html/classificacao.html?documentoId=${documentoId}`;
        setTimeout(function() {
        window.location.href = classificacaoUrl;
    }, 100);

    return false; 
}


document.getElementById("meuFormulario").addEventListener("submit", (event) => {
    event.preventDefault();
    const formulario = event.target;
    const formData = new FormData(formulario);

    const loading = document.querySelector('.container-spinner');
    loading.style.display = 'inline';
    formulario.style.display = "none";
    fetch('http://localhost:3000/classificacao', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status : ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        redirectToClassificacao(data.documentoId)
    })
    .catch(error => {
        console.error(error);
    });
})

