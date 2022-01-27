"use strict";

import { ANSWERS_LIST_ID } from "../constants.js";
import { NEXT_QUESTION_BUTTON_ID } from "../constants.js";
import { getQuestionElement } from "../views/questionView.js";
import { createAnswerElement } from "../views/answerView.js";
import {
  createCheatButton,
  showCorrectAnswerElement,
} from "../views/cheatAnswerView.js";
import { showScoreElement } from "../views/showScoreView.js";
import {
  quizData,
  selectedWrongAnswersData,
  selectedCorrectAnswersData,
} from "../data.js";
import { router } from "../router.js";
let counter = 0;
let cheatCount = 0;
export const initQuestionPage = (userInterface) => {
  userInterface.appendChild(
    showScoreElement(counter, quizData.questions.length)
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
    //todo: you can place this function outside initQuestionPage I think
    const correctAnswer = currentQuestion.correct;
    const correctAnswerContainer = showCorrectAnswerElement(correctAnswer);
    userInterface.appendChild(correctAnswerContainer);
    setTimeout(() => {
      userInterface.removeChild(correctAnswerContainer);
      userInterface.removeChild(cheatButtonElement);
    }, 2000);
    cheatCount += 1;
    //todo: are you thinking to do something with this info you store? Because if you want to do something, you need to store it in a different way so it does not get back to 0 when going to the following question
  };

  // todo: why is this not an html element? Do you need to create it dinamically? If so, maybe you can add id directly inside getQuestionElement function in questionView.js
  // you could then place the other function showCorrectAnswerElement inside questionView.js as well, no need for cheatAnswerView.js then.
  const cheatButtonElement = createCheatButton();
  cheatButtonElement.addEventListener("click", userCheats); //todo: missing ; at the end of line
  userInterface.appendChild(cheatButtonElement);

  // get next question handler
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener("click", isAnswerSelected);
};
// check answers if correct or not
export { cheatCount };
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
  if (isAnswerCorrect) {
    setBackgroundColor("green", target);
    counter++;
    const userAnswer = {
      questionIndex: quizData.currentQuestionIndex,
      title: currentQuestion.text,
      userSelection: target.innerText,
    };
    selectedCorrectAnswersData.push(userAnswer);
  } else {
    setBackgroundColor("red", target);
    counter++;
    showCorrect();
    const correctOption = document.querySelector(`li[data-correct="correct"]`);

    const userAnswer = {
      questionIndex: quizData.currentQuestionIndex,
      title: currentQuestion.text,
      userSelection: target.innerText,
      correctSelection: correctOption.innerText,
    };
    selectedWrongAnswersData.push(userAnswer);
    console.log(selectedWrongAnswersData);
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
  if (quizData.currentQuestionIndex < quizData.questions.length - 1) {
    router("question");
  } else {
    router("result");
  }
};
const isAnswerSelected = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  currentQuestion.selected === null
    ? alert("please select any option")
    : nextQuestion();
};
