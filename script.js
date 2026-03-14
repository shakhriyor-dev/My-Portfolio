// 1. THREE.JS 3D GLOBE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#globe-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(700, 700);
renderer.setPixelRatio(window.devicePixelRatio);

// Yashil Wireframe Yer shari
const geometry = new THREE.SphereGeometry(2, 40, 40);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ffaa,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Yer shari ustidagi nuqtalar (atmosfera)
const pointsGeom = new THREE.SphereGeometry(2.05, 30, 30);
const pointsMat = new THREE.PointsMaterial({ color: 0x00ffaa, size: 0.03 });
const globePoints = new THREE.Points(pointsGeom, pointsMat);
scene.add(globePoints);

camera.position.z = 4.5;

// Mouse harakatiga qarab aylanish
let mouseX = 0; let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 1000;
    mouseY = (e.clientY - window.innerHeight / 2) / 1000;
});

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.002 + mouseX;
    globe.rotation.x += 0.001 + mouseY;
    globePoints.rotation.y -= 0.001;
    renderer.render(scene, camera);
}
animate();

// 2. Terminal Typing Effect
const text = "System security check... All nodes secured.";
let i = 0;
function type() {
    if (i < text.length) {
        document.querySelector('.typing').innerHTML = text.substring(0, i+1) + '<span class="cursor">_</span>';
        i++;
        setTimeout(type, 80);
    }
}
window.onload = type;