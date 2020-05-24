class Cell{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.verticalWall = true;
        this.horizontalWall = true;
    }

    draw() {
        // Draw cell
        noStroke();
        fill(this.visited ? 32 : 128);
        rect(this.x*cellSize, this.y*cellSize, cellSize, cellSize);
        // Draw walls
        stroke(200);
        strokeWeight(1);
        if(this.horizontalWall)
            line(this.x*cellSize, this.y*cellSize, this.x*cellSize, (this.y + 1)*cellSize);
        if(this.verticalWall)
            line(this.x*cellSize, this.y*cellSize, (this.x + 1)*cellSize, this.y*cellSize);
    }

    unVisitedNeighbours() {
        let neighbours = [];
        if(this.x > 0 && !cells[this.y][this.x - 1].visited)
            neighbours.push(cells[this.y][this.x - 1]);
        if(this.x < widthCells - 1 && !cells[this.y][this.x + 1].visited)
            neighbours.push(cells[this.y][this.x + 1]);
        if(this.y > 0 && !cells[this.y - 1][this.x].visited)
            neighbours.push(cells[this.y - 1][this.x]);
        if(this.y < heightCells - 1 && !cells[this.y + 1][this.x].visited)
            neighbours.push(cells[this.y + 1][this.x]);
        return neighbours;        
    }
}