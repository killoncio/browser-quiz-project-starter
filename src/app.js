'use strict';

import { quizData } from './data.js';
import { router } from './router.js';

const loadApp = () => {
  
    quizData.currentQuestionIndex = 0;
    router('question');
};
//user can select an answer for each question

//user can know which questions they got correct and incorrect (either immediately or at the end of the quiz)

// user can see the correct answer for questions (either immediately or at the end of the quiz)

// user can see their score at the end of the quiz

window.addEventListener('load', loadApp);