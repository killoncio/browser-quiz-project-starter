 import {
     selectedCorrectAnswersData,
     selectedWrongAnswersData,
     quizData,
 } from "../data.js";
 import {
     createAnswersContainer,
     createTotalScoreElement,
     createResultContainer,
 } from "../views/resultPageView.js";
 import { cheatCount } from "./questionPage.js";
 export const initResultPage = (userInterface) => {
     const pageContainerElement = document.createElement("div");
     userInterface.appendChild(pageContainerElement);
     const totalScoreElement = createTotalScoreElement(
         selectedCorrectAnswersData.length - cheatCount
     );
     pageContainerElement.appendChild(totalScoreElement);
     const resultContainerElement = createResultContainer();
     pageContainerElement.appendChild(resultContainerElement);
     const correctAnswerContainer = createAnswersContainer(
         selectedCorrectAnswersData
     );
     resultContainerElement.appendChild(correctAnswerContainer);
     const wrongAnswerContainer = createAnswersContainer(
         selectedWrongAnswersData,
         "giveWrongAnswer"
     );
     resultContainerElement.appendChild(wrongAnswerContainer);
     return pageContainerElement;
 };