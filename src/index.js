import $ from "jquery";
import _ from "lodash";

import Tape from "./models/Tape";

const tape = new Tape(41);

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
      tape.boxId = index;
      renderTape();
    });
  });

  $(".b-cell__state").each((index, cell) => {
    $(cell).on("click", () => {
      tape.toggleCell(index);
      renderTape();
    });
  });
};

$(document).ready(() => {
  console.log(tape.tape);
  tape.toggleCell(20);
  initEventListeners();
  renderTape();
});
