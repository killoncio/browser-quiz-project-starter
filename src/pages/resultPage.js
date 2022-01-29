import { quizData } from "../data.js";
import { deleteStorage } from "../localstorage/localStorage.js";
import {
  createAnswersContainer,
  createTotalScoreElement,
  createResultContainer,
} from "../views/resultPageView.js";
import { TEST_AGAIN_ID } from "../constants.js";
import { createBtnElement } from "../views/resultPageView.js";
import { router } from "../router.js";
export const initResultPage = (userInterface) => {
  const pageContainerElement = document.createElement("div");
  userInterface.appendChild(pageContainerElement);
  const totalScoreElement = createTotalScoreElement(
    quizData.selectedCorrectAnswersData.length - quizData.cheatCount,
    true,
    quizData.questions.length
  );
  pageContainerElement.appendChild(totalScoreElement);
  const resultContainerElement = createResultContainer();
  pageContainerElement.appendChild(resultContainerElement);
  const startAgainBtnElement = createBtnElement();
  pageContainerElement.appendChild(startAgainBtnElement);
  const correctAnswerContainer = createAnswersContainer(
    quizData.selectedCorrectAnswersData
  );
  resultContainerElement.appendChild(correctAnswerContainer);
  const wrongAnswerContainer = createAnswersContainer(
    quizData.selectedWrongAnswersData,
    "giveWrongAnswer"
  );
  resultContainerElement.appendChild(wrongAnswerContainer);
  document.getElementById(TEST_AGAIN_ID).addEventListener("click", () => {
    deleteStorage();
    location.reload();
    router("question");
  });
  return pageContainerElement;
};
