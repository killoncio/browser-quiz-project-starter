import { quizData } from "../data.js";
//Adds whole bunch of quizData to the local storage.
export const addStorage = (question) => {
    let userInfos;
    if (localStorage.getItem("questionData") == null) {
        userInfos = [];
    } else {
        userInfos = JSON.parse(localStorage.getItem("questionData"));
    }
    userInfos.push(question);
    localStorage.setItem("questionData", JSON.stringify(userInfos));
};
// Gets whole bunch of quizData from local storage
export const readStorage = () => {
    let userInfos;
    if (localStorage.getItem("questionData") == null) {
        userInfos = [];
    } else {
        userInfos = JSON.parse(localStorage.getItem("questionData"));
    }
    Object.assign(quizData, userInfos.pop());
    return quizData;
};
// DeleteStorage whole bunch of quizData from local storage.
export const deleteStorage = () => {
    if (localStorage.getItem("questionData") == null) {
        userInfos = [];
    } else {
        localStorage.removeItem("questionData");
    }
};