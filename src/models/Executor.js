class Executor {
  constructor(commands) {
    this._commands = commands;
    this.commandToExecute = 0;
  }

  get commands() {
    return this._commands;
  }

  execute() {
    console.log(this.commands);
  }
}

export default Executor;
