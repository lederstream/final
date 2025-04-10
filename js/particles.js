function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    const colors = [
        'rgba(106, 17, 203, 0.8)',
        'rgba(37, 117, 252, 0.8)',
        'rgba(255, 75, 31, 0.8)',
        'rgba(0, 198, 255, 0.8)'
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `-${size}px`;
        
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        if (Math.random() > 0.5) {
            particle.style.animationName = 'float, rotate';
        }
        
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

window.addEventListener('resize', function() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        createParticles();
    }
});