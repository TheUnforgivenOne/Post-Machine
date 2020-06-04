import Cell from "./Cell";

/**
 * Class whose objects describe the state of tape
 *
 * @constructor
 */
class Tape {
  constructor(tapeLength) {
    this._tape = new Array(tapeLength)
      .fill()
      .map((cell) => (cell = new Cell()));
    this._boxId = parseInt(tapeLength / 2);
  }

  get tape() {
    return this._tape;
  }

  get boxId() {
    return this._boxId;
  }

  set boxId(newId) {
    this._boxId = newId;
  }

  moveBox(direction) {
    direction === "left" ? this.boxId-- : this.boxId++;
  }

  toggleCell(cellId) {
    this.tape[cellId].state === true
      ? (this.tape[cellId].state = false)
      : (this.tape[cellId].state = true);
  }
}

export default Tape;
