let img;
let imgW = 450;
let imgH = 150;

let eraseLayer;

function preload() {
  img = loadImage("img.jpg");
}

function setup() {
  createCanvas(500, 300);
  img.resize(imgW, imgH);
  eraseLayer = createGraphics(imgW, imgH);
  eraseLayer.clear();  // transparent layer
}

function draw() {
  background(255);
  
  // Draw the base image
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;
  image(img, x, y);

  // Draw the erase layer on top
  image(eraseLayer, x, y);
}

function mouseDragged() {
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;

  // Only draw if mouse is inside image bounds
  if (mouseX > x && mouseX < x + imgW && mouseY > y && mouseY < y + imgH) {
    eraseLayer.noStroke();
    eraseLayer.fill(255);  // white brush
    eraseLayer.ellipse(mouseX - x, mouseY - y, 40, 40);
  }
}
