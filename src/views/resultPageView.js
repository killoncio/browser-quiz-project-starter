import { RESULT_CONTAINER_ID, ANSWER_CONTAINER, ANSWER_WRAPPER } from "../constants.js";

export const createTotalScoreElement = (totalScore, isSuccess = true, questionCount) => {
    if (totalScore < 5) {
        isSuccess = false;
    }
    const scoreElement = document.createElement("h1");
    scoreElement.innerHTML = `Your SCORE is ${totalScore} out of ${questionCount}. You are ${
    isSuccess ? "Successful" : "Failed"
  }`;
    return scoreElement;
};
export const createResultContainer = () => {
    const resultContainer = document.createElement("div");
    resultContainer.setAttribute("id", RESULT_CONTAINER_ID);
    return resultContainer;
};
export const createAnswersContainer = (answers, correct = null) => {
    const answersContainerElement = document.createElement("div");
    answersContainerElement.setAttribute('class', ANSWER_CONTAINER)
    answers.forEach((answer, i) => {
        answersContainerElement.innerHTML += `<div class="${ANSWER_WRAPPER}"> 
      <h3>${i + 1}-${answer.title}</h3>
      <p><b>Your Answer:</b>${answer.userSelection}</p>
      <p>${
        correct ? "<b>Correct Answer:</b> " + answer.correctSelection : ""
      }</p></div>`;
    });
    return answersContainerElement;
};