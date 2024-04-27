// Selecionando os elementos HTML relevantes
const Equac = document.querySelector('#idAreaEquacao'); // Elemento para exibir a equação
const Resp = document.querySelector('#idAreaResp'); // Elemento para exibir a resposta
const btnGerar = document.querySelector('#btnGerarQ'); // Botão "Gerar Equação"
const btnValidar = document.querySelector('#btnValidarRes'); // Botão "Validar Resposta"
const respRef = document.querySelector('#resposta'); // Campo de entrada para a resposta do usuário

// Variável para armazenar a resposta correta da equação gerada
let respostaCorreta;

// Função para gerar uma equação aleatória
const gerarEquacaoAleatoria = () => {
    // Escolhendo aleatoriamente entre adição (0), subtração (1) ou multiplicação (2)
    const operacao = Math.floor(Math.random() * 3); // Retorna um número entre 0 e 2

    // Gerando números aleatórios para a equação
    const xy = {
        x: Math.trunc(Math.random() * 10),
        y: Math.trunc(Math.random() * 10)
    };

    // Escolhendo o operador com base no valor gerado aleatoriamente
    let operador, resultado;
    switch (operacao) {
        case 0:
            operador = '+';
            resultado = xy.x + xy.y;
            break;
        case 1:
            operador = '-';
            resultado = xy.x - xy.y;
            break;
        case 2:
            operador = 'x';
            resultado = xy.x * xy.y;
            break;
    }

    // Retornando um objeto contendo os operandos, operador e resultado da equação
    return {
        x: xy.x,
        y: xy.y,
        operador: operador,
        resultado: resultado
    };
};

// Adicionando um evento de clique ao botão "Gerar Equação"
btnGerar.addEventListener('click' , () => {
    // Gerando uma nova equação aleatória
    const novaEquac = gerarEquacaoAleatoria();

    // Exibindo a nova equação na área correspondente
    Equac.innerText = `${novaEquac.x} ${novaEquac.operador} ${novaEquac.y}`;

    // Armazenando a resposta correta para a equação gerada
    respostaCorreta = novaEquac.resultado;

    // Limpando a mensagem de resposta anterior e o campo de entrada
    Resp.innerText = '------------------'; // Exibindo uma linha pontilhada para indicar uma resposta neutra
    Resp.style.color = 'gray'; // Definindo a cor do texto como cinza para indicar uma resposta neutra
    respRef.value = ''; // Limpando o campo de entrada de resposta
});

// Adicionando um evento de clique ao botão "Validar Resposta"
btnValidar.addEventListener('click', () =>{
    // Verificando se o campo de resposta está vazio
    if(respRef.value === '') {
        // Exibindo um alerta se o campo de resposta estiver vazio
        alert('Erro! Campo de Resposta Vazio');

        // Limpando a mensagem de resposta e definindo a cor do texto como cinza
        Resp.innerText = '------------------';
        Resp.style.color = 'gray';
        
        return -1; // Retorna -1 para indicar que houve um erro
    }
    
    // Convertendo a resposta do usuário para um número
    const respostaUsuario = parseInt(respRef.value);
    
    // Comparando a resposta do usuário com a resposta correta
    if(respostaUsuario === respostaCorreta) {
        // Se a resposta estiver correta, exibindo a mensagem "Parabéns!" em verde
        Resp.innerText = 'Parabéns!';
        Resp.style.color = 'green'; // Definindo a cor do texto como verde
    } else {
        // Se a resposta estiver incorreta, exibindo a mensagem correta e a resposta correta em vermelho
        Resp.innerText = `Deu Ruim! A resposta correta é ${respostaCorreta}`;
        Resp.style.color = 'red'; // Definindo a cor do texto como vermelho
    }
    
    // Limpando o campo de entrada de resposta após a validação
    respRef.value = '';
});