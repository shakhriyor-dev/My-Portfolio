// 1. THREE.JS 3D GLOBE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#globe-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Yashil Wireframe Globe
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 50, 50),
    new THREE.MeshBasicMaterial({ color: 0x00ffaa, wireframe: true, transparent: true, opacity: 0.15 })
);
scene.add(globe);

camera.position.z = 5;

// 2. Custom Cursor Movement
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower biroz kechikib yurishi uchun
    setTimeout(() => {
        follower.style.left = (e.clientX - 11) + 'px';
        follower.style.top = (e.clientY - 11) + 'px';
    }, 50);

    // Yer sharini aylantirish (Sichqonchaga qarab)
    globe.rotation.y = e.clientX * 0.0005;
    globe.rotation.x = e.clientY * 0.0005;
});

// Animatsiya
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});