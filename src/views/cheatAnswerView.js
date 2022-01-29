"use strict";

/**
 * Create a button element to get correct answer
 * @returns {Element}
 */
//Creates cheat button element
export const createCheatButton = () => {
    const getAnswerButton = document.createElement("button");
    getAnswerButton.classList.add("btn");
    getAnswerButton.innerText = "See Answer";
    return getAnswerButton;
};
//Creates an element for showing correct answer
export const showCorrectAnswerElement = (correctAnswer) => {
    const correctAnswerContainer = document.createElement("div");
    correctAnswerContainer.innerHTML = `'${correctAnswer}' option is correct answer of this question`;
    correctAnswerContainer.classList.add("btn");
    return correctAnswerContainer;
};