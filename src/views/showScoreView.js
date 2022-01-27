"use strict";

import { SHOW_SCORE_ID } from "../constants.js";
export const showScoreElement = (correctAnswerCount, totalQuestion) => {
  const element = document.createElement("p");
  element.setAttribute("id", SHOW_SCORE_ID);
  element.innerHTML = String.raw`
  You Have Solved : ${correctAnswerCount} of ${totalQuestion}`;
  return element;
};
