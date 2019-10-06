// import { cursorTo } from "readline";

// const camera = document.getElementById('camera')
let slideNumber = 0;
let params = getParams();

function moveTo(x, y, z) {
    camera.object3D.position.set(x, y, z);
}

function getParams() {
    var pairs = window.location.search.substring(1).split("&"),
      obj = {},
      pair,
      i;
  
    for ( i in pairs ) {
      if ( pairs[i] === "" ) continue;
  
      pair = pairs[i].split("=");
      obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
    }
  
    return obj;
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
        if(!params.materia) params.materia = "Slide";
        slideNumber += diference;
        document.getElementById("computerImage").setAttribute("color", "");
        document.getElementById("computerImage").setAttribute("src", "Assets/Imagens/"+params.materia+slideNumber+".PNG");
        document.getElementById("slideImage").setAttribute("src", "Assets/Imagens/"+params.materia+slideNumber+".PNG");
    }
}