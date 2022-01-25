'use strict';

import { ANSWERS_LIST_ID } from '../constants.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { getQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { createCheatButton, showCorrectAnswerElement } from '../views/cheatAnswerView.js';
import { quizData } from '../data.js';
import { router } from '../router.js';

export const initQuestionPage = (userInterface) => {
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

    const questionElement = getQuestionElement(currentQuestion.text);
    userInterface.appendChild(questionElement);

    const answersListElement = document.getElementById(ANSWERS_LIST_ID);

    for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
        const answerElement = createAnswerElement(key, answerText);
        answersListElement.appendChild(answerElement);
    }

    document
        .getElementById(NEXT_QUESTION_BUTTON_ID)
        .addEventListener('click', isAnswerSelected);

    let cheatCount = 0;
    const userCheats = () => {
        const correctAnswer = currentQuestion.correct;
        const correctAnswerContainer = showCorrectAnswerElement(correctAnswer);
        userInterface.appendChild(correctAnswerContainer)
        cheatCount += 1;
        console.log(cheatCount);
    }

    const cheatButtonElement = createCheatButton();
    cheatButtonElement.addEventListener('click', userCheats)
    userInterface.appendChild(cheatButtonElement);

};

const isAnswerSelected = () => {
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    currentQuestion.selected === null ? alert('please select any option') : nextQuestion();

}

const nextQuestion = () => {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

    router('question');
};