import $ from "jquery";
import _ from "lodash";

import Tape from "./models/Tape";

const tape = new Tape();
let commands = [">", "? 3; 1;", "V", "!"];

const validateCommand = (command) => {
  const parsedCommand = command.split(" ");
  let commandIsValid = false;

  switch (parsedCommand[0]) {
    case "?":
      parsedCommand.length === 3 ? (commandIsValid = true) : null;
      break;
    default:
      parsedCommand.length === 1 ? (commandIsValid = true) : null;
  }
  return commandIsValid;
};

const commandCreationHandler = () => {
  const textField = $(".b-create-command__command-text");

  if (validateCommand(textField.val())) {
    commands.push(textField.val());
    textField.val("");
  } else {
    alert("Wrong syntax");
  }

  renderCommandsList();
};

const executeProgramHandler = (commands) => {
  console.log("Running");
  let commandToExecute = 0;

  while (commandToExecute < commands.length) {
    console.log("Executing command:", commands[commandToExecute]);
    const parsedCommand = commands[commandToExecute].split(" ");

    switch (parsedCommand[0]) {
      case "<":
        console.log("Moving left");
        tape.moveBox("left");
        renderTape();
        break;
      case ">":
        console.log("Moving right");
        tape.moveBox("right");
        renderTape();
        break;
      case "V":
        if (tape.tape.indexOf(tape.boxId) === -1) {
          console.log("Marking cell with index", tape.boxId);
          tape.toggleCell(tape.boxId);
          renderTape();
        } else {
          console.log("Program exit with failure");
          commandToExecute = commands.length;
        }
        break;
      case "X":
        if (tape.tape.indexOf(tape.boxId) !== -1) {
          console.log("Removing mark on cell with index", tape.boxId);
          tape.toggleCell(tape.boxId);
          renderTape();
        } else {
          console.log("Program running ends with failure");
          commandToExecute = commands.length;
        }
        break;
      case "?":
        if (tape.tape.indexOf(tape.boxId) === -1) {
          console.log("First state");
          console.log(
            "Moving to command",
            Number(parsedCommand[1].slice(0, -1))
          );
          commandToExecute = Number(parsedCommand[1].slice(0, -1)) - 2;
        } else {
          console.log("Second state");
          console.log(
            "Moving to command",
            Number(parsedCommand[2].slice(0, -1))
          );
          commandToExecute = Number(parsedCommand[2].slice(0, -1)) - 2;
        }
        break;
      default:
        console.log("Program running ends successfully");
    }
    commandToExecute++;
  }
};

// Event listeners for moving box
const initEventListeners = () => {
  $("#moveBoxLeft").on("click", () => {
    tape.moveBox("left");
    renderTape();
  });

  $("#moveBoxRight").on("click", () => {
    tape.moveBox("right");
    renderTape();
  });

  $("#createCommandForm").on("submit", (event) => {
    event.preventDefault();
    commandCreationHandler();
  });

  $("#executeProgram").on("click", () => {
    executeProgramHandler(commands);
  });
};

const renderTape = () => {
  const tmpl = _.template($("#tapeTemplate").html());

  $("#tape").html(
    tmpl({
      boxId: tape.boxId,
      tape: tape.tape,
      tapeLength: tape.tapeShowLength,
    })
  );

  $(".b-cell__box").each((index, box) => {
    $(box).on("click", () => {
      tape.boxId = index - (tape.tapeShowLength / 2).toFixed() + 1;
      renderTape();
    });
  });

  $(".b-cell__state").each((index, cell) => {
    $(cell).on("click", () => {
      tape.toggleCell(index - (tape.tapeShowLength / 2).toFixed() + 1);
      renderTape();
    });
  });
};

const renderCommandsList = () => {
  const tmpl = _.template($("#commandsListTemplate").html());

  $(".b-commands__commands-list").html(tmpl({ commands }));

  // $(".b-command__edit-button").each((editBtnIndex, btn) => {
  //   $(btn).on("click", (event) => {
  //     event.preventDefault();
  //     commandCreationHandler(editBtnIndex);
  //   });
  // });

  $(".b-command__delete-button").each((deleteBtnIndex, btn) => {
    $(btn).on("click", () => {
      commands = commands.filter(
        (com, comIndex) => comIndex !== deleteBtnIndex
      );
      renderCommandsList();
    });
  });
};

$(document).ready(() => {
  initEventListeners();
  renderTape();
  renderCommandsList();
});
