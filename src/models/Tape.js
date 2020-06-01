import Cell from "./Cell";

/**
 * Class whose objects describe the state of tape
 *
 * @constructor
 */
class Tape {
  constructor(tapeLength) {
    this.tape = new Array(tapeLength).fill().map((cell) => (cell = new Cell()));
    this.boxId = parseInt(tapeLength / 2);
  }

  printTape() {
    this.tape.map((cell) => console.log(cell.value));
  }

  moveBox(direction) {
    direction === "left" ? this.boxId-- : this.boxId++;
  }

  toggleCell() {
    this.tape[this.boxId].value === true
      ? (this.tape[this.boxId].value = false)
      : (this.tape[this.boxId].value = true);
  }
}

export default Tape;
