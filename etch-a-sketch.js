const grid = document.querySelector('#grid-container');
//grid.setAttribute('style', 'color: red; background: black;');
let gridDim = 16;
let gridSize = gridDim * gridDim; //Update to gridDim squared
let boxes = [];

//function buttonClicked() {
   

for (let i = 0; i < gridSize; i++) {
    boxes.push(i);
}

for (const box of boxes) {
    const newDiv = document.createElement('div');
    newDiv.id = boxes[box];
    newDiv.className = "box";
    newDiv.textContent = boxes[box];
    const flexBasis = 90 / gridDim;
    newDiv.style.flex = `1 0 ${flexBasis}%`;
    grid.appendChild(newDiv);
    
}
    
//}

