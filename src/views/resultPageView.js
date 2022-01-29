import {
    RESULT_CONTAINER_ID,
    ANSWER_CONTAINER,
    ANSWER_WRAPPER,
    TEST_AGAIN_ID,
} from "../constants.js";

export const createTotalScoreElement = (
    totalScore,
    isSuccess = true,
    questionCount
) => {
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
export const createAnswersContainer = (answers, wrong = null) => {
    const answersContainerElement = document.createElement("div");
    answersContainerElement.innerHTML = `<h2>${wrong ? 'Wrong Answers' : 'Correct Answers'}</h2>`;
    answersContainerElement.setAttribute("class", ANSWER_CONTAINER);
    answers.forEach((answer, i) => {
        answersContainerElement.innerHTML += `<div class="${ANSWER_WRAPPER}"> 
      <h3>${i + 1}-${answer.title}</h3>
      <p><b>Your Answer:</b>${answer.userSelection}</p>
      <p>${
        wrong ? "<b>Correct Answer:</b> " + answer.correctSelection : ""
      }</p></div>`;
    });
    return answersContainerElement;
};
export const createBtnElement = () => {
    const btnElement = document.createElement("button");
    btnElement.innerText = "Start Again";
    btnElement.setAttribute("class", "btn");
    btnElement.setAttribute("id", TEST_AGAIN_ID);
    // btnElement.innerHTML = `<button id="${TEST_AGAIN_ID}" class ="btn">Test Again </button>`;
    return btnElement;
};