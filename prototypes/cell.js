class SnakeCell {
  constructor(col, row, size, color) {
    this.col = col;
    this.row = row;
    this.size = size;
    this.color = color;
    this.color.setAlpha(100);
  }

  draw() {
    fill(this.color);
    rect(this.col * this.size, this.row * this.size, this.size, this.size);
  }

  changeCol(col) {
    this.col = col;
  }

  changeRow(row) {
    this.row = row;
  }

  duplicateProp(cell) {
    this.col = cell.col;
    this.row = cell.row;
  }

  equals(cell) {
    return this.col === cell.col && this.row === cell.row && this !== cell;
  }
}
