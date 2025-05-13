document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona os elementos do DOM que serão manipulados.
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');
    const cadastroTitle = document.getElementById('cadastroTitle');
    const btnCadastro = document.getElementById('btnCadastro');
    const btnVoltarLogin = document.getElementById('btnVoltarLogin');

    // 2. Adiciona um event listener ao botão "Quero me cadastrar" do formulário de acesso.
    btnCadastro.addEventListener('click', () => {
        // Quando o botão é clicado:
        loginForm.classList.add('hidden'); // Adiciona a classe 'hidden' para esconder o formulário de acesso.
        cadastroForm.classList.remove('hidden'); // Remove a classe 'hidden' para mostrar o formulário de cadastro.
        cadastroTitle.classList.remove('hidden'); // Remove a classe 'hidden' para mostrar o título de cadastro.
        limparErrosCadastro(); // Chama a função para limpar quaisquer mensagens de erro do formulário de cadastro.
    });

    // 3. Adiciona um event listener ao botão "Voltar para Acesso" do formulário de cadastro.
    btnVoltarLogin.addEventListener('click', () => {
        // Quando o botão é clicado:
        cadastroForm.classList.add('hidden'); // Adiciona a classe 'hidden' para esconder o formulário de cadastro.
        cadastroTitle.classList.add('hidden'); // Adiciona a classe 'hidden' para esconder o título de cadastro.
        loginForm.classList.remove('hidden'); // Remove a classe 'hidden' para mostrar o formulário de acesso.
        limparErrosAcesso(); // Chama a função para limpar quaisquer mensagens de erro do formulário de acesso.
    });

    // 4. Função para limpar as mensagens de erro do formulário de acesso.
    function limparErrosAcesso() {
        document.getElementById('emailLoginError').textContent = ''; // Define o texto da div de erro do email de acesso para vazio.
        document.getElementById('passwordLoginError').textContent = ''; // Define o texto da div de erro da senha de acesso para vazio.
    }

    // 5. Função para limpar as mensagens de erro do formulário de cadastro.
    function limparErrosCadastro() {
        document.getElementById('nomeCadastroError').textContent = ''; // Define o texto da div de erro do nome de cadastro para vazio.
        document.getElementById('emailCadastroError').textContent = ''; // Define o texto da div de erro do email de cadastro para vazio.
        document.getElementById('senhaCadastroError').textContent = ''; // Define o texto da div de erro da senha de cadastro para vazio.
    }

    // 6. Função para validar o formato do email.
    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para verificar um formato de email básico.
        return emailRegex.test(email); // Retorna true se o email corresponde ao padrão, false caso contrário.
    }

    // 7. Função para validar a senha.
    function validarSenha(senha) {
        const senhaRegex = /^[a-zA-Z0-9]{6,10}$/; // Expressão regular para verificar se a senha tem entre 6 e 10 caracteres alfanuméricos.
        const requisitosRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/; // Expressão regular para verificar se a senha contém pelo menos uma letra maiúscula, uma minúscula e um número.
        return senhaRegex.test(senha) && requisitosRegex.test(senha); // Retorna true se ambas as condições forem atendidas.
    }

    // 8. Função para validar o nome completo.
    function validarNome(nome) {
        const partesNome = nome.trim().split(/\s+/); // Remove espaços em branco extras no início e no final e divide o nome em partes (palavras) usando espaços como separadores.
        return partesNome.length >= 2 && partesNome.every(parte => parte.length >= 2); // Retorna true se houver pelo menos duas partes no nome e se cada parte tiver pelo menos 2 caracteres.
    }

    // 9. Função chamada ao clicar no botão "Acessar".
    window.validarAcesso = function() {
        limparErrosAcesso(); // Limpa as mensagens de erro do formulário de acesso.
        const email = document.getElementById('emailLogin').value.trim(); // Obtém o valor do campo de email e remove espaços em branco extras.
        const senha = document.getElementById('passwordLogin').value; // Obtém o valor do campo de senha.
        let valido = true; // Variável para rastrear se a validação passou.

        if (!email) {
            document.getElementById('emailLoginError').textContent = 'Por favor, preencha o email.'; // Exibe mensagem de erro se o email estiver vazio.
            valido = false; // A validação falhou.
        } else if (!validarEmail(email)) {
            document.getElementById('emailLoginError').textContent = 'Por favor, insira um email válido.'; // Exibe mensagem de erro se o formato do email for inválido.
            valido = false; // A validação falhou.
        }

        if (!senha) {
            document.getElementById('passwordLoginError').textContent = 'Por favor, preencha a senha.'; // Exibe mensagem de erro se a senha estiver vazia.
            valido = false; // A validação falhou.
        }

        if (valido) {
            alert('Acesso permitido (validação cliente).'); // Exibe um alerta de sucesso se todas as validações passarem (no mundo real, você enviaria os dados para o servidor aqui).
        }
    };

    // 10. Função chamada ao clicar no botão "Quero me cadastrar" do formulário de cadastro.
    window.validarCadastro = function() {
        limparErrosCadastro(); // Limpa as mensagens de erro do formulário de cadastro.
        const nome = document.getElementById('nomeCadastro').value.trim(); // Obtém o valor do campo de nome e remove espaços em branco extras.
        const email = document.getElementById('emailCadastro').value.trim(); // Obtém o valor do campo de email e remove espaços em branco extras.
        const senha = document.getElementById('senhaCadastro').value; // Obtém o valor do campo de senha.
        let valido = true; // Variável para rastrear se a validação passou.

        if (!nome) {
            document.getElementById('nomeCadastroError').textContent = 'Por favor, preencha o nome completo.'; // Exibe mensagem de erro se o nome estiver vazio.
            valido = false; // A validação falhou.
        } else if (!validarNome(nome)) {
            document.getElementById('nomeCadastroError').textContent = 'Por favor, informe nome e sobrenome com pelo menos 2 caracteres cada.'; // Exibe mensagem de erro se o formato do nome for inválido.
            valido = false; // A validação falhou.
        }

        if (!email) {
            document.getElementById('emailCadastroError').textContent = 'Por favor, preencha o email.'; // Exibe mensagem de erro se o email estiver vazio.
            valido = false; // A validação falhou.
        } else if (!validarEmail(email)) {
            document.getElementById('emailCadastroError').textContent = 'Por favor, insira um email válido.'; // Exibe mensagem de erro se o formato do email for inválido.
            valido = false; // A validação falhou.
        }

        if (!senha) {
            document.getElementById('senhaCadastroError').textContent = 'Por favor, preencha a senha.'; // Exibe mensagem de erro se a senha estiver vazia.
            valido = false; // A validação falhou.
        } else if (!validarSenha(senha)) {
            document.getElementById('senhaCadastroError').textContent = 'A senha deve ter 6-10 caracteres e conter pelo menos 1 minúscula, 1 maiúscula e 1 número.'; // Exibe mensagem de erro se o formato da senha for inválido.
            valido = false; // A validação falhou.
        }

        if (valido) {
            alert('Cadastro realizado com sucesso (validação cliente).'); // Exibe um alerta de sucesso se todas as validações passarem (no mundo real, você enviaria os dados para o servidor aqui).
        }
    };
});