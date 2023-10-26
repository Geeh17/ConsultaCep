document.getElementById("buscarCEP").addEventListener("click", function () {
    const cep = document.getElementById("cepInput").value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById("resultado").textContent = "CEP não encontrado";
            } else {
                document.getElementById("resultado").innerHTML = `
                    <p>CEP: ${data.cep}</p>
                    <p>Logradouro: ${data.logradouro}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Cidade: ${data.localidade}</p>
                    <p>Estado: ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            console.error("Ocorreu um erro ao buscar o CEP:", error);
            document.getElementById("resultado").textContent = "Ocorreu um erro ao buscar o CEP";
        });
});
