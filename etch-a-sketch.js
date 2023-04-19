const grid = document.querySelector('#grid');
const slider = document.getElementById("gridRange");
const output = document.getElementById("sizeValue");
output.textContent = slider.value;

let boxes = [];
makeEtchASketch(slider.value);

slider.oninput = function() {
    output.textContent = this.value;
    makeEtchASketch(slider.value);
}

function makeEtchASketch(sliderValue) {
    clearGrid(grid);
    fillBoxesArray(sliderValue);
    createGrid(boxes);
    gridList = grid.querySelectorAll('div');
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('mousemove', () => {
            simpleBlack(square);
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
    for (const box of boxes) {
        const newDiv = document.createElement('div');
        newDiv.id = `${boxes[box]}`;
        newDiv.className = 'boxClear square';
        const flexBasis = 90 / slider.value;
        newDiv.style.flex = `1 0 ${flexBasis}%`;
        grid.appendChild(newDiv);
    }
}

function simpleBlack(square) {
    square.style.backgroundColor = 'black';
}
