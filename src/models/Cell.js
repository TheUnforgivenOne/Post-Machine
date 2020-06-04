/**
 * Class whose objects describe the state of tape cell
 *
 * @constructor
 */
class Cell {
  constructor() {
    this._state = false;
  }

  get state() {
    return this._state;
  }

  set state(newValue) {
    this._state = newValue;
  }
}

export default Cell;
