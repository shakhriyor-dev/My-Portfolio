// 1. INTRO LOADER
window.addEventListener('load', () => {
     setTimeout(() => {
         document.getElementById('intro-overlay').style.opacity = '0';
         setTimeout(() => { document.getElementById('intro-overlay').style.display = 'none'; }, 1000);
     }, 2500);
 });
 
 // 2. MATRIX RAIN
 const mCanvas = document.getElementById('matrix-canvas');
 const mCtx = mCanvas.getContext('2d');
 mCanvas.width = window.innerWidth; mCanvas.height = window.innerHeight;
 const mChars = "01SHAKHRIYOR2616";
 const mDrops = Array(Math.floor(mCanvas.width / 20)).fill(1);
 
 function drawMatrix() {
     mCtx.fillStyle = "rgba(0,0,0,0.05)"; mCtx.fillRect(0,0,mCanvas.width, mCanvas.height);
     mCtx.fillStyle = "#0F0"; mCtx.font = "15px monospace";
     mDrops.forEach((y, i) => {
         const txt = mChars[Math.floor(Math.random()*mChars.length)];
         mCtx.fillText(txt, i*20, y*20);
         if(y*20 > mCanvas.height && Math.random() > 0.975) mDrops[i] = 0;
         mDrops[i]++;
     });
 }
 setInterval(drawMatrix, 50);
 
 // 3. 3D GLOBE (Three.js)
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globe-canvas'), alpha: true, antialias: true });
 renderer.setSize(window.innerWidth, window.innerHeight);
 
 const globe = new THREE.Mesh(
     new THREE.SphereGeometry(3, 50, 50),
     new THREE.MeshBasicMaterial({ color: 0x00FF41, wireframe: true, transparent: true, opacity: 0.15 })
 );
 scene.add(globe);
 camera.position.z = 6;
 
 function animate() {
     requestAnimationFrame(animate);
     globe.rotation.y += 0.001;
     globe.rotation.x += 0.0005;
     renderer.render(scene, camera);
 }
 animate();
 
 // Resize Handler
 window.addEventListener('resize', () => {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
 });