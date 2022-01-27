"use strict";

import { SHOW_SCORE_ID } from "../constants.js";
export const showScoreElement = (correctAnswerCount, totalQuestion) => {
  const element = document.createElement("p");
  element.setAttribute("id", SHOW_SCORE_ID);
  element.innerHTML = String.raw`
  You Have Solved : ${correctAnswerCount} of ${totalQuestion}`;
  return element;
};

//todo: for better readability, do evertything with template literals
// return `<p id=${SHOW_SCORE_ID}>You Have Solved : ${correctAnswerCount} of ${totalQuestion}</p>`;
