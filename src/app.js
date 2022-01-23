'use strict';

import { quizData } from './data.js';
import { router } from './router.js';

const loadApp = () => {
  quizData.currentQuestionIndex = 0;
//Router func
  router('question');
};

window.addEventListener('load', loadApp);
// 1- Find 10 question and make each of them 4 answer options
// 2- Write a function that handle users selection and check if it is correct or not . 
//      Create a handler folder and call the fuction in pages=>guestionPage.js
// 3- Write a function to update score and add as eventlistener in next question button
// 4- Write a function that checks if any answer selected or not. 
//     If user not select any answer it should not pass next question.
//     add it as eventlistener in next question button