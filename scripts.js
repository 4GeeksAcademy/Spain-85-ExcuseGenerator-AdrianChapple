//Genera una nueva excusa al cargar la página
window.onload = function() {
    addNewExcuse();

    const entendido = localStorage.getItem("modalAcknowledged"); // Guardamos si alguien ha dado entendido al dialogo, para no mostrarlo otra vez
    if(!entendido) modal.showModal()
    
};

// Operaciones de modal
const closeButton = document.querySelector("[data-close-modal-button]");
const modal = document.querySelector("[data-modal]");

closeButton.addEventListener("click", () => {
    modal.close();
    localStorage.setItem("modalAcknowledged", "true")
});


let who = ['El gato', 'Mi abuela', 'El repartidor', 'Mi pájaro', 'Mi amo', 'El robot', 'El programador genio llamado Adrian'];
let action = ['se comió', 'destruyó', 'obliteró', 'se meó encima de', 'hizo volar a', 'maldijo'];
let what = ['mis otros gatos', 'mi móvil', 'mi coche', 'mi mapa de conquista de Francia', 'mi calculadora', 'mi tio-bisabuelo tercero'];
let when = ['mientras estaba intentando conquistar Francia', 'mientras estaba durmiendo', 'mientras estaba ejercitando', 'durante mi cena', 'mientras rezaba', 'mientras iba en nave espacial' ];

function generateRandom(arr) {
    return arr[~~(Math.random()*arr.length)]; // El ~~ es una forma de escribir Math.floor!, que diver
};

let isAnimating = false;
function addNewExcuse() {
    if (!isAnimating) {
        // Generación de texto
        let newExcuse = `${generateRandom(who)} ${generateRandom(action)} ${generateRandom(what)} ${generateRandom(when)}`;
        document.getElementById("excuse").innerHTML = newExcuse;
        isAnimating = true;
        //Animación de texto de: https://www.youtube.com/watch?v=GUEB9FogoP8 Algún cambio realizado
        //Cogemos el texto generado y lo vamos a dividir por letras (además de eliminar el texto original)
        const text = document.querySelector("#excuse");
        const originalText = text.textContent;
        const splitText = originalText.split("");
        text.innerHTML = "";
    
        // Creamos un span para cada letra y lo añadimos al elemento de texto
        splitText.forEach(char => {
            const span = document.createElement("span");
            span.textContent = char; // Asignamos la letra al span
            text.appendChild(span); // Añadimos el span al elemento de texto
        });
    
        const spans = text.querySelectorAll("span"); // Seleccionamos todos los spans
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add("fade"); // Añadimos la clase fade con un retraso
            }, index * 7); // El retraso se incrementa para cada letra
        });
    
        //Me encontré con el problema de que con tantos spams, los colores del background se bugean alrededor, por lo que restauramos el texto de vuelta al original cuando termina la animación
        const animationDuration = 7 * splitText.length; // Calculamos la duración total de la animación
        setTimeout(() => {
            text.textContent = originalText;
            isAnimating = false;
        }, animationDuration + 10);
    }
};

// Generación de colores aleatorios usando una fórmula con hexadecimal
// Cogido de: https://youtu.be/bbnkAV12Tig?si=gxD-dj8VOhUEeQm1&t=324
function generateNewColor() {
    return `#${Math.floor(Math.random()*0xffffff).toString(16)}`; // El ~~ rompe esta función por desgracia :(, no se por qué...
};

// Cambia el color a cada elemento de la página
function changeColor(){
    document.body.style.background = generateNewColor();
    document.getElementById("excuse").style.color = generateNewColor();
    document.getElementById("buttonClickMe").style.color = generateNewColor();
    document.getElementById("buttonClickMe").style.background = generateNewColor();
    document.getElementById("buttonClickMe").style.border =  generateNewColor();
    document.getElementById("buttonStartParty").style.color = generateNewColor();
    document.getElementById("buttonStartParty").style.background = generateNewColor();
    document.getElementById("buttonStartParty").style.border = generateNewColor();
};

//El cambio de color se hace por intervalos de 364ms (el beat de la canción!), además aparece el gato Meme y el botón de Stop
let party = false;
let colorInterval;
function startParty() {
    if (!party){ //if para que no se clicke más de una vez
    document.getElementById("gatoMeme").classList.remove("hide-from-top");
    document.getElementById("buttonStopParty").classList.remove("invisible");
    party = true;
    setTimeout(() => {
        colorInterval= setInterval(changeColor, 364);
        document.getElementById("gatoMeme").classList.add("rise-from-bottom");
        document.getElementById("gatoMeme").classList.remove("invisible");
    }, 500);
    }
};


//Este es mi intento de que la música entre poco a poco, creo que apenas funciona sinceramente

let playing = false;
let fading = false;
let volume = 0;

function musicSound() {
    let music = document.getElementById("mySound");
    let interval = 500;
    music.volume = volume;
    if (playing === false) {
        music.play();
        playing = true;
    }
    if (fading === false){
        fading = true;
        volume = 0;
        let fadein = setInterval (
            function (){
            if (volume >= 0.2) {
                volume = 0.2;
                music.volume = volume;
                clearInterval(interval); 
                fadein = false;
            } else {
                volume += 0.02;
                music.volume = volume;   
            }}, interval);
    };
};


// Easter egg que crashea la página
function autoDestructButton() {
    document.getElementById("buttonStopParty").classList.remove("invisible");
    party = true;
    for (i = 0; i <= Infinity; i++) {
        if(party) setInterval(changeColor, 275);
        else break;
    };
};


// Botón de parar todo con addEventListener
document.getElementById("buttonStopParty").addEventListener("click", pleaseStop);
function pleaseStop(){
    // música
    playing = false;
    fading = false;
    party = false;
    volume = 0;
    let music = document.getElementById("mySound");
    music.pause();
    music.currentTime = 0;
    // colores
    document.body.style.background = "";
    document.getElementById("excuse").style.color = "";
    document.getElementById("buttonClickMe").style.color = "";
    document.getElementById("buttonClickMe").style.background = "";
    document.getElementById("buttonClickMe").style.border =  "";
    document.getElementById("buttonStartParty").style.color = "";
    document.getElementById("buttonStartParty").style.background = "";
    document.getElementById("buttonStartParty").style.border = "";
    clearInterval(colorInterval);
    // gato meme
    document.getElementById("gatoMeme").classList.remove("rise-from-bottom");
    document.getElementById("gatoMeme").classList.add("hide-from-top");
    setTimeout(() => {document.getElementById("gatoMeme").classList.add("invisible")}, 700);

    // botón
    document.getElementById("buttonStopParty").classList.add("invisible");
};


