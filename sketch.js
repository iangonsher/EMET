let img1, img2;
let currentImage;
const imgW = 450;
const imgH = 150;

let eraseLayer;
let rubbing = false;
let holdStartTime = null;
let imageSwitched = false;

function preload() {
  img1 = loadImage("img1.jpg");
  img2 = loadImage("img.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
    if (millis() - holdStartTime > 3000) {
      currentImage = img2;
      imageSwitched = true;
    }
  }
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
    eraseLayer.ellipse(px - x, py - y, 60, 60);
  }
}

function mouseDragged() {
  rub(mouseX, mouseY);
}

function touchMoved(e) {
  rub(touches[0].x, touches[0].y);
  return false; // prevent scrolling
}

function mouseReleased() {
  rubbing = false;
  holdStartTime = null;
}

function touchEnded() {
  rubbing = false;
  holdStartTime = null;
}

function mousePressed() {
  resetState();
}

function touchStarted(e) {
  resetState();
  return false;
}

function resetState() {
  currentImage = img2;
  imageSwitched = false;
  rubbing = false;
  holdStartTime = null;
  eraseLayer = createGraphics(imgW, imgH);
  eraseLayer.clear();
}
