"use strict";

import {
    ANSWERS_LIST_ID,
    NEXT_QUESTION_BUTTON_ID,
    CHEAT_BUTTON_ID,
} from "../constants.js";

/**
 * Create a full question element
 * @returns {Element}
 */
export const getQuestionElement = (question) => {
    const element = document.createElement("div");
    // I use String.raw just to get fancy colors for the HTML in VS Code.
    element.innerHTML = String.raw `
    <h1>${question}</h1>
    <ul id="${ANSWERS_LIST_ID}"></ul>
    <button class="btn" id = "${NEXT_QUESTION_BUTTON_ID}"> Next question </button>
    <button class ="btn" id= "${CHEAT_BUTTON_ID}">See Answer </button>
  `;
    return element;
};