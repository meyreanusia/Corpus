function handleText() {
    try {
      fetch("http://localhost:3000/classificacao")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status : ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const tabela = document.querySelector(".tabelaClassificacao");
          const tbody = document.createElement("tbody");
  
          data.forEach((item, index) => {
            const tr = document.createElement("tr");
            const thead = document.querySelector("thead");
            for (const key in item) {
              const td = document.createElement("td");
              if (key == "classificacao") {
                const positivo = document.createElement("button");
                const negativo = document.createElement("button");
                const neutro = document.createElement("button");
  
                // positivo.classList.add("bttn-positivo");
                positivo.classList.add("btn1");
  
                // negativo.classList.add("bttn-negativo");
                negativo.classList.add("btn2");
  
                // neutro.classList.add("bttn-neutro");
                neutro.classList.add("btn3");
  
                positivo.textContent = "positivo";
                negativo.textContent = "negativo";
                neutro.textContent = "neutro";
                td.appendChild(positivo);
                td.appendChild(negativo);
                td.appendChild(neutro);
  
                positivo.addEventListener("click", (event) => {
                  selectButton(event);
                });
                negativo.addEventListener("click", (event) => {
                  selectButton(event);
                });
                neutro.addEventListener("click", (event) => {
                  selectButton(event);
                });
              } else {
                td.textContent = item[key];
              }
  
              tr.appendChild(td);
            }
  
            tbody.appendChild(tr);
          });
          tabela.appendChild(tbody);
        });
    } catch (error) {
      console.log(error);
    }
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
  
  handleText();
  