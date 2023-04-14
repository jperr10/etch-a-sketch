const grid = document.querySelector('#grid-container');
let boxes = [];


function buttonClicked() {
    length = prompt("Enter an integer between 2 & 100", "Number");
    while (length < 2 || length > 100) { //check if integer 
        length = prompt("Make sure it is an integer between 2 & 100", "Number");
    };
    if (boxes.length > 0) {
        clearGrid(grid);
    };
    fillBoxesArray(length);
    createGrid(boxes);
    gridList = grid.querySelectorAll('div');
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('mousemove', () => {
            square.style.backgroundColor = 'black';
        });
    });
    
    //changeBoxColor(square);
    
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
}

function createGrid(boxes) {

    for (const box of boxes) {
        const newDiv = document.createElement('div');
        newDiv.id = `${boxes[box]}`;
        newDiv.className = 'boxClear square';
        newDiv.textContent = boxes[box]; //Eventually clear
        const flexBasis = 90 / length;
        newDiv.style.flex = `1 0 ${flexBasis}%`;
        grid.appendChild(newDiv);
    }
}



