

function redirectToClassificacao(documentoId) {

    // const resposta = await handleText(documentoId);

    // if( resposta && resposta.ok){
        // console.log("entrei");
        console.log(documentoId);
        const classificacaoUrl = `../html/classificacao.html?documentoId=${documentoId}`;
        setTimeout(function() {
        window.location.href = classificacaoUrl;
    }, 100);

    return false; 
}


document.getElementById("meuFormulario").addEventListener("submit", (event) => {
    event.preventDefault();
    const formulario = event.target;

    // Crie um objeto FormData para empacotar os dados do formulário
    const formData = new FormData(formulario);

    // Faça uma requisição usando fetch ou XMLHttpRequest
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
        // console.log(data.documentoId);
        redirectToClassificacao(data.documentoId)
    })
    .catch(error => {
        console.error(error);
    });
})

