"use strict";

import { initQuestionPage } from "./pages/questionPage.js";
import { initResultPage } from "./pages/resultPage.js";
import { USER_INTERFACE_ID } from "./constants.js";

export const router = (page) => {
  const userInterfaceElement = document.getElementById(USER_INTERFACE_ID);
  userInterfaceElement.innerHTML = "";

  switch (page) {
    case "question":
      initQuestionPage(userInterfaceElement);
      break;
    case "result":
      initResultPage(userInterfaceElement);
      break;
  }
};
