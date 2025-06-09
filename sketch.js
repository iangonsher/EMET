let img1, img2;
let currentImage;
const imgW = 500, imgH = 150;

let eraseLayer;
let rubbingStart = 0;
let rubbed = false;

function preload() {
  img1 = loadImage("img1.jpg");
  img2 = loadImage("img.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img1.resize(imgW, imgH);
  img2.resize(imgW, imgH);
  resetSketch();
}

function draw() {
  background(255);
  
  // Draw current image and white marks
  let x = (width - imgW) / 2, y = (height - imgH) / 2;
  image(currentImage, x, y);
  image(eraseLayer, x, y);

  // Check if still rubbing and not yet switched
  if (!rubbed && millis() - rubbingStart > 3000 && rubbingStart > 0) {
    currentImage = img2;
    rubbed = true;
  }
}

function rub(xp, yp) {
  let x = (width - imgW) / 2, y = (height - imgH) / 2;
  if (xp > x && xp < x + imgW && yp > y && yp < y + imgH) {
    if (rubbingStart === 0) rubbingStart = millis();
    eraseLayer.noStroke();
    eraseLayer.fill(255);
    eraseLayer.ellipse(xp - x, yp - y, 50);
  }
}

function touchMoved() {
  rub(touches[0].x, touches[0].y);
  return false; // prevent scroll
}

function mouseDragged() {
  rub(mouseX, mouseY);
}

function touchEnded() {
  rubbingStart = 0;
}

function mouseReleased() {
  rubbingStart = 0;
}

function resetSketch() {
  currentImage = img1;
  rubbed = false;
  rubbingStart = 0;
  eraseLayer = createGraphics(imgW, imgH);
  eraseLayer.clear();
}

function touchStarted() {
  resetSketch();
  return false;
}

function mousePressed() {
  resetSketch();
}
