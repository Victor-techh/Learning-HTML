document.addEventListener('DOMContentLoaded', () => {
  const nomeTitularInput = document.getElementById('nomeTitular');

  nomeTitularInput.addEventListener('input', function() {
    this.value = this.value.toUpperCase().replace(/[^A-Z\s]/g, '');
    if (this.value.length > 19) {
      this.value = this.value.slice(0, 19);
    }
  });
});

function validarPagamento() {
  limparErros();
  const bandeira = document.getElementById('bandeira').value;
  const nomeTitular = document.getElementById('nomeTitular').value.trim();
  const numeroCartao = document.getElementById('numeroCartao').value.trim();
  const codigoSeguranca = document.getElementById('codigoSeguranca').value.trim();
  let valido = true;

  if (!bandeira) {
    mostrarErro('bandeiraError', 'Por favor, selecione a bandeira do cartão.');
    valido = false;
  }

  if (!nomeTitular) {
    mostrarErro('nomeTitularError', 'Por favor, preencha o nome do titular.');
    valido = false;
  } else if (!/^[A-Z\s]+$/.test(nomeTitular)) {
    mostrarErro('nomeTitularError', 'O nome do titular deve conter apenas letras.');
    valido = false;
  } else if (nomeTitular.length > 19) {
    mostrarErro('nomeTitularError', 'O nome do titular pode ter no máximo 19 caracteres.');
    valido = false;
  }

  if (!numeroCartao) {
    mostrarErro('numeroCartaoError', 'Por favor, preencha o número do cartão.');
    valido = false;
  } else if (!/^\d{16}$/.test(numeroCartao)) {
    mostrarErro('numeroCartaoError', 'O número do cartão deve conter exatamente 16 dígitos.');
    valido = false;
  } else if (bandeira) {
    if (!validarNumeroCartao(bandeira, numeroCartao)) {
      mostrarErro('numeroCartaoError', 'Número de cartão inválido para a bandeira selecionada.');
      valido = false;
    }
  }

  if (!codigoSeguranca) {
    mostrarErro('codigoSegurancaError', 'Por favor, preencha o código de segurança.');
    valido = false;
  } else if (!/^\d{3}$/.test(codigoSeguranca)) {
    mostrarErro('codigoSegurancaError', 'O código de segurança deve conter exatamente 3 dígitos.');
    valido = false;
  }

  if (valido) {
    document.getElementById('paymentSuccess').textContent = 'Pagamento confirmado com sucesso!';
    // Aqui você faria a lógica para processar o pagamento
  } else {
    document.getElementById('paymentSuccess').textContent = ''; // Limpa a mensagem de sucesso em caso de erro
  }
}

function validarNumeroCartao(bandeira, numero) {
  let regex;
  switch (bandeira) {
    case 'visa':
      regex = /^4\d{12,15}$/;
      break;
    case 'mastercard':
      regex = /^5[1-5]\d{14}$/;
      break;
    case 'amex':
      regex = /^3(4|7)\d{13}$/;
      break;
    default:
      return false; // Bandeira não reconhecida
  }
  return regex.test(numero);
}

function mostrarErro(elementId, mensagem) {
  document.getElementById(elementId).textContent = mensagem;
}

function limparErros() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => error.textContent = '');
}