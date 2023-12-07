

function handleText(documentoId) {
  try {
    fetch(`http://localhost:3000/classificacao/${documentoId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const listaTextos = data.listaTextos
        const tabela = document.querySelector(".tabelaClassificacao");
        const tbody = document.createElement("tbody");

        listaTextos.forEach((item, index, documentoId) => {
          if (index === 0) {
            criarTabela(item, index, documentoId);
          }
          const tr = document.createElement("tr");
          const thead = document.querySelector("thead");

          index = 0; 
          for (const key in item) {
            const td = document.createElement("td");

            if (index == 2) {
              const positivo = document.createElement("button");
              const negativo = document.createElement("button");
              const neutro = document.createElement("button");

              positivo.classList.add("btn1");
              negativo.classList.add("btn2");
              neutro.classList.add("btn3");

              positivo.textContent = "positivo";
              negativo.textContent = "negativo";
              neutro.textContent = "neutro";
              td.appendChild(positivo);
              td.appendChild(negativo);
              td.appendChild(neutro);

              positivo.addEventListener("click", (event) => {
                selectButton(event);
                classificar(event);
              });
              negativo.addEventListener("click", (event) => {
                selectButton(event);
                classificar(event);
              });
              neutro.addEventListener("click", (event) => {
                selectButton(event);
                classificar(event);
              });

              if(item[key]){

                switch (item[key]) {
                  case 'positivo':
                    positivo.classList.add('selecionado');
                    break;
                  case 'negativo':
                    negativo.classList.add('selecionado');
                    break;
                  case 'neutro':
                    neutro.classList.add('selecionado');
                    break;
                }
              }
            } 
            else if (index >= 3) {
              continue
            }else {
              td.textContent = item[key];
            }

            tr.appendChild(td);
            index++
          }

          tbody.appendChild(tr);
        });
        tabela.appendChild(tbody);
      });

  } catch (error) {
    console.log(error);
  }
}

function criarTabela(item, index, documento) {

  const documentoId = documento[0].documentoId;
  const tabela = document.querySelector(".tabelaClassificacao");
  const thead = document.querySelector("thead");
  const tr = document.createElement("tr");

  const id = document.createElement("th");
  id.textContent = "ID";
  id.style.width = "10%";

  const texto = document.createElement("th");
  texto.textContent = "Texto";
  texto.style.width = "80%";

  const classificacao = document.createElement("th");
  classificacao.textContent = "Rótulo";
  id.style.width = "10%";

  tr.appendChild(id);
  tr.appendChild(texto);
  tr.appendChild(classificacao);

  thead.appendChild(tr);

  const body = document.querySelector("body");
  const dowload = document.createElement("a");
  dowload.classList.add("dowload");
  dowload.textContent = "Dowload CSV"
  dowload.setAttribute("href", `http://localhost:3000/download-csv/${documentoId}`)
  body.appendChild(dowload)
}

function selectButton(event) {
  const button = event.target;

  // Obtenha a linha (tr) pai do botão clicado
  const row = button.closest("tr");
  button.classList.toggle("selecionado");

  //Remova a classe 'selecionado' de todos os botões na mesma linha
  row.querySelectorAll('button[class^="btn"]').forEach((btn) => {
    if (btn != button) {
      btn.classList.remove("selecionado");
    }
  });
}

async function classificar(event) {
  const button = event.target;
  const row = button.closest("tr");
  const idCell = row.querySelector("td");
  const id = idCell.textContent;

  try{

    const response = await fetch(`http://localhost:3000/classificacao/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classificacao: button.textContent
      })
    })

  if(!response.ok){
    throw new Error(`Erro na classificação: ${response.statusText}`)
  }

  const data = await response.json();

  }catch(error){
    console.log(`Erro durante a requisição: ${error}`);

  }
}
const urlParams = new URLSearchParams(window.location.search);
const documentoId = urlParams.get('documentoId');
handleText(documentoId)
