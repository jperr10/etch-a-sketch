const grid = document.querySelector('#grid');
const slider = document.getElementById("gridRange");
const output = document.getElementById("sizeValue");
output.textContent = slider.value;

let boxes = [];
fillBoxesArray(slider.value);
createGrid(boxes);
gridList = grid.querySelectorAll('div');
const squares = document.querySelectorAll('.square');
squares.forEach((square) => {
    square.addEventListener('mousemove', () => {
        simpleBlack(square);
    });
});

slider.oninput = function() {
    output.textContent = this.value;
    if (boxes.length > 0) {
        clearGrid(grid);
    }
    fillBoxesArray(slider.value);
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
    //boxes = []; 
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
