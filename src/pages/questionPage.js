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
let counter = 0; //todo: this variable is better to have it inside data.js, same as currentQuestionIndex for example is there. The benefit is that you have all data localized in one file, not scattered all around different files.
let cheatCount = 0; //todo: same as previous variable
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
    const correctAnswer = currentQuestion.correct;
    const correctAnswerContainer = showCorrectAnswerElement(correctAnswer);
    userInterface.appendChild(correctAnswerContainer);
    setTimeout(() => {
      userInterface.removeChild(correctAnswerContainer);
      userInterface.removeChild(cheatButtonElement);
    }, 2000);
    cheatCount += 1;
  };

 const cheatButtonElement = createCheatButton(); //todo: as mentioned, this could be built in questionView.js
  cheatButtonElement.addEventListener("click", userCheats);
  userInterface.appendChild(cheatButtonElement);

  // get next question handler
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener("click", isAnswerSelected);
};
// check answers if correct or not
export { cheatCount }; //todo: If you need to use it somewhere else, better to store it inside data.js, as for example currentQuestionIndex, so you have all data in one place
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
    // todo: you do not need to do all this. You just have to store the answer user has selected in quizData.questions[currentQuestion].selected (which is already done in l63)
    // then, to get any information computed out of that, like number of correct answers / incorrect answers / counter / etc... you just create a function that goes through quizData object and returns what you neeed
    // for example:
    // function getCorrectAnswers() {
    //  return quizData.questions.filter( question => question.correct === question.selected);
    // }
    // I understand it might seem more complex at the beginning, but it's the normal approach to use filter and map through a data element
    // Having duplicated source of datas (like in your case with quizData, selectedCorrectAnswersData, selectedWrongAnswersData and counter) makes it harder to maintain (you need to remember to update all variables) and to read
  } else {
    setBackgroundColor("red", target);
    counter++;
    showCorrect();
    const correctOption = document.querySelector(`li[data-correct="correct"]`); // todo: this would also not be needed if you follow what mentioned above

    const userAnswer = { //todo: as above, I think this is not needed
      questionIndex: quizData.currentQuestionIndex,
      title: currentQuestion.text,
      userSelection: target.innerText,
      correctSelection: correctOption.innerText,
    };
    selectedWrongAnswersData.push(userAnswer);
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