let cvs = document.getElementById('cvs');
let ctx = cvs.getContext('2d');

function resizeCanvas() {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight - 10;
}

window.addEventListener('resize', () => {
  resizeCanvas();
});
resizeCanvas();

ctx.lineWidth = 2;

const FRAMERATE = 60;
const INTERVAL = 1000 / FRAMERATE;

let hueOffset = 0;
const SPEED = 5;
const FREQUENCY = 0.5;

function draw() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  
  let limit = Math.max(cvs.width, cvs.height) * 2;
  
  let hue = hueOffset;
  for (let h = 0; h < limit; h++) {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(h, 0);
    ctx.lineTo(0, h);
    ctx.stroke();
    
    hue = (hue + FREQUENCY) % 360;
  }

  hueOffset += SPEED;
}

let previous = null;
function tick(timestamp) {
  if (previous === null) {
    previous = timestamp;
  }
  
  let elapsed = timestamp - previous;
  if (timestamp >= INTERVAL) {
    previous = timestamp;
    draw();
  }
  
  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
