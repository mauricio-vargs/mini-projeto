Este projeto tem por finalidade criar um Pomodoro que divide o tempo em períodos selecionados pelo usuário 
para organizar o tempo de trabalho e um tempo para alongamento. Ao final do temporizador, o programa 
apresenta exercícios de alongamento sorteados para proporcionar uma pausa ativa. 
Durante o período destinado para o descanso, o usuário poderá mudar os exercícios quantas vezes desejar até que o tempo de descanso termine.

Os arquivos do projeto são organizados desse maneira:
- index.html: arquivo html que executa o programa
- script.js: arquivo javaScript com as funcionalidades
- reset.css: conjunto de estilos para "redefinir" ou "zerar" as configurações padrão do navegador
- style.css: define o estilo da página html

Funções do do mini-projeto contido no arquivo script.js
  - function selectTimer25() - função chamada pelo botão de Timer 25/5 que guarda o tempo de 25 minutos
  
  - function selectTimer50()  - função chamada pelo botão de Timer 50/10 que guarda o tempo de 50 minutos

  - function selectBeginner() - função chamada pelo botão Iniciante e seleciona o grau de dificultade do       
    alongamento como iniciante

  - function selectIntermediate() - função chamada pelo botão Intermediário que seleciona o grau de dificultade do alongamento como intermediário

  - function start() - Limpa as configurações da tela e remove a classe selected de todos elementos em seguida chama a função createTimer para iniciar o tempo de trabalho

  - function createTimer() - Cria o display e configura a duração do timer

  - function startTimer() - Começa a contagem regressiva do timer, se iniciar o intervalo, chama a função startExercicioTimer() para apresentar os alongamentos
        
  - function stop() - para o timer a qualquer momento quando clicar no botão parar

  - function startExerciseTimer() - inicia o intervalo no cronômetro regressivo com o tempo que foi informado 
    
  - function showConfigsPage() - quando termina o intervalo essa função esconde os elementos configurados para mostrar os exercícios.

  - function pegarExercicio() - Usa o fetch para buscar por exercícios do type stretching na API Ninjas e chama a função exebirExercicios()

  - function startExercicio() - chama a função exibir exercício caso ainda não tenham sido apresentados 10, se já 
  formam apresentados 10 incrementa 10 na variável offset para pegar mais 10 exercícios diferentes

  - function exibirExercicio() - captura os elementos da página html para apresentar os exercícios que foi pego na função pegarExercicio() no API Ninjas e mostra o botão Next exercise
