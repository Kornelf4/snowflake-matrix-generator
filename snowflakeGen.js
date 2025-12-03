function getRandomIntegerInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function createArr(size) {
    return Array.from(Array(size), () => new Array(size))
}
function randBlue() {
    h = 240;
    s = getRandomIntegerInclusive(50, 100);
    l = getRandomIntegerInclusive(50, 100);
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}
function draw2dArray(context, x, y, displaySize, DArray) {
    let UNIT = displaySize / DArray.length;
    for(let i = 0; i < DArray.length; i++) {
        for(let i2 = 0; i2 < DArray[i].length; i2++) {
            let actCol = DArray[i][i2];
            if(actCol) {
                context.fillStyle = actCol;
                context.fillRect(x + i2 * UNIT, y + i * UNIT, UNIT, UNIT);
            }
        }
    }
}
function symmetricAdd(x, y, value, imgBuffer) {
    imgBuffer[y][x] = value;
    imgBuffer[y][imgBuffer.length - 1 - x] = value;
    imgBuffer[imgBuffer.length - 1 - y][x] = value;
    imgBuffer[imgBuffer.length - 1 - y][imgBuffer.length - 1 - x] = value;
    //and reverse...
    imgBuffer[x][y] = value;
    imgBuffer[x][imgBuffer.length - 1 - y] = value;
    imgBuffer[imgBuffer.length - 1 - x][y] = value;
    imgBuffer[imgBuffer.length - 1 - x][imgBuffer.length - 1 - y] = value;
}
function addVec(vec1, vec2, max) {
    let result = {x: vec1.x + vec2.x, y: vec1.y + vec2.y};
    if(result.x < 0) {
        result.x = max;
    }
    if(result.x > max) {
        result.x = 0;
    }
    if(result.y < 0) {
        result.y = max;
    }
    if(result.y > max) {
        result.y = 0;
    }
    return result;
}
function generateNew(s) {
    let imgBuffer = createArr(s);
    let strokeNum = Math.round(imgBuffer.length / 4);
    let posPointer = {x: imgBuffer.length / 2, y: imgBuffer.length / 2};
    symmetricAdd(posPointer.x, posPointer.y, randBlue(), imgBuffer);
    for(let i = 0; i < strokeNum; i++) {
        let colPointer = randBlue();
        let strokeLength = Math.round(imgBuffer.length / 3);
        
        for(let i2 = 0; i2 < strokeLength; i2++) {
            var posChart = null;
            posChart = [
                {x: -1, y: -1},
                {x: 0, y: -1},
                {x: 1, y: -1},

                {x: -1, y: 0},
                {x: 1, y: 0},

                {x: -1, y: 1},
                {x: 0, y: 1},
                {x: 1, y: 1},
            ]
            for(let i3 = 0; i3 < 4; i3++) { 
                if((posPointer.x == imgBuffer.length / 2 || posPointer.x == imgBuffer.length / 2 + 1) && (posPointer.y == imgBuffer.length / 2 || posPointer.y == imgBuffer.length / 2 + 1)) {
                } else if(posPointer.x == imgBuffer.length / 2 || posPointer.x == imgBuffer.length / 2 + 1) {
                    posChart.push({x: 0, y: -1});
                    posChart.push({x: 0, y: 1});
                } else if(posPointer.y == imgBuffer.length / 2 || posPointer.y == imgBuffer.length / 2 + 1) {
                    posChart.push({x: 1, y: 0});
                    posChart.push({x: -1, y: 0});
                } else if(posPointer.x <= imgBuffer.length / 2) {
                    posChart.push({x: 1, y: 0});
                } else if(posPointer.y <= imgBuffer.length / 2) {
                    posChart.push({x: 0, y: 1});
                } else if(posPointer.x > imgBuffer.length / 2) {
                    posChart.push({x: -1, y: 0});
                } else if(posPointer.y > imgBuffer.length / 2) {
                    posChart.push({x: 0, y: -1});
                }
            }
            let moveVec = posChart[getRandomIntegerInclusive(0, posChart.length - 1)];
            posPointer = addVec(posPointer, moveVec, imgBuffer.length - 1);
            symmetricAdd(posPointer.x, posPointer.y, colPointer, imgBuffer);
        }
    }
    return imgBuffer;
}