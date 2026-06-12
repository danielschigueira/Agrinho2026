// Variáveis de controle do estado da estufa
let regando = false;
let luzLigada = false;
let temperatura = 25;

// Elementos da página
const waterBtn = document.getElementById('water-btn');
const waterStatus = document.getElementById('water-status');
const efeitoAgua = document.getElementById('efeito-agua');

const lightBtn = document.getElementById('light-btn');
const lightStatus = document.getElementById('light-status');
const efeitoLuz = document.getElementById('efeito-luz');

const tempVal = document.getElementById('temp-val');
const feedback = document.getElementById('feedback');

// Legumes para animação de crescimento
const legumes = document.querySelectorAll('.legume');

// Função para ligar/desligar irrigação
function toggleRegar() {
    regando = !regando;
    if (regando) {
        waterBtn.innerText = "Desligar Regadores";
        waterStatus.innerText = "Ligado (Consumo Inteligente)";
        waterStatus.className = "on";
        efeitoAgua.classList.add('chuva-ativa');
    } else {
        waterBtn.innerText = "Ligar Regadores";
        waterStatus.innerText = "Desligado";
        waterStatus.className = "off";
        efeitoAgua.classList.remove('chuva-ativa');
    }
    verificarEcossistema();
}

// Função para ligar/desligar luz solar LED
function toggleLuz() {
    luzLigada = !luzLigada;
    if (luzLigada) {
        lightBtn.innerText = "Desligar Luzes";
        lightStatus.innerText = "Ligado (Energia Solar Limpa)";
        lightStatus.className = "on";
        efeitoLuz.classList.add('luz-ativa');
    } else {
        lightBtn.innerText = "Ligar Luzes";
        lightStatus.innerText = "Desligado";
        lightStatus.className = "off";
        efeitoLuz.classList.remove('luz-ativa');
    }
    verificarEcossistema();
}

// Função para alterar a temperatura
function atualizarTemperatura(valor) {
    temperatura = parseInt(valor);
    tempVal.innerText = temperatura + "°C";
    
    // Mudar cor do texto da temperatura baseado no perigo
    if (temperatura >= 20 && temperatura <= 30) {
        tempVal.style.color = "#2e7d32"; // Ideal
    } else {
        tempVal.style.color = "#c62828"; // Muito frio ou muito quente
    }
    verificarEcossistema();
}

// Lógica que analisa se o agro está forte e sustentável
function verificarEcossistema() {
    let idealParaCrescer = false;

    // Condição perfeita: Água ligada, luz ligada e temperatura entre 20°C e 30°C
    if (regando && luzLigada && temperatura >= 20 && temperatura <= 30) {
        idealParaCrescer = true;
        feedback.innerHTML = "🌱 <strong>Equilíbrio Perfeito!</strong> Os sensores indicam que o consumo de água está otimizado, usando energia limpa e temperatura ideal. Os legumes estão crescendo rápidos e saudáveis!";
        feedback.style.color = "#1b5e20";
        
        // Faz os emojis crescerem (efeito visual)
        legumes.forEach(legume => {
            legume.style.transform = "scale(1.4)";
        });
    } else {
        // Feedbacks personalizados para ajudar o usuário a entender o erro
        if (!regando) {
            feedback.innerText = "Alerta: Solo seco! Ligue a irrigação automatizada para evitar desperdício de plantas.";
        } else if (!luzLigada) {
            feedback.innerText = "Alerta: Falta de luz! Ative os painéis solares para iluminar a estufa.";
        } else if (temperatura < 20) {
            feedback.innerText = "Alerta: Temperatura muito baixa! O frio extremo atrasa o desenvolvimento dos alimentos.";
        } else if (temperatura > 30) {
            feedback.innerText = "Alerta: Calor excessivo! Alto risco de queima das folhas e desperdício de água por evaporação.";
        }
        feedback.style.color = "#555";

        // Volta os emojis ao tamanho padrão
        legumes.forEach(legume => {
            legume.style.transform = "scale(1)";
        });
    }
}