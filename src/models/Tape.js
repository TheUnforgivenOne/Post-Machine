/**
 * Class whose objects describe the state of tape
 *
 * @constructor
 */
class Tape {
  constructor() {
    this._tape = [];
    this._boxId = 0;
    this._tapeShowLength = 21;
  }

  get tape() {
    return this._tape;
  }

  get boxId() {
    return this._boxId;
  }

  get tapeShowLength() {
    return this._tapeShowLength;
  }

  set boxId(newId) {
    this._boxId = newId;
  }

  moveBox(direction) {
    direction === "left" ? this.boxId-- : this.boxId++;
  }

  toggleCell(cellId) {
    this._tape.indexOf(cellId) === -1
      ? this._tape.push(cellId)
      : this._tape.splice(this._tape.indexOf(cellId), 1)
  }
}

export default Tape;
