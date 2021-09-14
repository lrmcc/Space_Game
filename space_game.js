let keyPress = '';
let numStars = 0;
let positions = [0,25,50,75,100];
let shipSpeed = 0;

let shipX = 200;
let shipXMin = -160;
let shipXMax = 560;

let shipY = 230;
let shipYMin = -90;
let shipYMax = 270;


function startBackgroundAnimation() {
    console.log("width: " + document.querySelector('.graphics').style.width);
    console.log("height: " + document.querySelector('.graphics').style.height);
    addStars(16);
    runBackgroundAnimation();
}

function startGame(){
    addShip();
    document.onkeydown = checkKey;
    // addBadGuys()
    // startLevel();
}

function pauseGame(){

}

function quitGame(){
    let graphicsContainer = document.querySelector('.graphics');
    while (graphicsContainer.lastElementChild) {
        graphicsContainer.removeChild(graphicsContainer.lastElementChild);
    }
    document.onkeydown = null;
    startBackgroundAnimation();
}



function addStars(numberStarsCreate){
    for(let i = 0; i < numberStarsCreate; i++){
        appendChildToGraphics('star', '', i, 'graphics');
        numStars++;
    }
}

function addShip(){
    appendChildToGraphics('', '', 'ship-container', 'graphics');
    appendChildToGraphics('', '', 'ship-wrapper', 'ship-container');
    appendChildToGraphics('', '', 'ship', 'ship-wrapper');
    let shipComponentents = ['ship-nose', 'ship-body','ship-wing-left','ship-wing-right', 'ship-tail','ship-tail-fire','ship-tail-fire']
    for(let i = 0; i < shipComponentents.length; i++){
        appendChildToGraphics('', ' ship-component', shipComponentents[i], 'ship');
    }
}

function appendChildToGraphics(childClassName, childAddClassName, childId, parentElement){
    let graphicsContainer = document.getElementById(parentElement);
    let childElement = document.createElement("div");
    childElement.className = childClassName;
    if (childAddClassName != '') childElement.className += childAddClassName;
    if (childId != 999) childElement.id = childId;
    graphicsContainer.appendChild(childElement);
}

function runBackgroundAnimation(){
    for(let i = 0; i < numStars; i++){
        let starToUpdate = document.getElementById(i);
        updateAnimationTime(starToUpdate);
        updateStar(starToUpdate);
    }
}

function updateAnimationTime(starToUpdate) {
    let time = 10 * Math.random() + 2; 
    starToUpdate.style.setProperty('--star-time', time +'s');
}

// width: 800px; width: 480px; width: 640px; 
// height: 450px; height: 270px; height: 360px; 
function updateStar(starToUpdate){
    let starXValue = getRandom(-80,880);
    let starYValue = [0,112,225,340,450];
    let starOpacity = [1,.8,.7,.6,.5];
    starToUpdate.style.setProperty("animation-timing-function", "linear");
    starToUpdate.style.setProperty("--star-translateX", starXValue + "px");
    for(let i = 0; i < positions.length; i++){
        let starTranslateYVar = '--star-translateY-' + positions[i];
        let starOpacVar = '--star-opacity-' + positions[i];
        starToUpdate.style.setProperty(starTranslateYVar, starYValue[i] + "px");
        starToUpdate.style.setProperty(starOpacVar, starOpacity[i]);
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

function checkKey(e) {
    e = e || window.event;
    keyPress = e.keyCode;
    console.log(keyPress);
    console.log("before shipY: " + shipY);
    console.log("before shipX: " + shipX);
    if ( keyPress == '38' || keyPress == '40' || keyPress == '37' || keyPress == '39'  ){

        if ((keyPress == '38') && (shipY > shipYMin)) {
            shipY = shipY - 40;
        }
        else if ((keyPress == '40') && (shipY < shipYMax)) {
            shipY = shipY + 40;
        }
        else if ((keyPress == '37') && (shipX > shipXMin)) {
            shipX = shipX - 40;
        }
        else if ((keyPress == '39') && (shipX < shipXMax)) {
            shipX = shipX + 40;
        }
        shipMove();
    }
}

function shipMove(){
    let shipContainer = document.getElementById('ship-container');
    shipContainer.style.transform = `translate(${shipX}px, ${shipY}px)`
    shipFireOn();
    setTimeout(shipFireOff, 100);
}

function shipFireOn(){
    let shipTailFire = document.getElementById('ship-tail-fire');
    shipTailFire.style.visibility = "visible";
    
 }
 function shipFireOff(){
    let shipTailFire = document.getElementById('ship-tail-fire');
    shipTailFire.style.visibility = "hidden";
 }

