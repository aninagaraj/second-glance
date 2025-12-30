# Spot the Difference with p5.js

Years ago, the Washington Post's weekend magazine had a feature called "Second Glance". It was a "spot the difference" puzzle in which the reader had to identify 12 differences between a photo and its subtly altered version. I'd usually get 9-11 and then spend a lot of time agonizing over the last few differences and wait for a week for the solutions. This project uses some clever programming tricks to help spot what's changed and take the frustration (and most likely the fun) out of the puzzle.

## What This Does

It uses 2 different methods to help you find the changes in addition to the side-by-side view:

1. **Side-by-side view** - Original and modified images next to each other
2. **Blinking comparison** - Images that automatically switch back and forth. The human eye is remarkably good at spotting differences if they are subtle and "moving".
3. **Difference map** - A programmatic view that highlights changes in a high contrast color.

## How the Code Works

The heart of this tool is a p5.js sketch that:

1. **Aligns the images** using a vertical offset (adjustable) to ensure the images are perfectly positioned for comparison.
2. **Creates a blinking view** that switches between images every 45 frames (adjustable), creating a flipbook effect.
3. **Analyzes pixel differences** between the two images and highlights significant changes in a high contrast color. The difference detection works by comparing each pixel's RGB values. If the average difference exceeds a threshold (default: 30 out of 255), that pixel gets marked with a high contrast so that the differences are visible when presented over a blurred grayscale background of the original image.
4. **Resizes images automatically** to fit within `700 x 700` pixels while maintaining aspect ratio

## Getting Started

### Quick Setup
1. Place your two similar images in an `images` folder. Ensure that the dimensions are identical.
2. Update the filenames in `sketch.js`:
   ```javascript
   img1 = loadImage('images/your-first-image.jpg');
   img2 = loadImage('images/your-second-image.jpg');```
3. Run index.html.

## Tweak It

```javascript
// Make it more or less sensitive to changes
const differenceThreshold = 30; // Lower = catches smaller differences

// Speed up or slow down the blinking
const blinkSpeed = 45; // Frames between switches

// Adjust alignment if images don't line up
const offset = 12; // Vertical offset in pixels

// Control maximum display size
const maxDimension = 700; // Max width/height in pixels
```
## Project Structure

The repository contains:

1. `index.html` - The main webpage that loads everything
2. `sketch.js` - The p5.js sketch with all the comparison logic
3. `style.css` - Basic page styling
4. `images/` - Folder for your image pairs

## How to Use It Effectively

1. Start with the blinking view (bottom left) - Your brain is great at noticing changes in motion
2. Check the difference map (bottom right) - See where the program detects changes
3. Verify with side-by-side view (top row) - Confirm your findings
4. Adjust the sensitivity if needed - Lower the threshold for subtler differences, raise it for more obvious ones

## Demo

1. [Second Glance: Taco Time, April 8, 2021](https://www.washingtonpost.com/magazine/2021/04/08/second-glance-taco-time-apr-11-2021/). I downloaded the full image (`taco.jpeg`) which also contains the solution. I used a custom Python program to "cut out" the original (`taco1.jpeg`) and altered image (`taco2.jpeg`) and ensured that their dimensions were identical. Your eye will quickly catch the differences in the blinking view and the difference map will confirm and validate the differences.

![Spot the Difference Demo](images/taco.gif)

2. [Second Glance: Nutcrackers, Dec. 27, 2020](https://www.washingtonpost.com/magazine/2020/12/24/second-glance-nutcrackers-dec-27-2020/).

![Spot the Difference Demo](images/nut.gif)

3. [Second Glance: Junk drawer, Dec. 13, 2020](https://www.washingtonpost.com/magazine/2020/12/10/second-glance-junk-drawer-dec-13-2020/).

![Spot the Difference Demo](images/junk.gif)

## Tips

- The blinking view works best for finding larger, more obvious differences
- The difference map is great for spotting subtle color changes
- If the images seem misaligned, try adjusting the offset value
- For very subtle differences, adjust the `differenceThreshold`


## License

MIT License - feel free to use, modify, and distribute this project for personal or educational purposes.