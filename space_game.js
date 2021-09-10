let numParticles = 0;
let positions = [0,25,50,75,100];
let animationType = "";
let numParticlesForType = 0;
let animationState = {     
    preGame: 0,         // background animation only        => animationState.noGame = 0
    inGame: 1           // game ship on top of background   => animationState.gameStart = 1
  };

function startAnimation(animType) {
    animationType = animType;
    console.log(animationType + " Animation Launched");
    if (animationType == "preGame") addParticle(10);
    //if (animationType == "inGame") addParticle(10);
    runAnimationType();
}

function addParticle(numberParticlesCreate){
    for(let i = 0; i < numberParticlesCreate; i++){
        let newParticle = document.createElement("div");
        newParticle.className = "particle";
        newParticle.id = i;
        let particleContainer = document.querySelector('.graphics');
        particleContainer.appendChild(newParticle);
        numParticles++;
    }
    
}

function runAnimationType(){
    for(let i = 0; i < numParticles; i++){
            updateParticles(i, animationType);
    }
}

function updateParticles(particleID, animationType){
    let particleToUpdate = document.getElementById(particleID);
    updateAnimationTime(particleToUpdate);
    if (animationType == "preGame") updateStarParticle(particleToUpdate);
    //if (animationType == "inGame") updatePlanetParticle(particleToUpdate);
}

function updateAnimationTime(particleToUpdate) {
    let time = 10 * Math.random() + 2; 
    particleToUpdate.style.setProperty('--animation-time', time +'s');
}

function updatePlanetParticle(particleToUpdate){
    let postitionTranslateX = [getRandom(0,1400),getRandom(0,1400),getRandom(0,1400),getRandom(0,1400),getRandom(0,1400)];
    let postitionTranslateY = [900,700,500,300,100];
    let postitionOpacity = [1,.8,.5,.3,0];
    let bckgrdColors = ["#e3dede","#bab6b6","#737070","#383838","#121212"];
    let blurColors = ["#e3dede","#bab6b6","#737070","#383838","#121212"];

    for(let i = 0; i < positions.length; i++){
        let animateTranslateXVar = '--animation-translateX-' + positions[i];
        let animateTranslateYVar = '--animation-translateY-' + positions[i];
        let animateOpacVar = '--animation-opacity-' + positions[i];
        let animateColorVar = '--animation-color-' + positions[i];
        let animateBlurVar = '--animation-blur-' + positions[i];
        particleToUpdate.style.setProperty(animateTranslateXVar, postitionTranslateX[i] + "px");
        particleToUpdate.style.setProperty(animateTranslateYVar, postitionTranslateY[i] + "px");
        particleToUpdate.style.setProperty(animateOpacVar, postitionOpacity[i]);
        particleToUpdate.style.setProperty(animateColorVar, bckgrdColors[i]);
        particleToUpdate.style.setProperty(animateBlurVar, blurColors[i]);
    }
}

function updateStarParticle(particleToUpdate){
    let downX = getRandom(0,1400);
    let postitionTranslateX = [downX+50,downX+50,downX+50,downX+50,downX+50];
    let postitionTranslateY = [100,300,500,700,900];
    let postitionOpacity = [1,.8,.5,.3,0];
    let bckgrdColors = ["#336bc4","#2a58a1","#20447d","#0d3678","#082554"];
    let blurColors = ["#2cb1bf","#2797a3","#1f7680","#145961","#09464d"];
    particleToUpdate.style.setProperty("animation-timing-function", "linear");
    for(let i = 0; i < positions.length; i++){
        let animateTranslateXVar = '--animation-translateX-' + positions[i];
        let animateTranslateYVar = '--animation-translateY-' + positions[i];
        let animateOpacVar = '--animation-opacity-' + positions[i];
        let animateColorVar = '--animation-color-' + positions[i];
        let animateBlurVar = '--animation-blur-' + positions[i];
        particleToUpdate.style.setProperty(animateTranslateXVar, postitionTranslateX[i] + "px");
        particleToUpdate.style.setProperty(animateTranslateYVar, postitionTranslateY[i] + "px");
        particleToUpdate.style.setProperty(animateOpacVar, postitionOpacity[i]);
        particleToUpdate.style.setProperty(animateColorVar, bckgrdColors[i]);
        particleToUpdate.style.setProperty(animateBlurVar, blurColors[i]);
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

function pauseAnimation(){
   //pause background animation
}

function clearAnimation(){
    let particleContainer = document.querySelector('.graphics');
    while (particleContainer.lastElementChild) {
        particleContainer.removeChild(particleContainer.lastElementChild);
  }
}