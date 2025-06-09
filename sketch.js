let img1, img2;
let currentImage;
let imgW = 450;
let imgH = 150;

let eraseLayer;
let rubbing = false;
let holdStartTime = null;
let imageSwitched = false;

function preload() {
  img1 = loadImage("img.jpg");    // Initial image
  img2 = loadImage("img2.jpg");   // After-rub image
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
    }
  }
}

function mouseDragged() {
  rub(mouseX, mouseY);
}

function touchMoved() {
  rub(touchX, touchY);
  return false; // Prevent scrolling on mobile
}

function mousePressed() {
  resetState();
}

function touchStarted() {
  resetState();
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

function mouseReleased() {
  rubbing = false;
  holdStartTime = null;
}

function touchEnded() {
  rubbing = false;
  holdStartTime = null;
}

function resetState() {
  currentImage = img1;
  imageSwitched = false;
  rubbing = false;
  holdStartTime = null;
  eraseLayer = createGraphics(imgW, imgH);
  eraseLayer.clear();
}
