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

// ATM Card 3D effect
const atmCard = document.querySelector('.atm-card');
let atmTargetX = 0, atmTargetY = 0;
let atmCurrentX = 0, atmCurrentY = 0;
let atmIsFlipped = false;
let atmAnimating = false;
const atmMaxAngle = 15;

function atmMapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function animateAtm() {
  atmCurrentX += (atmTargetX - atmCurrentX) * 0.15;
  atmCurrentY += (atmTargetY - atmCurrentY) * 0.15;
  let transform = `rotateX(${-atmCurrentY}deg) rotateY(${atmCurrentX}deg)`;
  if (atmIsFlipped) transform += ' rotateY(180deg)';
  atmCard.style.transform = transform;
  if (Math.abs(atmCurrentX - atmTargetX) > 0.1 || Math.abs(atmCurrentY - atmTargetY) > 0.1 || atmAnimating) {
    requestAnimationFrame(animateAtm);
  }
}

atmCard.addEventListener('mousemove', (e) => {
  const rect = atmCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  atmTargetX = atmMapRange(x, 0, rect.width, -atmMaxAngle, atmMaxAngle);
  atmTargetY = atmMapRange(y, 0, rect.height, -atmMaxAngle, atmMaxAngle);
  atmAnimating = false;
  animateAtm();
});

atmCard.addEventListener('mouseleave', () => {
  atmTargetX = 0;
  atmTargetY = 0;
  atmAnimating = false;
  animateAtm();
});

atmCard.addEventListener('mouseenter', () => {
  atmAnimating = false;
});

atmCard.addEventListener('click', () => {
  atmIsFlipped = !atmIsFlipped;
  atmAnimating = true;
  animateAtm();
});

// Touch support for mobile
atmCard.addEventListener('touchmove', (e) => {
  const rect = atmCard.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  atmTargetX = atmMapRange(x, 0, rect.width, -atmMaxAngle, atmMaxAngle);
  atmTargetY = atmMapRange(y, 0, rect.height, -atmMaxAngle, atmMaxAngle);
  atmAnimating = false;
  animateAtm();
});
atmCard.addEventListener('touchend', () => {
  atmTargetX = 0;
  atmTargetY = 0;
  atmAnimating = false;
  animateAtm();
}); 