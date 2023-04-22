const grid = document.querySelector('#grid');
const slider = document.getElementById("gridRange");
const sizeValue = document.getElementById("sizeValue");
sizeValue.textContent = slider.value;
const styleOptions = document.getElementById("style-options"); 
const blackButton = document.getElementById("black-button");
const rainbowButton = document.getElementById("rainbow-button");
const greyscaleButton = document.getElementById("greyscale-button");
grid.classList.toggle('black');
blackButton.classList.toggle('active');

let boxes = [];

changeToBlackMode();
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
        newDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        grid.appendChild(newDiv);
    }
}

function changeToBlackMode() {
    if (blackButton.getAttribute('class') === 'active') {
        return;
    };
    grid.setAttribute('class', 'black');
    toggleActiveButtonOff();
    blackButton.classList.toggle('active');
}

function changeToRainbowMode() {
    if (rainbowButton.getAttribute('class') === 'active') {
        return;
    };
    grid.setAttribute('class', 'rainbow');
    toggleActiveButtonOff();
    rainbowButton.classList.toggle('active');
}

function changeToGreyscaleMode() {
    if (greyscaleButton.getAttribute('class') === 'active') {
        return;
    };
    grid.setAttribute('class', 'greyscale');
    toggleActiveButtonOff();
    greyscaleButton.classList.toggle('active');
}

function toggleActiveButtonOff() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.classList.remove("active")
    })
}

function simpleBlack(square) {
    console.log(square.getAttribute('class'));
    square.style.backgroundColor = 'black';
    
    if (square.getAttribute('class') === 'square black') {
        return;
    } else {
        square.setAttribute('class', 'square black');
    }
    console.log(square.classList);
}

function rainbow(square) {
    console.log(square.getAttribute('class'));
    square.style.backgroundColor = `rgb(${getRandomRGBValue()},${getRandomRGBValue()},${getRandomRGBValue()})`;
    if (square.getAttribute('class') === 'square rainbow') {
        return;
    } else {
        square.setAttribute('class', 'square rainbow');
    }
    console.log(square.classList);
}

function getRandomRGBValue() {
    return Math.floor(Math.random() * 256);
}

function greyscale(square) {
    console.log(`The current class list is: ${square.getAttribute('class')}`);
    getOldAlphaValue(square);
    returnAlphaValue(oldAlpha);
    square.style.backgroundColor = `rgba(0, 0, 0, ${alphaValue})`;
    if (square.getAttribute('class') === 'square greyscale') {
        return;
    } else {
        square.setAttribute('class', 'square greyscale');
    }
    console.log(square.classList);
}

function getOldAlphaValue(square) {
    rgbaArray = square.style.backgroundColor.split(' ');
    console.log(rgbaArray);
    if (rgbaArray.length === 4) {
        oldAlpha = Number(rgbaArray[3].replace(')', ''));
        console.log(`Old alpha value: ${oldAlpha}`);
        return oldAlpha;
    } else if (rgbaArray.length === 1 || (rgbaArray.length === 3 && square.getAttribute('class') !== 'square greyscale')) { //Square background is "black" from black mode or rgb (not rgba) from rainbow
        return oldAlpha = 0; 
    }
}

function returnAlphaValue(oldAlpha) {
    if (oldAlpha >= 1) {
        return;
    }
    alphaValue = oldAlpha + .1;
    console.log(`New alpha value: ${alphaValue}`);
}