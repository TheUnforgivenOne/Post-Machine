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

  set setBoxId(newId) {
    this.boxId = newId;
  }

  moveBox(direction) {
    direction === "left" ? this.boxId-- : this.boxId++;
  }

  toggleCell() {
    this.tape[this.boxId].state === true
      ? (this.tape[this.boxId].state = false)
      : (this.tape[this.boxId].state = true);
  }
}

export default Tape;
