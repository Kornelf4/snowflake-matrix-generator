# Snowflake generator
> This small project was used in my procjam [submission](https://kornelf.itch.io/the-silent-plane) in 2025.

> You can view some rendered example result matrices in the `exaples` folder.

## Usage
You can easily use this in your JavaScript project, it you copy or download the contents of the file `snowflakeGen.js`.

If you want to generate a new matrix containing the colors at different posititions, call the `generateNew(s)` function with the size of the square matrix you want it to return. 

If you want to draw a matrix like that on a canvas you have to call the `draw2dArray(contex, x, y, displaySize, DArray)` function, where the parameters are:
- `context` is the context of the canvas you want to draw on,
- `x` and `y` are the position of the snowflake image on the given canvas in pixel, 
- `displaySize` is the size of the snowflake in pixel, 
- `DArray` is the color matrix of the snowflake.

Exaple usage (can be found is the `index.html` file):
```javascript
let canvasContainer = document.getElementsByClassName("canvasCont")[0];
function demoGen(n) {
    canvasContainer.innerHTML = "";
    let canvasSize = 100;
    for(let i = 0; i < n; i++) {
        let newCanvas = document.createElement("canvas");
        newCanvas.width = canvasSize;
        newCanvas.height = canvasSize;
        canvasContainer.appendChild(newCanvas);
        let ctx = newCanvas.getContext("2d");
        //With the steps below, we create a canvas with given size and add it to a HTML element
        draw2dArray(ctx /*context of the canvas we just created*/, 0, 0, canvasSize /*we want the snowflakes to fill the canvas*/, generateNew(getRandomIntegerInclusive(10, 15) * 2 /*the size will be a random even number between 20 and 30*/));
    }
}
demoGen(50);
```

## How the generateNew function works
1. We create a matrix with width and height `s`.
2. We calculate the number of different colors, number of strokes: `round(s / 4)`. We also 
3. Generate a random blueish color: `{h: 240, s and l: random between 50 and 100}`.
4. Calculate the number of movements with the actual color: `round(s / 3)`.
5. We create a variable pointing to a position, starting with x: `s / 2`, y: `s / 2`.
6. We move the position pointer in a random direction. In the edge regions, there is a much higher chance that it will go in the inwards direction.
7. Paint one elment in the matrix with the selected color in the selected position, and also put seven more in the appropriate position so the image will always have four axes of symmetry.
8. Repeat the move-paint cicle already calcuzlated times.
9. this was one stroke. Repeat from 3. step the calculated times.
10. Return the resulting matrix.

> [!NOTE]
> This (or any of my other projects) _does not_ contain outputs of any generative AI.