import $ from 'jquery';
import _ from 'lodash';

import Tape from "./models/Tape";

const renderTape = (tape) => {
    const tmpl = _.template($('#tapeTemplate').html());

    $('#tape').html(tmpl({
        boxId: tape.boxId,
        tape: tape.tape
    }));
};

$(document).ready(() => {
    const tape = new Tape(41);
    console.log(tape);
    renderTape(tape);
});