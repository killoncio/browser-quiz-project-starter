"use strict";

import { quizData } from "./data.js";
import { router } from "./router.js";
import { readStorage } from "./localstorage/localStorage.js";

const loadApp = () => {
    let data = readStorage();
    quizData.currentQuestionIndex = data.currentQuestionIndex;
    router("question");
};

window.addEventListener("load", loadApp);