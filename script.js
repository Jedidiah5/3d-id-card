const card = document.getElementById('idCard');
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let isFlipped = false;
let animating = false;
const maxAngle = 15; // degrees

function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function animate() {
  // Easing
  currentX += (targetX - currentX) * 0.15;
  currentY += (targetY - currentY) * 0.15;

  let transform = `rotateX(${-currentY}deg) rotateY(${currentX}deg)`;
  if (isFlipped) transform += ' rotateY(180deg)';
  card.style.transform = transform;

  if (Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1 || animating) {
    requestAnimationFrame(animate);
  }
}

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  // Map cursor position to -maxAngle..maxAngle
  targetX = mapRange(x, 0, rect.width, -maxAngle, maxAngle);
  targetY = mapRange(y, 0, rect.height, -maxAngle, maxAngle);
  animating = false;
  animate();
});

card.addEventListener('mouseleave', () => {
  targetX = 0;
  targetY = 0;
  animating = false;
  animate();
});

card.addEventListener('mouseenter', () => {
  animating = false;
});

card.addEventListener('click', () => {
  isFlipped = !isFlipped;
  animating = true;
  animate();
});

// Touch support for mobile
touchStart = null;
card.addEventListener('touchmove', (e) => {
  const rect = card.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  targetX = mapRange(x, 0, rect.width, -maxAngle, maxAngle);
  targetY = mapRange(y, 0, rect.height, -maxAngle, maxAngle);
  animating = false;
  animate();
});
card.addEventListener('touchend', () => {
  targetX = 0;
  targetY = 0;
  animating = false;
  animate();
}); 