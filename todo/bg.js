const body = document.querySelector("body");

const IMG_NUM = 3;


function paintImage(imgNumber){
    const img = new Image();
    img.src = `images/${imgNumber+1}.jpg`;
    img.classList.add('bgImage');
    body.prepend(img);
}

function genRandom(){
    const num = Math.floor(Math.random() * IMG_NUM);
    return num;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();