"use strict";

import {
    NEXT_QUESTION_BUTTON_ID,
    ANSWERS_LIST_ID,
    CHEAT_BUTTON_ID,
} from "../constants.js";
import { getQuestionElement } from "../views/questionView.js";
import { createAnswerElement } from "../views/answerView.js";
import { showCorrectAnswerElement } from "../views/cheatAnswerView.js";
import { showScoreElement } from "../views/showScoreView.js";
import { quizData } from "../data.js";
import { addStorage } from "../localstorage/localStorage.js";
import { router } from "../router.js";
export const initQuestionPage = (userInterface) => {
    userInterface.appendChild(
        showScoreElement(quizData.counter, quizData.questions.length)
    );
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    const questionElement = getQuestionElement(currentQuestion.text);
    userInterface.appendChild(questionElement);
    const answersListElement = document.getElementById(ANSWERS_LIST_ID);
    for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
        const answerElement = createAnswerElement(key, answerText);
        if (key === currentQuestion.correct) {
            answerElement.setAttribute("data-correct", "correct");
        }
        answersListElement.appendChild(answerElement);
        answerElement.addEventListener("click", getAnswer);
    }
    // User can see correct answer by clicking on "see answer" button
    const userCheats = () => {
        const correctAnswer = currentQuestion.correct;
        const correctAnswerContainer = showCorrectAnswerElement(correctAnswer);
        userInterface.appendChild(correctAnswerContainer);
        //prevents button to be clicked more than one
        cheatButtonElement.setAttribute('disabled', 'disabled');
        setTimeout(() => {
            userInterface.removeChild(correctAnswerContainer);
            userInterface.removeChild(cheatButtonElement);
        }, 2000);
        quizData.cheatCount++;
    };
    // Create see answer button element
    const cheatButtonElement = document.getElementById(CHEAT_BUTTON_ID);
    cheatButtonElement.addEventListener("click", userCheats);
    userInterface.appendChild(cheatButtonElement);

    // get next question handler
    document
        .getElementById(NEXT_QUESTION_BUTTON_ID)
        .addEventListener("click", onAnswerSelected);
};
// Handles answer selection
const onAnswerSelected = () => {
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    currentQuestion.selected === null ?
        alert("Please select any option") :
        nextQuestion();
};
// Navigates to pages based on a router parameter and updates quizData on localStorage
const nextQuestion = () => {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
    addStorage(quizData);
    if (quizData.currentQuestionIndex < quizData.questions.length) {
        router("question");
    } else {
        router("result");
    }
};

// Get user selection and call 'showAnswerIsCorrect' function
const getAnswer = (e) => {
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    if (!currentQuestion.selected) {
        const answer = e.target.innerText;
        currentQuestion.selected = answer.charAt(0);
        const isAnswerCorrect = currentQuestion.selected === currentQuestion.correct;

        onOptionClicked(isAnswerCorrect, e.target);
    }
};
// Stores Selected answers and indicates correct and wrong option elements with background color
const onOptionClicked = (isAnswerCorrect, target) => {
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    quizData.counter++;
    if (isAnswerCorrect) {
        setBackgroundColor("green", target);
        // Updating quizdata by adding userAnswer object for correct answer
        const userAnswer = {
            questionIndex: quizData.currentQuestionIndex,
            title: currentQuestion.text,
            userSelection: target.innerText,
        };
        quizData.selectedCorrectAnswersData.push(userAnswer);
    } else {
        setBackgroundColor("red", target);
        // Show correct answer to user if selected wrong option
        indicateCorrectAnswer();
        const correctOption = document.querySelector(`li[data-correct="correct"]`);
        // Updating quizdata by adding userAnswer object for wrong answer
        const userAnswer = {
            questionIndex: quizData.currentQuestionIndex,
            title: currentQuestion.text,
            userSelection: target.innerText,
            correctSelection: correctOption.innerText,
        };
        quizData.selectedWrongAnswersData.push(userAnswer);
    }
};

// Changes options backgroundColor
const setBackgroundColor = (color, target) => {
    target.style.backgroundColor = color;
};

// Show user correct answer if selected wrong answer
const indicateCorrectAnswer = () => {
    const correctOption = document.querySelector(`li[data-correct="correct"]`);
    setBackgroundColor("green", correctOption);
};