document.addEventListener('DOMContentLoaded', function() {
  const quantidadeInput = document.getElementById('quantidade');
  quantidadeInput.addEventListener('blur', validarQuantidade);
});

function validarCEP() {
  const cep1 = document.getElementById('cep1').value;
  const cep2 = document.getElementById('cep2').value;

  if (!/^\d+$/.test(cep1) || cep1.length !== 5 || !/^\d+$/.test(cep2) || cep2.length !== 3) {
    document.getElementById('mensagem').textContent = "CEP inválido. Digite apenas números nos formatos corretos.";
    return false;
  } else {
    document.getElementById('mensagem').textContent = ""; // Limpa a mensagem se o CEP for válido
    return true;
  }
}

function validarQuantidade() {
  const quantidade = document.getElementById('quantidade').value;
  if (quantidade.length > 1 || !/^[1-9]$/.test(quantidade)) {
    alert("A quantidade de produtos deve ser no máximo 1 dígito (1 a 9).");
    document.getElementById('quantidade').value = ""; // Limpa o campo
    document.getElementById('quantidade').focus();
    return false;
  }
  return true;
}

function validarFrete() {
  if (validarCEP()) {
    alert("CEP válido. (Lógica de cálculo de frete aqui)");
    // Aqui você colocaria a lógica para calcular o frete, se o CEP for válido
  }
}