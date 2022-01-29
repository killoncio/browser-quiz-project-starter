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
import {
  quizData,
  // selectedWrongAnswersData,
  // selectedCorrectAnswersData,
} from "../data.js";
import { addStorage } from "../localstorage/localStorage.js";
import { router } from "../router.js";
// let counter = 0;
// let cheatCount = 0;
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

  const userCheats = () => {
    const correctAnswer = currentQuestion.correct;
    const correctAnswerContainer = showCorrectAnswerElement(correctAnswer);
    userInterface.appendChild(correctAnswerContainer);
    setTimeout(() => {
      userInterface.removeChild(correctAnswerContainer);
      userInterface.removeChild(cheatButtonElement);
    }, 2000);
    quizData.cheatCount++;
  };
  // you could then place the other function showCorrectAnswerElement inside questionView.js as well, no need for cheatAnswerView.js then.
  const cheatButtonElement = document.getElementById(CHEAT_BUTTON_ID);
  cheatButtonElement.addEventListener("click", userCheats);
  userInterface.appendChild(cheatButtonElement);

  // get next question handler
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener("click", onAnswerSelected);
};
// check answers if correct or not
const getAnswer = (e) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  if (!currentQuestion.selected) {
    const answer = e.target.innerText;
    currentQuestion.selected = answer.charAt(0);
    const isAnswerCorrect =
      currentQuestion.selected === currentQuestion.correct;
    showAnswerIsCorrect(isAnswerCorrect, e.target);
  }
};
// Show user if user selection correct or not
const showAnswerIsCorrect = (isAnswerCorrect, target) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  quizData.counter++;
  if (isAnswerCorrect) {
    setBackgroundColor("green", target);
    const userAnswer = {
      questionIndex: quizData.currentQuestionIndex,
      title: currentQuestion.text,
      userSelection: target.innerText,
    };
    quizData.selectedCorrectAnswersData.push(userAnswer);
  } else {
    setBackgroundColor("red", target);
    showCorrect();
    const correctOption = document.querySelector(`li[data-correct="correct"]`);

    const userAnswer = {
      questionIndex: quizData.currentQuestionIndex,
      title: currentQuestion.text,
      userSelection: target.innerText,
      correctSelection: correctOption.innerText,
    };
    quizData.selectedWrongAnswersData.push(userAnswer);
  }
};

// Change options backgroundColor
const setBackgroundColor = (color, target) => {
  target.style.backgroundColor = color;
};

// Show user correct answer if selected wrong answer
const showCorrect = () => {
  const correctOption = document.querySelector(`li[data-correct="correct"]`);
  setBackgroundColor("green", correctOption);
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  addStorage(quizData);
  if (quizData.currentQuestionIndex < quizData.questions.length) {
    router("question");
  } else {
    router("result");
  }
};
const onAnswerSelected = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  currentQuestion.selected === null
    ? alert("please select any option")
    : nextQuestion();
};
