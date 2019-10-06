// import { cursorTo } from "readline";

// const camera = document.getElementById('camera')
let slideNumber = 0;

function moveTo(x, y, z) {
    camera.object3D.position.set(x, y, z);
}

// computerImage.addEventListener('mouseenter', () => {
//     if(isPlaying) {
//         cursor.setAttribute('visible', false);
//     }
// })

// computerImage.addEventListener('mouseleave', () => {
//     if(isPlaying) {
//         cursor.setAttribute('visible', true);
//     }
// })

// slideImage.addEventListener('mouseenter', () => {
//     if(isPlaying) {
//         cursor.setAttribute('visible', false);
//     }
// })

// slideImage.addEventListener('mouseleave', () => {
//     if(isPlaying) {
//         cursor.setAttribute('visible', true);
//     }
// })

function changeSlide(diference) {
    if ((diference < 0 && slideNumber >=1) || (diference > 0 && slideNumber < 6)) {
        slideNumber += diference;
        document.getElementById("computerImage").setAttribute("color", "");
        document.getElementById("slideImage").setAttribute("src", "Assets/Imagens/Slide"+slideNumber+".PNG");
        document.getElementById("computerImage").setAttribute("src", "Assets/Imagens/Slide"+slideNumber+".PNG");
    }
}