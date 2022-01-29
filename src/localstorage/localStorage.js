import { quizData } from "../data.js";
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
export const readStorage = () => {
  let userInfos;
  if (localStorage.getItem("questionData") == null) {
    userInfos = [];
  } else {
    userInfos = JSON.parse(localStorage.getItem("questionData"));
  }
  console.log(userInfos);
  Object.assign(quizData, userInfos.pop());
  return quizData;
};
export const deleteStorage = () => {
  if (localStorage.getItem("questionData") == null) {
    userInfos = [];
  } else {
    localStorage.removeItem("questionData");
  }
};
