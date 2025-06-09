let img1, img2;
let currentImage;
let imgW = 450;
let imgH = 150;

let eraseLayer;
let rubbing = false;
let holdStartTime = null;
let imageSwitched = false;

function preload() {
  img1 = loadImage("img.jpg");    // First image
  img2 = loadImage("img2.jpg");   // Image to switch to
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
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;

  if (mouseX > x && mouseX < x + imgW && mouseY > y && mouseY < y + imgH) {
    if (!rubbing) {
      rubbing = true;
      holdStartTime = millis();
    }

    eraseLayer.noStroke();
    eraseLayer.fill(255);
    eraseLayer.ellipse(mouseX - x, mouseY - y, 50, 50);
  }
}

function mouseReleased() {
  rubbing = false;
  holdStartTime = null;
}

function mousePressed() {
  // Reset everything on single click
  resetState();
}

function resetState() {
  currentImage = img1;
  imageSwitched = false;
  rubbing = false;
  holdStartTime = null;
  eraseLayer = createGraphics(imgW, imgH);
  eraseLayer.clear();
}
