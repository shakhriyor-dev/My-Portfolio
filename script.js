// 1. Tilt (Egilish) Effekti - Faqat Hero Card uchun
const tiltCard = document.getElementById('tilt');

tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0) rotateY(0)';
    tiltCard.style.transition = '0.5s';
});

// 2. Scroll Reveal (Elementlar pastdan chiqishi)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('hidden');
    observer.observe(card);
});

// CSS-ga qo'shimcha:
// .hidden { opacity: 0; transform: translateY(50px); transition: 1s; }
// .show { opacity: 1; transform: translateY(0); }