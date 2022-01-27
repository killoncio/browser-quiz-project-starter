'use strict';

import {
  ANSWERS_LIST_ID
} from '../constants.js';
import {
  NEXT_QUESTION_BUTTON_ID
} from '../constants.js';

/**
 * Create a full question element
 * @returns {Element}
 */
export const getQuestionElement = (question) => {
  const element = document.createElement('div');

  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw `
    <h1>${question}</h1>

    <ul id="${ANSWERS_LIST_ID}"></ul>

    <button class="btn" id = "${NEXT_QUESTION_BUTTON_ID}"> Next question </button>
  `;
// todo: add here button to cheat, instead of dinamically in questionPage.js
  return element;
};