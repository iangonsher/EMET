let img, img2;
let maskLayer;
let preFadeMask;

let imgW = 450;
let imgH = 150;

let isFading = false;
let fadeStartTime = 0;
let fadeDuration = 2000;

let isRubbing = false;
let isHoldingKey = false;
let isHoldingMouse = false;

let lastHoldStartTime = 0;
let fadeTriggered = false;

let keyCount = 0;
let lastKeyTime = 0;
let tapTimeout = 1000;

function preload() {
  img = loadImage("img.jpg");
  img2 = loadImage("img2.jpg");
}

function setup() {
  createCanvas(500, 300);
  img.resize(imgW, imgH);
  img2.resize(imgW, imgH);

  maskLayer = createGraphics(imgW, imgH);
  preFadeMask = createGraphics(imgW, imgH);
  resetMask();
}

function draw() {
  background(255);

  if (isFading) {
    let elapsed = millis() - fadeStartTime;
    let amt = constrain(map(elapsed, 0, fadeDuration, 0, 1), 0, 1);

    let blended = createImage(imgW, imgH);
    blended.loadPixels();
    img.loadPixels();
    img2.loadPixels();
    for (let i = 0; i < img.pixels.length; i += 4) {
      for (let j = 0; j < 4; j++) {
        blended.pixels[i + j] = lerp(img.pixels[i + j], img2.pixels[i + j], amt);
      }
    }
    blended.updatePixels();
    imageCentered(blended);

    if (elapsed >= fadeDuration) {
      isFading = false;
      maskLayer.image(preFadeMask, 0, 0);
    }
    return;
  }

  // Apply mask manually
  let masked = img.get();
  masked.loadPixels();
  maskLayer.loadPixels();

  for (let i = 0; i < masked.pixels.length; i += 4) {
    let alpha = maskLayer.pixels[i]; // red channel as alpha
    masked.pixels[i + 3] = alpha;
  }
  masked.updatePixels();

  imageCentered(masked);

  if ((isHoldingMouse || isHoldingKey) && !fadeTriggered) {
    if (millis() - lastHoldStartTime > 4000) {
      triggerFade();
    }
  }
}

function imageCentered(p) {
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;
  image(p, x, y);
}

function mouseDragged() {
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;

  if (mouseX > x && mouseX < x + imgW && mouseY > y && mouseY < y + imgH) {
    if (!isRubbing) {
      isRubbing = true;
      isHoldingMouse = true;
      lastHoldStartTime = millis();
    }

    maskLayer.noStroke();
    maskLayer.fill(0, 255);  // Fully opaque black for mask
    maskLayer.ellipse(mouseX - x, mouseY - y, 100, 100);
  }
}

function mouseReleased() {
  isRubbing = false;
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
      resetMask();
      keyCount = 0;
    }
  }
}

function keyReleased() {
  if (key === ' ') {
    isHoldingKey = false;
  }
}

function triggerFade() {
  fadeTriggered = true;
  isFading = true;
  fadeStartTime = millis();
  preFadeMask.image(maskLayer, 0, 0);
}

function resetMask() {
  maskLayer.background(255);
  fadeTriggered = false;
  isFading = false;
  isHoldingMouse = false;
  isHoldingKey = false;
}
