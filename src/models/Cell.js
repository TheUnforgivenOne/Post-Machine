/**
 * Class whose objects describe the state of tape cell
 *
 * @constructor
 */
class Cell {
  constructor() {
    this._value = false;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }
}

export default Cell;
