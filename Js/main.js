// import { cursorTo } from "readline";

// const camera = document.getElementById('camera')

let slideNumber = 1;
let params = getParams();
changeSlide(0);

function moveTo(x, y, z) {
    camera.object3D.position.set(x, y, z);
}

function changeAva(_aux) {
    document.getElementById('ava-plane').setAttribute('src', '#ava-'+_aux)
}

function openBook (materia) {
    location.href='index.html?materia='+materia;
  document.getElementById('ava-plane').setAttribute('src', '#ava-'+_aux)
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
    if ((diference < 0 && slideNumber >1) || (diference => 0 && slideNumber < 6)) {
        if(!params.materia) params.materia = "Apresentacao";
        slideNumber += diference;
        document.getElementById("computerImage").setAttribute("color", "");
        document.getElementById("computerImage").setAttribute("src", "Assets/Imagens/Slides/"+params.materia+"/Slide"+slideNumber+".PNG");
        document.getElementById("slideImage").setAttribute("src", "Assets/Imagens/Slides/"+params.materia+"/Slide"+slideNumber+".PNG");
    }
}