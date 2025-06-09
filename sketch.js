let img1, img2;
let currentImage;
const imgW = 450;
const imgH = 150;

let eraseLayer;
let rubbing = false;
let holdStartTime = null;
let imageSwitched = false;

function preload() {
  img1 = loadImage("img1.jpg");  // starting image
  img2 = loadImage("img2.jpg");  // image after rubbing
}

function setup() {
  createCanvas(500, 300);
  img1.resize(imgW, imgH);
  img2.resize(imgW, imgH);
  resetState();
}

function draw() {
  background(255);
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;

  image(currentImage, x, y);
  image(eraseLayer, x, y);

  if (rubbing && !imageSwitched && holdStartTime !== null) {
    let elapsed = millis() - holdStartTime;
    if (elapsed >= 3000) {
      currentImage = img2;
      imageSwitched = true;
      // Keep eraseLayer as is, no clearing
    }
  }
}

// Reset on any click or tap
function mousePressed() {
  resetState();
}
function touchStarted() {
  resetState();
  return false;  // prevent default touch scrolling
}

// Handle rubbing for mouse drag
function mouseDragged() {
  rub(mouseX, mouseY);
}

// Handle rubbing for touch move
function touchMoved() {
  rub(touchX, touchY);
  return false;  // prevent default scrolling on touch drag
}

// Stop rubbing on mouse release or touch end
function mouseReleased() {
  rubbing = false;
  holdStartTime = null;
}
function touchEnded() {
  rubbing = false;
  holdStartTime = null;
  return false;
}

function rub(px, py) {
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;

  if (px > x && px < x + imgW && py > y && py < y + imgH) {
    if (!rubbing) {
      rubbing = true;
      holdStartTime = millis();
    }
    eraseLayer.noStroke();
    eraseLayer.fill(255);
    eraseLayer.ellipse(px - x, py - y, 50, 50);
  }
}

function resetState() {
  currentImage = img1;
  imageSwitched = false;
  rubbing = false;
  holdStartTime = null;
  eraseLayer = createGraphics(imgW, imgH);
  eraseLayer.clear();
}
