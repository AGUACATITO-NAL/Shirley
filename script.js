// Animación de corazones
const canvas = document.getElementById('corazones');
const ctx = canvas.getContext('2d');
let corazones = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 20 + Math.random() * 100,
    size: 18 + Math.random() * 22,
    speed: 1 + Math.random() * 1.5,
    drift: (Math.random() - 0.5) * 1.2,
    alpha: 0.7 + Math.random() * 0.3,
    color: `hsl(${340 + Math.random()*20}, 80%, 70%)`
  };
}

function drawHeart(x, y, size, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(x, y + size/4);
  ctx.bezierCurveTo(x, y, x - size/2, y, x - size/2, y + size/4);
  ctx.bezierCurveTo(x - size/2, y + size/2, x, y + size*0.8, x, y + size);
  ctx.bezierCurveTo(x, y + size*0.8, x + size/2, y + size/2, x + size/2, y + size/4);
  ctx.bezierCurveTo(x + size/2, y, x, y, x, y + size/4);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function animateCorazones() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (corazones.length < 30) {
    corazones.push(randomHeart());
  }
  for (let i = 0; i < corazones.length; i++) {
    let h = corazones[i];
    drawHeart(h.x, h.y, h.size, h.color, h.alpha);
    h.y -= h.speed;
    h.x += h.drift;
    if (h.y < -40 || h.x < -40 || h.x > canvas.width + 40) {
      corazones[i] = randomHeart();
      corazones[i].y = canvas.height + 20;
    }
  }
  requestAnimationFrame(animateCorazones);
}
animateCorazones();

// Animación del sobre y carta
const sobre = document.getElementById('sobre');
const carta = document.getElementById('carta');
const textoCarta = document.getElementById('texto-carta');
const mensaje = `Mi amor,

Solo quería recordarte lo especial que eres para mí. 
Cada día a tu lado es un regalo y mi corazón late más fuerte por ti.

Gracias por tu amor, tu sonrisa y por ser mi compañera de vida.
Te amo más de lo que las palabras pueden expresar.

Con todo mi amor,
Tu [nombre]`;

let escribiendo = false;

sobre.addEventListener('click', () => {
  if (sobre.classList.contains('abierto') || escribiendo) return;
  sobre.classList.add('abierto');
  setTimeout(() => {
    escribirCarta(mensaje, textoCarta, 0);
  }, 2000);
});

function escribirCarta(texto, elemento, i) {
  escribiendo = true;
  if (i <= texto.length) {
    elemento.textContent = texto.slice(0, i);
    setTimeout(() => escribirCarta(texto, elemento, i + 1), 28);
  } else {
    escribiendo = false;
  }
}