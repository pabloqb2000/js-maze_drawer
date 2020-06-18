let stack = [];
let cells = [];
let widthCellsSld, heightCellsSld, cellSizeSld;
let startBtn, backBtn, showDepthBtn;
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
	startBtn = new Button(x=0, y=0, width/12, height/30, "Start", startLoop);

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();

	// Change UI to display according to tittle
	textStyle(BOLD);
	textSize(height/10);
	noStroke();
	let w = textWidth("Maze!");
	for(let e of [widthCellsSld, heightCellsSld, cellSizeSld, startBtn]) {
		e.x = width/2 - w/2;
		e.y += 3*height/10;
	}


	// New Distribution
	backBtn = new Button(20, 20, width/12, height/30, "Back", backMenu);
	showDepthBtn = new ToggleButton(20, height/30 + 40, width/12, height/30, "Depth", null, true);
	backBtn.visible = false;
	showDepthBtn.visible = false;
}

function draw() {
	if(!started) {
		// Draw UI
		background(32);
		UI.update();
		UI.draw();

		// Title
		textStyle(BOLD);
		textAlign(CENTER);
		textSize(height/10);
		noStroke();
		fill(86, 210, 227);
		text("Maze!", width/2, height/5);		
		textStyle(NORMAL);
	} else {
		// Main loop
		background(32);
		UI.update();
		UI.draw();
		translate(width/2 - widthCells/2*cellSize, height/2 + heightCells/2*cellSize);
		scale(1,-1);

		let currentCell;
		if (stack.length > 0) {
			// Get current cell
			currentCell = stack[stack.length - 1];
			currentCell.visited = true;
			currentCell.dist = stack.length;

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
		}
		// Draw cells
		for(let j = 0; j < heightCells; j++){
			for(let i = 0; i < widthCells; i++) {
				cells[j][i].draw();
			}
		}

		if (stack.length > 1) {
			// Draw current cell
			noStroke();
			fill(227, 103, 86);
			rect(currentCell.x*cellSize, currentCell.y*cellSize, cellSize, cellSize);
		}
	
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
		textStyle(BOLD);
		text("Maze!", widthCells/2*cellSize, -heightCells*cellSize - 10);
		textStyle(NORMAL);
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
	startBtn.visible=false;
	backBtn.visible=true;
	showDepthBtn.visible=true;
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

function backMenu() {
	widthCellsSld.visible=true;
	heightCellsSld.visible=true;
	cellSizeSld.visible=true;
	startBtn.visible=true;
	backBtn.visible=false;
	showDepthBtn.visible=false;

	cells = [];
	stack = [];

	started = false;
}
