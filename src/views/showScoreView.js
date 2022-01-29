"use strict";

import { SHOW_SCORE_ID } from "../constants.js";
export const showScoreElement = (correctAnswerCount, totalQuestion) => {
    const element = document.createElement("p");
    element.setAttribute("id", SHOW_SCORE_ID);
    element.innerHTML = String.raw ` 
  <p class="score-title"> ${correctAnswerCount} / ${totalQuestion}</p> `;
    return element;
};