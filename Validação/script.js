document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o formulário pelo seu ID
  const formulario = document.getElementById('cadastroForm');

  // Adiciona um listener para o evento de clique no botão de "Cadastrar"
  formulario.addEventListener('submit', function(event) {
    // Impede a submissão padrão do formulário (para que possamos validar primeiro)
    event.preventDefault();
    // Chama a função para validar os campos do formulário
    validarFormulario();
  });

  // Adiciona um listener para formatar o campo de CPF enquanto o usuário digita
  const cpfInput = document.getElementById('cpf');
  cpfInput.addEventListener('input', formatarCPF);

  // Adiciona um listener para formatar o campo de Telefone enquanto o usuário digita
  const telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', formatarTelefone);
});

// Função para formatar o CPF enquanto o usuário digita
function formatarCPF() {
  // Remove tudo que não é dígito
  let cpf = this.value.replace(/\D/g, '');
  // Adiciona os pontos e o traço na formatação correta
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  // Atualiza o valor do input
  this.value = cpf;
}

// Função para formatar o Telefone enquanto o usuário digita
function formatarTelefone() {
  // Remove tudo que não é dígito
  let telefone = this.value.replace(/\D/g, '');
  // Aplica a máscara para diferentes comprimentos
  if (telefone.length === 10) {
    telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (telefone.length === 11) {
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  // Atualiza o valor do input
  this.value = telefone;
}

// Função principal para validar o formulário
function validarFormulario() {
  // Limpa as mensagens de erro
  limparErros();
  // Assume que o formulário é válido inicialmente
  let formularioValido = true;

  // Validação do CPF
  const cpf = document.getElementById('cpf').value.trim();
  if (!cpf) {
    mostrarErro('cpfError', 'O CPF é obrigatório.');
    formularioValido = false;
  } else if (cpf.length !== 14) {
    mostrarErro('cpfError', 'CPF inválido.');
    formularioValido = false;
  }

  // Validação do Nome
  const nome = document.getElementById('nome').value.trim();
  if (!nome) {
    mostrarErro('nomeError', 'O nome completo é obrigatório.');
    formularioValido = false;
  }

  // Validação do Sexo
  const sexo = document.getElementById('sexo').value;
  if (!sexo) {
    mostrarErro('sexoError', 'Por favor, selecione o sexo.');
    formularioValido = false;
  }

  // Validação da Data de Nascimento
  const dataNascimento = document.getElementById('dataNascimento').value;
  if (!dataNascimento) {
    mostrarErro('dataNascimentoError', 'A data de nascimento é obrigatória.');
    formularioValido = false;
  } else {
    // O tipo 'date' já impõe um formato, mas podemos adicionar validações extras se necessário
  }

  // Validação do Telefone
  const telefone = document.getElementById('telefone').value.trim();
  if (!telefone) {
    mostrarErro('telefoneError', 'O telefone é obrigatório.');
    formularioValido = false;
  } else if (telefone.length < 10 || telefone.length > 15) {
    mostrarErro('telefoneError', 'Telefone inválido.');
    formularioValido = false;
  }

  // Se todos os campos estiverem válidos, exibe a mensagem de sucesso
  if (formularioValido) {
    document.getElementById('cadastroSucesso').style.display = 'block';
    // Aqui você faria a lógica para enviar os dados do formulário
    console.log('Formulário válido! Dados:', { cpf, nome, sexo, dataNascimento, telefone });
  }
}

// Função para exibir mensagens de erro
function mostrarErro(elementId, mensagem) {
  document.getElementById(elementId).textContent = mensagem;
}

// Função para limpar as mensagens de erro
function limparErros() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => error.textContent = '');
  document.getElementById('cadastroSucesso').style.display = 'none';
}