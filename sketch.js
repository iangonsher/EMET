let img;
let imgW = 450;
let imgH = 150;

let eraseLayer;

let isHoldingMouse = false;
let isHoldingKey = false;
let lastHoldStartTime = 0;
let fadeTriggered = false;

let isFading = false;
let fadeStartTime = 0;
let fadeDuration = 2000;

let keyCount = 0;
let lastKeyTime = 0;
let tapTimeout = 1000;

function preload() {
  img = loadImage("img.jpg");
}

function setup() {
  createCanvas(500, 300);
  img.resize(imgW, imgH);

  eraseLayer = createGraphics(imgW, imgH);
  eraseLayer.clear();  // start transparent
}

function draw() {
  background(255);

  // Draw the main image centered
  imageCentered(img);

  // Draw the eraseLayer on top (white circles)
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;
  image(eraseLayer, x, y);

  // Handle fade logic (optional, here just placeholder)
  if ((isHoldingMouse || isHoldingKey) && !fadeTriggered) {
    if (millis() - lastHoldStartTime > 4000) {
      // You can add fade logic here if needed
      fadeTriggered = true;
      console.log("Fade triggered (not implemented)");
    }
  }
}

function imageCentered(imgToDraw) {
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;
  image(imgToDraw, x, y);
}

function mouseDragged() {
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;

  if (mouseX > x && mouseX < x + imgW && mouseY > y && mouseY < y + imgH) {
    if (!isHoldingMouse) {
      isHoldingMouse = true;
      lastHoldStartTime = millis();
    }

    // Draw white circle on eraseLayer where mouse is
    eraseLayer.noStroke();
    eraseLayer.fill(255);
    eraseLayer.ellipse(mouseX - x, mouseY - y, 50, 50);
  }
}

function mouseReleased() {
  isHoldingMouse = false;
}

function keyPressed() {
  if (key === ' ') {
    if (!isHoldingKey) {
      isHoldingKey = true;
      lastHoldStartTime = millis();
    }

    let now = millis();
    if (now - lastKeyTime > tapTimeout) keyCount = 0;
    keyCount++;
    lastKeyTime = now;

    if (keyCount >= 3) {
      eraseLayer.clear();  // reset eraseLayer to transparent
      keyCount = 0;
      fadeTriggered = false;
      console.log("Reset erase layer");
    }
  }
}

function keyReleased() {
  if (key === ' ') {
    isHoldingKey = false;
  }
}
