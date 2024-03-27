
let exercisesList = []
//contador para controlar passagem de exercícios
let indice = 0;
let offset = 0;

//variaveis globais para estilização:
let corpoPagina = document.querySelector('body');
let divExercicio = document.createElement('div')
let titulo = document.createElement('h2')
let musculo = document.createElement('h3')
let equipamento = document.createElement('h4')
let paragrafo = document.createElement('p');
let testinho = document.createElement('span')

const apiKey = '???';
function getExercises(difficulty) {
    divExercicio.innerHTML = '';
    fetch(`"https://api.api-ninjas.com/v1/exercises?type=stretching&difficulty=${difficulty}"` + offset, {

        method: 'GET',
        headers: { 'X-API-Key': '???'}, //TROCAR ANTES DE SUBIR!!!!!!!!
        contentType: 'aplication/json'
    }
    )
        .then((response) => response.json())
        .then(dados => {
            console.log(dados)
            exercisesList = dados
            //exibir exercício
            showExercise()
           
            indice++
        })
        .catch(error => console.log(error))
}

//configurações da apresentação dos exercícios (inserida na function getExercises(), com FETCH)
//há melhorias a serem feitas
function showExercise() {

    corpoPagina.appendChild(divExercicio)

    titulo.textContent = `Exercício: ${exercisesList[indice].name}`
    // Adicionando o parágrafo ao corpo da página
    divExercicio.appendChild(titulo)

    musculo.textContent = `Grupo muscular: ${exercisesList[indice].muscle}`
    divExercicio.appendChild(musculo)

    equipamento.textContent = `Equipamentos: ${exercisesList[indice].equipment}`
    divExercicio.appendChild(equipamento)

    paragrafo.textContent = `Instruções: ${exercisesList[indice].instructions}`//.name ou .muscle//JSON.stringify(exercisesList[indice]);mostra o conteúdo todo
    divExercicio.appendChild(paragrafo);

    testinho.textContent = (`Índice: ${indice}`);
    console.log(testinho)
    divExercicio.appendChild(testinho)

    configStyle()

   
}

//configs de estilo da div dos exercícios, está inserida na functio getExercises()
function configStyle() {
    divExercicio.style.margin = "auto";
    divExercicio.style.width = "400px";
    divExercicio.style.height = "400px";
    divExercicio.style.display = "flex";
    divExercicio.style.flexDirection = "column";
    divExercicio.style.justifyContent = "right";
    divExercicio.style.textAlign = "center;"
    divExercicio.style.alignItems = "center";
    divExercicio.style.backgroundColor = ""

    paragrafo.style.cssText = 'background-color: gray; color: white; font-size: 20px; width: 400px; height: 300px; word-wrap: break-word; text-align: justify; padding: 8px;';
    equipamento.style.color = "black";
    equipamento.style.backgroundColor = "pink";

    titulo.style.backgroundColor = "orange";
    musculo.style.backgroundColor = "magenta";
    testinho.style.backgroundColor = "orange";
}

function exerciseChange() {
    

    if (indice == 9) {
        offset += 10
        indice = 0
        getExercises()
    }
    getExercises()
    //indice++
}

function selectTimer25(){
    let timer25 = document.getElementById('25-5')
    let timer50 = document.getElementById('50-10')

    timer25.classList.add('selected')
    timer50.classList.remove('selected')
    
}
function selectTimer50(){
    let timer25 = document.getElementById('25-5')
    let timer50 = document.getElementById('50-10')

    timer25.classList.remove('selected')
    timer50.classList.add('selected')

}

function selectBeginner(){
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
    let expert = document.getElementById('expert')

    beginner.classList.add('selected')
    intermediate.classList.remove('selected')
    expert.classList.remove('selected')
    return
}
function selectIntermediate(){
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
    let expert = document.getElementById('expert')

    beginner.classList.remove('selected')
    intermediate.classList.add('selected')
    expert.classList.remove('selected')
    return
}
function selectExpert(){
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
    let expert = document.getElementById('expert')

    beginner.classList.remove('selected')
    intermediate.classList.remove('selected')
    expert.classList.add('selected')
    return      
}

function start(){
    let configs = document.querySelectorAll('.selected')
    
    let pomodoroType = configs[0].innerText
    let difficulty = configs[1].innerText

    console.log(difficulty)
    console.log(pomodoroType)
    // getExercises(difficulty)
    // getTimer(pomodoroType)
}

//funcao para surgirem botoes adicionados previamente no HTML--> adicionar ao "start pomodoro", após limpar a página inicial
function showButtons() {
    let btnObter = document.getElementById('btn-obter');
    let btnTrocar = document.getElementById('btn-trocar');
    btnObter.style.display = 'block';
    btnTrocar.style.display = 'block';
}

//esta função contem os botões criados diretamente no JS, para surgirem quando trocar de página também 
//mais configs serão acrescentadas
function dinamicButton(){
    let divDinamica = document.createElement("div")
    document.body.appendChild(divDinamica);
    
    let btnStretching = document.createElement("button");
    btnStretching.innerHTML = "OBTER ALONGAMENTO";
    btnStretching.onclick = getExercises;
    divDinamica.appendChild(btnStretching)
    
    let btnSkip = document.createElement("button");
    btnSkip.innerHTML = "PROXIMO";
    btnSkip.onclick = exerciseChange;
    divDinamica.appendChild(btnSkip)
    
    divDinamica.style.backgroundColor = "red";
    divDinamica.style.display = "flex";
    divDinamica.style.flexDirection = "column";
    divDinamica.style.width = "180px";
    
    divDinamica.style.position = "absolute";
    divDinamica.style.bottom = "300px";
    divDinamica.style.right = "300px";
}
//é necessário encaixar no local certo para ser chamada
dinamicButton()

function getTimer(pomodoroType) {
    
}