const grid = document.querySelector('#grid');
const slider = document.getElementById("gridRange");
const sizeValue = document.getElementById("sizeValue");
sizeValue.textContent = slider.value;
const styleOptions = document.getElementById("style-options"); 
const blackButton = document.getElementById("black-button");
const rainbowButton = document.getElementById("rainbow-button");
const greyscaleButton = document.getElementById("greyscale-button");
blackButton.classList.toggle('active');

let boxes = [];

changeToGreyscaleMode();
makeEtchASketch(slider.value);

slider.oninput = function() {
    sizeValue.textContent = this.value;
    makeEtchASketch(slider.value);
}

function makeEtchASketch(sliderValue) {
    clearGrid(grid);
    fillBoxesArray(sliderValue);
    createGrid(boxes);
    gridList = grid.querySelectorAll('div');
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('mouseenter', () => {
            if (grid.getAttribute('class') === 'black') {
                simpleBlack(square);
            } else if (grid.getAttribute('class') === 'rainbow') {
                rainbow(square);
            } else if (grid.getAttribute('class') === 'greyscale') {
                greyscale(square);
            };
        });
    });
}

function clearGrid(grid) {
    boxes = [];
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function fillBoxesArray(length) {
    for (let i = 0; i < length * length; i++) {
        boxes.push(i);
    }
    return boxes;
}

function createGrid(boxes) {
    //Adjust const box, use map() instead?
    for (const box of boxes) {
        const newDiv = document.createElement('div');
        //newDiv.id = `${boxes[box]}`;
        newDiv.className = 'square';
        const flexBasis = 90 / slider.value;
        newDiv.style.flex = `1 0 ${flexBasis}%`;
        newDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
        grid.appendChild(newDiv);
    }
}

function changeToBlackMode() {
    grid.setAttribute('class', 'black');
    if (blackButton.getAttribute('class') === 'active') {
        return;
    };
    toggleActiveButton();
    blackButton.classList.toggle('active');
}

function changeToRainbowMode() {
    grid.setAttribute('class', 'rainbow');
    if (rainbowButton.getAttribute('class') === 'active') {
        return;
    };
    toggleActiveButton();
    rainbowButton.classList.toggle('active');
}

function changeToGreyscaleMode() {
    grid.setAttribute('class', 'greyscale');
    if (greyscaleButton.getAttribute('class') === 'active') {
        return;
    };
    toggleActiveButton();
    greyscaleButton.classList.toggle('active');
}

function toggleActiveButton() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.classList.remove("active")
    })
}

function simpleBlack(square) {
    square.style.backgroundColor = 'black';
}

function rainbow(square) {
    console.log(square.style.backgroundColor)
    square.style.backgroundColor = `rgb(${getRandomRGBValue()},${getRandomRGBValue()},${getRandomRGBValue()})`;
    
}

function getRandomRGBValue() {
    return Math.floor(Math.random() * 256);
}

function greyscale(square) {
    getGreyscaleValue(square);
    square.style.backgroundColor = `rgba(0, 0, 0, ${alphaValue})`;
}

function getGreyscaleValue(square) {
    currentRGBA = square.style.backgroundColor;
    rgbaArray = currentRGBA.split(' ');
    if (rgbaArray.length < 4) {
        return;
    }
    alphaString = rgbaArray[3];
    alphaValue = Number(alphaString.replace(')', ''));  
    if (alphaValue >= 1) {
        return;
    }
    alphaValue = alphaValue + .1;
}