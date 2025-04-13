document.getElementById("buscarCEP").addEventListener("click", async () => {
    const cep = document.getElementById("cepInput").value.replace(/\D/g, "");
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
  
    if (cep.length !== 8) {
      return mostrarErro("CEP inválido. Digite exatamente 8 dígitos.");
    }
  
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
  
      if (data.erro) {
        mostrarErro("CEP não encontrado.");
      } else {
        mostrarEndereco(data);
      }
    } catch (err) {
      mostrarErro("Erro ao buscar o CEP.");
    }
  });
  
  document.getElementById("buscarEndereco").addEventListener("click", async () => {
    const uf = document.getElementById("ufInput").value.trim().toUpperCase();
    const cidade = document.getElementById("cidadeInput").value.trim();
    const logradouro = document.getElementById("logradouroInput").value.trim();
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
  
    if (!uf || !cidade || !logradouro) {
      return mostrarErro("Preencha todos os campos: UF, Cidade e Logradouro.");
    }
  
    try {
      const url = `https://viacep.com.br/ws/${uf}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json/`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (!Array.isArray(data) || data.length === 0 || data.erro) {
        return mostrarErro("Endereço não encontrado.");
      }
  
      data.forEach(endereco => mostrarEndereco(endereco));
    } catch (err) {
      mostrarErro("Erro ao buscar o endereço.");
    }
  });
  
  function mostrarEndereco(data) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML += `
      <p><strong>CEP:</strong> ${data.cep}</p>
      <p><strong>Logradouro:</strong> ${data.logradouro}</p>
      <p><strong>Bairro:</strong> ${data.bairro}</p>
      <p><strong>Cidade:</strong> ${data.localidade}</p>
      <p><strong>Estado:</strong> ${data.uf}</p>
      <hr/>
    `;
  }
  
  function mostrarErro(msg) {
    document.getElementById("resultado").innerHTML = `<p class="error">${msg}</p>`;
  }
  