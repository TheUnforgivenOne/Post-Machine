import $ from "jquery";
import _ from "lodash";

import Tape from "./models/Tape";

const tape = new Tape();
let commands = [];

const commandCreationHandler = (editBtnIndex = null) => {
  const textField = $(".b-create-command__command-text");

  if (editBtnIndex !== null) {
    textField.val(commands[editBtnIndex]);
  } else {
    commands.push(textField.val());
  }
  textField.val('');

  renderCommandsList();
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
};

const renderTape = () => {
  const tmpl = _.template($("#tapeTemplate").html());

  $("#tape").html(
    tmpl({
      boxId: tape.boxId,
      tape: tape.tape,
    })
  );

  $(".b-cell__box").each((index, box) => {
    $(box).on("click", () => {
      tape.boxId = index - 10;
      renderTape();
    });
  });

  $(".b-cell__state").each((index, cell) => {
    $(cell).on("click", () => {
      tape.toggleCell(index-10);
      renderTape();
    });
  });
};

const renderCommandsList = () => {
  const tmpl = _.template($("#commandsListTemplate").html());

  $(".b-commands__commands-list").html(tmpl({commands}));

  $(".b-command__edit-button").each((editBtnIndex, btn) => {
    $(btn).on("click", (event) => {
      event.preventDefault();
      commandCreationHandler(editBtnIndex);
    });
  });

  $(".b-command__delete-button").each((deleteBtnIndex, btn) => {
    $(btn).on("click", () => {
      commands = commands.filter((com, comIndex) => comIndex !== deleteBtnIndex);
      renderCommandsList();
    });
  });
};

$(document).ready(() => {
  initEventListeners();
  renderTape();
  renderCommandsList();
});
