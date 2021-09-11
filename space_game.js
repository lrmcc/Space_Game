let numStars = 0;
let positions = [0,25,50,75,100];

function startBackgroundAnimation() {
    addStars(16);
    runBackgroundAnimation();
}

function startGame(){
    addShip();
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
    startBackgroundAnimation();
}



function addStars(numberStarsCreate){
    for(let i = 0; i < numberStarsCreate; i++){
        appendChildToGraphics('star', '', i, '.graphics');
        numStars++;
    }
}

function addShip(){
    appendChildToGraphics('ship-container', '', 999, '.graphics');
    appendChildToGraphics('ship', '', 999, '.ship-container');
    let shipComponentents = ['ship-nose', 'ship-body','ship-wing-left','ship-wing-right', 'ship-tail', 'ship-tail-fire']
    for(let i = 0; i < shipComponentents.length; i++){
        appendChildToGraphics(shipComponentents[i], ' ship-component', 999, '.ship');
    }
}

function appendChildToGraphics(childClassName, childAddClassName, childId, parentElement){
    let graphicsContainer = document.querySelector(parentElement);
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

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        alert("up arrow");
    }
    else if (e.keyCode == '40') {
        alert("down arrow");
    }
    else if (e.keyCode == '37') {
       alert("left arrow");
    }
    else if (e.keyCode == '39') {
       alert("right arrow");
    }

}