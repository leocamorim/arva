const camera = document.getElementById('camera')

function moveTo(x, y, z) {
    console.warn(x+','+y+','+z);
    camera.object3D.position.set(x, y, z);
}