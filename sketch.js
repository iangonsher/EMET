let img1, img2;
let currentImage;
let imgW = 450;
let imgH = 150;

let eraseLayer;
let rubbing = false;
let rubbingStartTime = 0;
let totalRubbingTime = 0;
let imageSwitched = false;

function preload() {
  img1 = loadImage("img1.jpg");  // Starting image
  img2 = loadImage("img.jpg");   // Image to switch to
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

  // Accumulate rubbing time
  if (rubbing && !imageSwitched) {
    totalRubbingTime += deltaTime;
    if (totalRubbingTime > 3000) {
      currentImage = img2;
      eraseLayer.clear();
      imageSwitched = true;
    }
  }
}

function mouseDragged() {
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;

  if (mouseX > x && mouseX < x + imgW && mouseY > y && mouseY < y + imgH) {
    rubbing = true;

    eraseLayer.noStroke();
    eraseLayer.fill(255);
    eraseLayer.ellipse(mouseX - x, mouseY - y, 100, 100);
  }
}

function mouseReleased() {
  rubbing = false;
}
