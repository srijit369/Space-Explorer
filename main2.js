const particlesContainer = document.querySelector('.particles');
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * window.innerWidth + 'px';
  particle.style.top = Math.random() * window.innerHeight + 'px';
  const size = Math.random() * 4 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.opacity = Math.random() * 0.8;
  particlesContainer.appendChild(particle);
  setTimeout(() => {
    particle.style.transform = `translateY(${Math.random() * 100 + 50}px)`;
    particle.style.opacity = 0;
  }, 50);
  setTimeout(() => particlesContainer.removeChild(particle), 2000);
}
setInterval(createParticle, 100);
