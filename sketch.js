let img1, img2;
let currentImage;
let imgW = 450;
let imgH = 150;

let eraseLayer;
let rubbing = false;
let holdStartTime = null;
let imageSwitched = false;

function preload() {
  img1 = loadImage("img.jpg");    // This is the first image shown
  img2 = loadImage("img2.jpg");   // This is the image that appears after rubbing
}

function setup() {
  createCanvas(500, 300);
  img1.resize(imgW, imgH);
  img2.resize(imgW, imgH);
  currentImage = img1;

  eraseLayer = createGraphics(imgW, imgH);
  eraseLayer.clear();
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
      currentImage = img2; // Switch image
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
