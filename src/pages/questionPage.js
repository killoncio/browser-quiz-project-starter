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
        answerElement.addEventListener('click', getAnswer)
    }
    //user cheats function(user can see correct answer)
    let cheatCount = 0;
    const userCheats = () => { //todo: you can place this function outside initQuestionPage I think
        const correctAnswer = currentQuestion.correct;
        const correctAnswerContainer = showCorrectAnswerElement(correctAnswer);
        userInterface.appendChild(correctAnswerContainer)
        cheatCount += 1; //todo: are you thinking to do something with this info you store? Because if you want to do something, you need to store it in a different way so it does not get back to 0 when going to the following question
        console.log(cheatCount); // todo: remove this
    }

    // todo: why is this not an html element? Do you need to create it dinamically? If so, maybe you can add id directly inside getQuestionElement function in questionView.js
    // you could then place the other function showCorrectAnswerElement inside questionView.js as well, no need for cheatAnswerView.js then.
    const cheatButtonElement = createCheatButton();
    cheatButtonElement.addEventListener('click', userCheats) //todo: missing ; at the end of line
    userInterface.appendChild(cheatButtonElement);
    // get next question handler
    document
        .getElementById(NEXT_QUESTION_BUTTON_ID)
        .addEventListener('click', isAnswerSelected); // todo: I'd rename it to something more generic like onClickNextButton, since you do a couple of things when user does that
};

// check answers if correct or not 
let isSelectedOneAnswer = false;

const getAnswer = (e) => {
        const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
        if (!isSelectedOneAnswer) {
            const answer = e.target.innerText;
            currentQuestion.selected = answer.charAt(0);
            const isAnswerCorrect = currentQuestion.selected === currentQuestion.correct;
            showAnswerIsCorrect(isAnswerCorrect, e.target);
            isSelectedOneAnswer = true;
        }
    }
    // Show user if user selection correct or not
const showAnswerIsCorrect = (isAnswerCorrect, target) => {
    isAnswerCorrect ? setBackgroundColor('green', target) : setBackgroundColor('red', target);
}

const setBackgroundColor = (color, target) => {
    target.style.backgroundColor = color;
}

const nextQuestion = () => {
    isSelectedOneAnswer = false; // I added this code to reset isSelectedOneAnswer for next question
    quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
    router('question');
};

const isAnswerSelected = () => {
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    currentQuestion.selected === null ? alert('please select any option') : nextQuestion();
}