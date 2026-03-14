// 1. Mouse Tracking Effect (Neon nur)
document.addEventListener('mousemove', (e) => {
     const bg = document.querySelector('.cyber-bg');
     const x = (e.clientX / window.innerWidth) * 50;
     const y = (e.clientY / window.innerHeight) * 50;
     bg.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, #1a1a2e 0%, #0a0a0c 40%)`;
 });
 
 // 2. Typing Effect for Terminal
 const text = "Protecting the world from invisible hands...";
 let i = 0;
 function typeEffect() {
     if (i < text.length) {
         document.querySelector('.typing').innerHTML = text.substring(0, i+1) + '<span class="cursor">|</span>';
         i++;
         setTimeout(typeEffect, 100);
     }
 }
 window.onload = typeEffect;