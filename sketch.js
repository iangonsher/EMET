let img1, img2;
let currentImage;
let imgW = 450;
let imgH = 150;

let eraseLayer;
let rubbingStartTime = null;
let imageSwitched = false;

function preload() {
  img1 = loadImage("img1.jpg");  // Starting image
  img2 = loadImage("img.jpg");   // Image to switch to
}

function setup() {
  createCanvas(imgW, imgH);
  img1.resize(imgW, imgH);
  img2.resize(imgW, imgH);
  currentImage = img1;

  eraseLayer = createGraphics(imgW, imgH);
  eraseLayer.clear();

  // Prevent iOS from hijacking gestures
  document.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  document.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
}

function draw() {
  background(255);
  image(currentImage, 0, 0);
  image(eraseLayer, 0, 0);

  if (rubbingStartTime && !imageSwitched) {
    let elapsed = millis() - rubbingStartTime;
    if (elapsed > 3000) {
      currentImage = img2;
      imageSwitched = true;
    }
  }
}

function startRubbing() {
  if (!rubbingStartTime) {
    rubbingStartTime = millis();
  }
}

function eraseAt(x, y) {
  eraseLayer.noStroke();
  eraseLayer.fill(255);
  eraseLayer.ellipse(x, y, 100, 100);
}

// Mouse input
function mouseDragged() {
  startRubbing();
  eraseAt(mouseX, mouseY);
}

function mousePressed() {
  resetState();
}

// Touch input
function touchStarted() {
  resetState();
  return false; // prevent default
}

function touchMoved() {
  startRubbing();
  for (let t of touches) {
    eraseAt(t.x, t.y);
  }
  return false; // prevent default
}

function resetState() {
  currentImage = img1;
  imageSwitched = false;
  rubbingStartTime = null;
  eraseLayer.clear();
}
