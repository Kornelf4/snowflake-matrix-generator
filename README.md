# Snowflake generator
> This small project was used in my procjam [submission](https://kornelf.itch.io/the-silent-plane) in 2025.

## Usage
You can easily use this in your JavaScript project, it you copy or download the contents of the file `snowflakeGen.js`.\n
If you want to generate a new matrix containing the colors at different posititions, call the `generateNew(s)` function with the size of the square matrix you want it to return. \n
If you want to draw a matrix like that on a canvas you have to call the `draw2dArray(contex, x, y, displaySize, DArray)` function, where the context is the context of the canvas you want to draw on, the x and y are the position of the snowflake image on the given canvas in pixel, displaySize is the size of the snowflake in pixel, DArray is the color matrix of the snowflake. \n
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