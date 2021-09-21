let keyPress = '';
let gameInProgress = 0;
let shipX = 200;
let shipY = 220;
let shipMinX = -160;
let shipMaxX = 560;
let shipMinY = -60;
let shipMaxY = 270;

let numStarsCreate = 16;
let numStarsActive = 0;
let starYValue = [-100,50,200,350,500];

let numUFOsCreate = 0;
let UFOX = -140;
let UFOY = -60;
let UFOAnimBit = 0;
// let UFOMinX = -160;
// let UFOMaxX = 560;
// let UFOMinY = -90;
// let UFOMaxY = 270;

let numberLasersCreate = 5;
let laserX = 246;
let laserY = 160;
let laserIDsActive = [];

let shipComponentents = ['ship-nose', 'ship-body','ship-wing-left','ship-wing-right', 'ship-tail','ship-tail-fire','ship-tail-fire'];
let keyFrames = ['0','25','50','75','100'];
let UFOComponents = ['ufo-glass', 'ufo-alien','ufo-alien-eye-left','ufo-alien-eye-right', 'ufo-alien-body','ufo-top','ufo-body-upper', 'ufo-body-lower','ufo-antenna-pole','ufo-antenna-base','ufo-antenna-bead'];



function startBackgroundAnimation() {
    for(let i = 0; i < numStarsCreate; i++){
        addStar(`star${i}`);
    }
}

function startGame(){
    if (!gameInProgress){
        console.log("Starting game");
        setShipCSSRootVariables();
        addShip();
        for(let i = 0; i < numberLasersCreate; i++){
            console.log("Adding Laser");
            addLaser(`laser${i}`);
        }
        setLaserAnimKeyframes();
        setUFOAnimKeyframes();
        addUFO(1);
        document.onkeydown = checkKey;
    }
    gameInProgress = 1;
}

function quitGame(){
    let graphicsContainer = document.querySelector('.graphics');
    while (graphicsContainer.lastElementChild) {
        graphicsContainer.removeChild(graphicsContainer.lastElementChild);
    }
    document.onkeydown = null;
    UFOX = -140;
    UFOY = -60;
    numStarsActive = 0;
    gameInProgress = 0;
    startBackgroundAnimation();
}

function pauseGame(){

}

function addStar(starID){
    appendChildToGraphics('star', '',starID, 'graphics');
    let star = document.getElementById(starID);
    let starTime = getStarTime();
    setStarStyles(star, starTime, getStarXValue());
    setTimeout(() => {resetStarStyles(star)}, Math.floor(starTime * 1000));
    numStarsActive++;
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

function addUFO(numUFOs){
    for (let i = 0; i < numUFOs; i++){
        appendChildToGraphics('ufo-container', '',`ufo-container${i}`, 'graphics');
        appendChildToGraphics('ufo', '', `ufo${i}`, `ufo-container${i}`);
        for(let j = 0; j < UFOComponents.length; j++){
            appendChildToGraphics(UFOComponents[j], ' ufo-component', `${UFOComponents[j]}${i}`, `ufo${i}`);
        }
        let UFOContainer = document.getElementById(`ufo-container${i}`);
        UFOContainer.style.transform = `translate(${UFOX}px, ${UFOY}px)`
        UFOX = UFOX + 120;
        activateUFOAnimation(UFOContainer);
    }
}

async function activateUFOAnimation(UFOContainer){
    while (UFOContainer){
        await sleep(5000);
        UFOContainer.style.animation = "UFO-easy-left var(--UFO-time) linear 1";
        await sleep(5000);
        UFOContainer.style.animation = "UFO-easy-right var(--UFO-time) linear 1";
    }
    
}

let addLaser = (laserID) => { appendChildToGraphics('', '',laserID, 'graphics');}
 
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

        if ((keyPress == '38') && (shipY > shipMinY)) {
            shipY = shipY - 40;
        }
        else if ((keyPress == '40') && (shipY < shipMaxY)) {
            shipY = shipY + 40;
        }
        else if ((keyPress == '37') && (shipX > shipMinX)) {
            shipX = shipX - 40;
        }
        else if ((keyPress == '39') && (shipX < shipMaxX)) {
            shipX = shipX + 40;
        }
        shipMove();
        setLaserAnimKeyframes();
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
 
 function setShipCSSRootVariables(){
    setCSSRootVariable('--ship-translateX', shipX, 'px');
    setCSSRootVariable('--ship-translateY', shipY, 'px');
 }
 function setLaserAnimKeyframes(){
    laserX = shipX + 48;
    laserY = shipY;
    setCSSRootVariable('--laser-translateX', laserX , 'px');
    for (let i = 0; i < keyFrames.length; i++){
        setCSSRootVariable(`--laser-translateY-${keyFrames[i]}`, laserY - (i*100), 'px');
    }
}

function setUFOAnimKeyframes(){
    setCSSRootVariable('--UFO-translateY', UFOY, 'px');
    for (let i = 0; i < keyFrames.length; i++){
        setCSSRootVariable(`--UFO-translateX-${keyFrames[i]}`, UFOX + (i*100), 'px');
    }
}

let setCSSRootVariable = (varName, value, valueString)  => { document.documentElement.style.setProperty(`${varName}`, value + valueString);}  

let sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms));}