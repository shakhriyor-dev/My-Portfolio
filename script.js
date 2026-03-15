// 1. INTRO LOADER LOGIC
window.addEventListener('load', () => {
     const overlay = document.getElementById('intro-overlay');
     if (overlay) {
         setTimeout(() => {
             overlay.style.opacity = '0';
             setTimeout(() => { 
                 overlay.style.display = 'none'; 
                 document.body.classList.remove('loading');
             }, 1000);
         }, 2500);
     }
 });
 
 // 2. MATRIX RAIN EFFECT (Xatoliklarsiz variant)
 const mCanvas = document.getElementById('matrix-canvas');
 if (mCanvas) {
     const mCtx = mCanvas.getContext('2d');
     
     const resizeMatrix = () => {
         mCanvas.width = window.innerWidth;
         mCanvas.height = window.innerHeight;
     };
     window.addEventListener('resize', resizeMatrix);
     resizeMatrix();
 
     const mChars = "01SHAKHRIYORBABAXANOV2616";
     const fontSize = 15;
     const columns = Math.floor(mCanvas.width / fontSize);
     const mDrops = Array(columns).fill(1);
 
     function drawMatrix() {
         mCtx.fillStyle = "rgba(0,0,0,0.05)";
         mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
         mCtx.fillStyle = "#0F0";
         mCtx.font = fontSize + "px monospace";
 
         for (let i = 0; i < mDrops.length; i++) {
             const txt = mChars[Math.floor(Math.random() * mChars.length)];
             mCtx.fillText(txt, i * fontSize, mDrops[i] * fontSize);
 
             if (mDrops[i] * fontSize > mCanvas.height && Math.random() > 0.975) {
                 mDrops[i] = 0;
             }
             mDrops[i]++;
         }
     }
     setInterval(drawMatrix, 50);
 }
 
 // 3. THREE.JS 3D GLOBE (Xavfsiz va optimallashgan)
 const gCanvas = document.getElementById('globe-canvas');
 if (gCanvas) {
     const scene = new THREE.Scene();
     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
     
     // Antialiasni yoqish va Alpha (shaffoflik) berish
     const renderer = new THREE.WebGLRenderer({ 
         canvas: gCanvas, 
         alpha: true, 
         antialias: true 
     });
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize(window.innerWidth, window.innerHeight);
 
     const globeGeometry = new THREE.SphereGeometry(3, 50, 50);
     const globeMaterial = new THREE.MeshBasicMaterial({ 
         color: 0x00FF41, 
         wireframe: true, 
         transparent: true, 
         opacity: 0.15 
     });
     const globe = new THREE.Mesh(globeGeometry, globeMaterial);
     
     scene.add(globe);
     camera.position.z = 6;
 
     const animate = () => {
         requestAnimationFrame(animate);
         globe.rotation.y += 0.0012;
         globe.rotation.x += 0.0006;
         renderer.render(scene, camera);
     };
     animate();
 
     // Resize Handler
     window.addEventListener('resize', () => {
         camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();
         renderer.setSize(window.innerWidth, window.innerHeight);
     });
 }