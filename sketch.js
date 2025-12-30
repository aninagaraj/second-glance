let img1, img2, img3;
let blinkCounter = 0;
const blinkSpeed = 45;
const offset = 12;
const maxDimension = 700;
const differenceThreshold = 30; // Threshold for difference highlighting

function preload() {
    img1 = loadImage('images/light1.jpeg');
    img2 = loadImage('images/light2.jpeg');
}

function setup() {

    // Get image dimensions
    let imgWidth = img1.width;
    let imgHeight = img1.height;

    img3 = createImage(imgWidth, imgHeight);

    img1.loadPixels();
    img2.loadPixels();
    img3.loadPixels();

    // Copy with vertical offset: source y starts at offset, destination y starts at 0
    for (let y = 0; y < imgHeight; y++) {
        for (let x = 0; x < imgWidth; x++) {
            const srcY = y + offset; // Source is offset by offset rows down
            const destIndex = (y * imgWidth + x) * 4;

            if (srcY < imgHeight) {
                // Copy from img2 (starting at row 3) to img3 (starting at row 0)
                const srcIndex = (srcY * imgWidth + x) * 4;

                // RGB values for bottom offset rows
                if (y >= imgHeight - offset) {
                    // Bottom 3 rows of destination - copy from img1
                    img3.pixels[destIndex] = img1.pixels[srcIndex];
                    img3.pixels[destIndex + 1] = img1.pixels[srcIndex + 1];
                    img3.pixels[destIndex + 2] = img1.pixels[srcIndex + 2];
                    img3.pixels[destIndex + 3] = img1.pixels[srcIndex + 3];
                } else {
                    // Copy normally for other rows
                    img3.pixels[destIndex] = img2.pixels[srcIndex];
                    img3.pixels[destIndex + 1] = img2.pixels[srcIndex + 1];
                    img3.pixels[destIndex + 2] = img2.pixels[srcIndex + 2];
                    img3.pixels[destIndex + 3] = img2.pixels[srcIndex + 3];
                }
            } else {
                // Handle out-of-bounds source (bottom offset rows of img3 will be empty/black)
                img3.pixels[destIndex] = 0;
                img3.pixels[destIndex + 1] = 0;
                img3.pixels[destIndex + 2] = 0;
                img3.pixels[destIndex + 3] = 0;
            }
        }
    }

    img3.updatePixels();
    img2 = img3;

    // Resize images if width exceeds 600 pixels or height exceeds 600 pixels

    if (imgWidth > maxDimension || imgHeight > maxDimension) {
        let scaleFactor = min(maxDimension / imgWidth, maxDimension / imgHeight);
        imgWidth = floor(imgWidth * scaleFactor);
        imgHeight = floor(imgHeight * scaleFactor);
        img1.resize(imgWidth, imgHeight);
        img2.resize(imgWidth, imgHeight);
        img3.resize(imgWidth, imgHeight);
    }

    // Canvas is 2 images wide, 2 images high
    createCanvas(imgWidth * 2, imgHeight * 2);
    background(0);

    console.log(`Image size: ${imgWidth}x${imgHeight}`);
    console.log(`Canvas size: ${width}x${height}`);

    // Show XOR/difference in bottom right (always visible)
    drawDifferenceView(img1.width, img1.height);
}

function draw() {

    // Top row: Static images side by side
    image(img1, 0, 0);
    image(img2, img1.width, 0);

    // Bottom row: Blinking comparison
    drawBlinkingComparison();
}

function drawBlinkingComparison() {
    // Update blink counter

    blinkCounter++;
    if (blinkCounter >= blinkSpeed * 2) {
        blinkCounter = 0;
    }


    let bottomY = img1.height;

    // Show image 1 in bottom left
    if (blinkCounter < blinkSpeed) {
        image(img1, 0, bottomY);
    }
    // Show image 2 in bottom left
    else if (blinkCounter < blinkSpeed * 2) {
        image(img2, 0, bottomY);
    }
    // Reset counter
    else {
        blinkCounter = 0;
    }
}

function drawDifferenceView(x, y) {
    // Create XOR/difference view
    push();
    translate(x, y);

    // Create a temporary graphics buffer
    let diffBuffer = createGraphics(img1.width, img1.height);
    diffBuffer.loadPixels();
    img1.loadPixels();
    img2.loadPixels();

    for (let i = 0; i < img1.pixels.length; i += 4) {
        let r1 = img1.pixels[i];
        let g1 = img1.pixels[i + 1];
        let b1 = img1.pixels[i + 2];

        let r2 = img2.pixels[i];
        let g2 = img2.pixels[i + 1];
        let b2 = img2.pixels[i + 2];

        // Calculate difference
        let diff = (abs(r1 - r2) + abs(g1 - g2) + abs(b1 - b2)) / 3;

        // Color based on difference threshold
        // let brightness = diff > differenceThreshold ? 0 : 255;
        const R = diff > differenceThreshold ? 255 : 0;
        const G = diff > differenceThreshold ? 255 : 0;
        const B = diff > differenceThreshold ? 0 : 0;
        const ALPHAB = diff > differenceThreshold ? 127 : 127;

        diffBuffer.pixels[i] = R;
        diffBuffer.pixels[i + 1] = G;
        diffBuffer.pixels[i + 2] = B;
        diffBuffer.pixels[i + 3] = ALPHAB;
    }

    diffBuffer.updatePixels();

    // Convert img1 to grayscale
    const img1Gray = createImage(img1.width, img1.height);
    img1Gray.copy(img1, 0, 0, img1.width, img1.height, 0, 0, img1.width, img1.height);
    img1Gray.filter(GRAY);
    img1Gray.filter(BLUR, 2);
    image(img1Gray, 0, 0);
    image(diffBuffer, 0, 0);

    pop();
}