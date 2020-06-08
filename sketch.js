let stack = [];
let cells = [];
let widthCellsSld, heightCellsSld, cellSizeSld;
let widthCells, heightCells, cellSize;
let started=false;

function setup() {
	textFont("Orbitron");
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI elements
	widthCellsSld = new Slider(start=0, end=128, value=32, 0, 0, width/12, height/60, 1, "Width cells", true, 0);
	heightCellsSld = new Slider(start=0, end=128, value=32, 0, 0, width/12, height/60, 1, "Height cells", true, 0);
	cellSizeSld = new Slider(start=2, end=10, value=8, 0,0, width/12, height/60, 1, "Cell size", true, 0);
	btn = new Button(x=0, y=0, width/12, height/30, "Start", startLoop);

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	if(!started) {
		// Draw UI
		background(32);
		UI.update();
		UI.draw();
	} else if (stack.length > 0) {
		// Main loop
		background(32);
		translate(width/2 - widthCells/2*cellSize, height/2 + heightCells/2*cellSize);
		scale(1,-1);

		// Get current cell
		let currentCell = stack[stack.length - 1];
		currentCell.visited = true;

		// Choose a neighbour and push it to the stack
		let neighbours = currentCell.unVisitedNeighbours();
		if(neighbours.length > 0) {
			let newCell = random(neighbours);
			// Remove the appropiate wall
			removeWall(currentCell, newCell);
			stack.push(newCell);
		} else {
			stack.pop();
		}

		// Draw cells
		for(let j = 0; j < heightCells; j++){
			for(let i = 0; i < widthCells; i++) {
				cells[j][i].draw();
			}
		}
		// Draw current cell
		noStroke();
		fill(227, 103, 86);
		rect(currentCell.x*cellSize, currentCell.y*cellSize, cellSize, cellSize);

		// Draw maze walls
		noFill();
		stroke(200);
		strokeWeight(1);
		rect(0,0, cellSize*widthCells, cellSize*heightCells);

		// Draw stack size and title
		scale(1,-1);
		fill(200);
		textSize(14);
		textAlign(LEFT);
		text("Stack size: " + stack.length.toString(), 0, 24);
		fill(86, 210, 227);
		textSize(28);
		textAlign(CENTER);
		text("Maze!", widthCells/2*cellSize, -heightCells*cellSize - 10);
	} else {
		translate(width/2 - widthCells/2*cellSize, height/2 + heightCells/2*cellSize);
		scale(1,-1);
		cells[0][0].draw();
	}
}

function removeWall(currentCell, newCell) {
	if(currentCell.x != newCell.x) {
		if(currentCell.x < newCell.x) {
			newCell.horizontalWall = false;
		} else {
			currentCell.horizontalWall = false;
		}
	} else {
		if(currentCell.y < newCell.y) {
			newCell.verticalWall = false;
		} else {
			currentCell.verticalWall = false;
		}
	}
}

function startLoop() {
	// Hide UI
	widthCellsSld.visible=false;
	heightCellsSld.visible=false;
	cellSizeSld.visible=false;
	widthCells=widthCellsSld.value;
	heightCells=heightCellsSld.value;
	cellSize=cellSizeSld.value;

	// Create cells
	let tmp;
	for(let j = 0; j < heightCells; j++) {
		tmp = [];
		for(let i = 0; i < widthCells; i++) {
			tmp.push(new Cell(i,j));
		}
		cells.push(tmp);
	}

	//Start stack
	stack.push(cells[0][0]);

	started=true;
}
