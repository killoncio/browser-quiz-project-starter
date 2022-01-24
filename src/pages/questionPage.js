'use strict';

import { ANSWERS_LIST_ID } from '../constants.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { getQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
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
    //get answers handler
    answerElement.addEventListener('click',getAnswer)
  }
// get next question handler
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion)
};
let correctAnswers=0;
// check answers if correct or not 
const getAnswer = (e)=> {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const answer = e.target.innerText;
  currentQuestion.selected=answer.charAt(0)
  if(currentQuestion.selected===currentQuestion.correct){
    console.log('selected correct answer')
    e.target.style.backgroundColor='green'
    // updated current answers counter
    correctAnswers++
    console.log('selected correct answer : '+correctAnswers)
  }
  else {
    console.log('selected wrong answer')
    e.target.style.backgroundColor='tomato'
  }
}

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  router('question');
};
