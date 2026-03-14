// 1. INTRO LOADER
window.addEventListener('load', () => {
     setTimeout(() => {
         document.getElementById('intro-overlay').style.opacity = '0';
         setTimeout(() => {
             document.getElementById('intro-overlay').style.display = 'none';
             document.body.classList.remove('loading');
         }, 1000);
     }, 2500);
 });
 
 // 2. MATRIX RAIN EFFECT
 const canvas = document.getElementById('matrix-canvas');
 const ctx = canvas.getContext('2d');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 
 const chars = "01SHAKH2616GITHUBRECON";
 const drops = Array(Math.floor(canvas.width / 20)).fill(1);
 
 function drawMatrix() {
     ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
     ctx.fillRect(0, 0, canvas.width, canvas.height);
     ctx.fillStyle = "#0F0";
     ctx.font = "15px monospace";
     drops.forEach((y, i) => {
         const text = chars[Math.floor(Math.random() * chars.length)];
         ctx.fillText(text, i * 20, y * 20);
         if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
         drops[i]++;
     });
 }
 setInterval(drawMatrix, 50);
 
 // 3. 3D GLOBE (Three.js)
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globe-canvas'), alpha: true });
 renderer.setSize(window.innerWidth, window.innerHeight);
 
 const globe = new THREE.Mesh(
     new THREE.SphereGeometry(3, 40, 40),
     new THREE.MeshBasicMaterial({ color: 0x00FF41, wireframe: true, transparent: true, opacity: 0.1 })
 );
 scene.add(globe);
 camera.position.z = 6;
 
 function animateGlobe() {
     requestAnimationFrame(animateGlobe);
     globe.rotation.y += 0.001;
     globe.rotation.x += 0.0005;
     renderer.render(scene, camera);
 }
 animateGlobe();
 
 // 4. TECH-ORBIT LOGIC (Mikro-interaksiya)
 document.addEventListener('mousemove', (e) => {
     const items = document.querySelectorAll('.orbit-item');
     const x = (window.innerWidth / 2 - e.clientX) / 20;
     const y = (window.innerHeight / 2 - e.clientY) / 20;
     items.forEach(item => {
         item.style.transform = `translate(${x}px, ${y}px)`;
     });
 }); 