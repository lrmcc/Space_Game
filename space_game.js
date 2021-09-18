let keyPress = '';
let gameInProgress = 0;

let numberStarsCreate = 16;
let numStars = 0;
let starKeyframes = [0,25,50,75,100];
let starYValue = [-100,50,200,350,500];

let shipSpeed = 0;
let shipX = 200;
let shipXMin = -160;
let shipXMax = 560;
let shipY = 330;
let shipYMin = -90;
let shipYMax = 270;
let shipComponentents = ['ship-nose', 'ship-body','ship-wing-left','ship-wing-right', 'ship-tail','ship-tail-fire','ship-tail-fire'];

let numUFOs = 0;
let UFOX = -140;
let UFOXMin = -160;
let UFOXMax = 560;
let UFOY = -60;
let UFOYMin = -90;
let UFOYMax = 270;
let UFOComponents = ['ufo-glass', 'ufo-alien','ufo-alien-eye-left','ufo-alien-eye-right', 'ufo-alien-body','ufo-top','ufo-body-upper', 'ufo-body-lower','ufo-antenna-pole','ufo-antenna-base','ufo-antenna-bead'];

let numberLasersCreate = 5;
let laserX = 0;
let laserY = 0;
let laserIDsActive = [];

function startGame(){
    if (!gameInProgress){
        console.log("Starting game");
        addShip();
        for(let i = 0; i < numberLasersCreate; i++){
            console.log("Adding Laser");
            addLaser(`laser${i}`);
        }
        // addUFO(6);
        document.onkeydown = checkKey;
        document.getElementById('graphics').focus();
    }
    else console.log("Game already in progress");
    gameInProgress = 1;
    
}

function quitGame(){
    let graphicsContainer = document.querySelector('.graphics');
    while (graphicsContainer.lastElementChild) {
        graphicsContainer.removeChild(graphicsContainer.lastElementChild);
    }
    document.onkeydown = null;
    // UFOX = -140;
    // UFOY = -60;
    numStars = 0;
    gameInProgress = 0;
    startBackgroundAnimation();
}

function pauseGame(){

}

function startBackgroundAnimation() {
    for(let i = 0; i < numberStarsCreate; i++){
        addStar(`star${i}`);
    }
}

function addStar(starID){
    appendChildToGraphics('star', '',starID, 'graphics');
    let star = document.getElementById(starID);
    let starTime = getStarTime();
    setStarStyles(star, starTime, getStarXValue());
    setTimeout(() => {resetStarStyles(star)}, Math.floor(starTime * 1000));
    numStars++;
}

function setStarStyles(star, starTime, starXValue){
    star.style.setProperty('--star-time', starTime +'s');
    star.style.setProperty("--star-translateX", starXValue + "px");
}
function resetStarStyles(star){
    let starTime = getStarTime();
    setStarStyles(star, starTime, getStarXValue());
    setTimeout(() => {resetStarStyles(star)}, Math.floor(starTime * 1000));
}

let getStarTime = () => {return 10 * Math.random() + 3; }

let getStarXValue = () => { return Math.random() * (880 - (-80)) + -80;}

function addShip(){
    console.log("Adding Ship");
    appendChildToGraphics('', '', 'ship-container', 'graphics');
    appendChildToGraphics('', '', 'ship-wrapper', 'ship-container');
    appendChildToGraphics('', '', 'ship', 'ship-wrapper');
    for(let i = 0; i < shipComponentents.length; i++){
        appendChildToGraphics('', ' ship-component', shipComponentents[i], 'ship');
    }
}

function shipMove(){
    let shipContainer = document.getElementById('ship-container');
    shipContainer.style.transform = `translate(${shipX}px, ${shipY}px)`;
    console.log("shipContainer.style.transform: " + shipContainer.style.transform);
    let shipTailFire = document.getElementById('ship-tail-fire');
    shipFireOn(shipTailFire);
    setTimeout(shipFireOff(shipTailFire), 100);
}

let shipFireOn = (shipTailFire) => {shipTailFire.style.visibility = "visible";}
let shipFireOff = (shipTailFire) => {shipTailFire.style.visibility = "hidden";}

function addUFO(numUFOsCreate){
    for (let i = 0; i < numUFOsCreate; i++){
        appendChildToGraphics('ufo-container', '',`ufo-container${i}`, 'graphics');
        appendChildToGraphics('ufo', '', `ufo${i}`, `ufo-container${i}`);
        for(let j = 0; j < UFOComponents.length; j++){
            appendChildToGraphics(UFOComponents[j], ' ufo-component', `${UFOComponents[j]}${i}`, `ufo${i}`);
        }
        let UFOContainer = document.getElementById(`ufo-container${i}`);
        UFOContainer.style.transform = `translate(${UFOX}px, ${UFOY}px)`
        UFOX = UFOX + 120;
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

function checkKey(e) {
    e = e || window.event;
    keyPress = e.keyCode;
    console.log(keyPress);
    if ( keyPress == '38' || keyPress == '40' || keyPress == '37' || keyPress == '39' ){

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
        updateLaserAnimKeyframes();
    } else if (keyPress = '32'){
        console.log("pressed spacebar");
        if (laserIDsActive.length < 5) fireLaser();
        else console.log("Max lasers deployed");
    }
}

async function fireLaser(){
    let laserIDNumber = laserIDsActive.length;
    let laserID = `laser${laserIDNumber}`
    let laser = document.getElementById(laserID);
    laserIDsActive.push(laserIDNumber);
    laser.classList.add("laser");
    await sleep(2000);
    laser.classList.remove("laser");
    laserIDsActive.shift();
 }

 let addLaser = (laserID) => { appendChildToGraphics('', '',laserID, 'graphics');}

function updateLaserAnimKeyframes(){
    laserX = shipX + 48;
    laserY = shipY + 80;
    document.documentElement.style.setProperty('--laser-translateX', laserX + "px");
    document.documentElement.style.setProperty('--laser-translateY', laserY + "px");
    console.log("document.documentElement.style.setProperty('--laser-translateX', shipX + px): " + document.documentElement.style.getPropertyValue("--laser-translateX"));
    console.log("document.documentElement.style.setProperty('--laser-translateY', laserY + px): " + document.documentElement.style.getPropertyValue("--laser-translateY"));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}