"use strict";

/* Program Data
  in this file you can declare variables to store important data for your program
  the data can only be primitives, objects or arrays
  do not store dom elements in these variables!!!!
  these variables will be imported by your handlers when necessary
    not by your logic
    not by your listeners
*/
// export const selectedCorrectAnswersData = [];
// export const selectedWrongAnswersData = [];
export let quizData = {
  selectedCorrectAnswersData: [],
  selectedWrongAnswersData: [],
  counter: 0,
  cheatCount: 0,
  currentQuestionIndex: 0,
  // the questions in the quiz
  questions: [
    {
      text: "What is an event on the web?",
      answers: {
        a: "Events are the functions that respond to user interactions and browser manipulations.",
        b: "Events are interactions between the client device and a server.",
        c: "Event object properties store information about a specific event",
        d: "Events are animations and transistions on the document object model.",
      },
      correct: "c",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/variables",
        },
        {
          text: "Tyler McGinnis",
          href: "https://ui.dev/var-let-const/",
        },
      ],
    },
    {
      text: "What is the event target?",
      answers: {
        a: "The event target is the DOM element that is modified by the event handler",
        b: "The target event property returns the element that stop the event.",
        c: "The event target is the DOM element that the event fires on.",
        d: "Events are interactions between the client device and a server.",
      },
      correct: "c",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/variables",
        },
        {
          text: "Tyler McGinnis",
          href: "https://ui.dev/var-let-const/",
        },
      ],
    },
    {
      text: "What is the event target?",
      answers: {
        a: "The event target is the DOM element that the event fires on.",
        b: "The event target is the DOM element that is modified by the event handler.",
        c: "The target event property returns the element that stop the event.",
        d: "The event target is the DOM element that is modified by the event handler.",
      },
      correct: "a",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/variables",
        },
        {
          text: "Tyler McGinnis",
          href: "https://ui.dev/var-let-const/",
        },
      ],
    },
    {
      text: "How does JavaScript interpret events in the document object model?",
      answers: {
        a: "JavaScript interprets events as objects in the DOM with pre-determined properties and methods.",
        b: "JavaScript interprets events as triggers and functions in the DOM.",
        c: "JavaScript notices every event that takes place on the HTML.",
        d: "JavaScript notices every event that takes place on the DOM.",
      },
      correct: "a",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/variables",
        },
        {
          text: "Tyler McGinnis",
          href: "https://ui.dev/var-let-const/",
        },
      ],
    },
    {
      text: "How can you find how many elements are within an array?",
      answers: {
        a: "myArray.findLength",
        b: "length(myArray)",
        c: "myArray.length",
        d: "myArray=>length",
      },
      correct: "c",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/variables",
        },
        {
          text: "Tyler McGinnis",
          href: "https://ui.dev/var-let-const/",
        },
      ],
    },
    {
      text: "Do the mouse events click and mousedown have the same functionality?",
      answers: {
        a: "No, the click events rely on the mouse being pressed down and released for the event to fire, while mousedown events only rely on the mouse being pressed down.",
        b: "Yes, the click and mousedown events fire the same way.",
        c: "No, these events do not behave the same way because click is not a mouse event.",
        d: "Yes, events events fire the same way.",
      },
      correct: "a",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/variables",
        },
        {
          text: "Tyler McGinnis",
          href: "https://ui.dev/var-let-const/",
        },
      ],
    },
    {
      text: "What is the correct syntax for a keypress event?",
      answers: {
        a: "eventTarget = eventHandlerFunction.onkeypress;",
        b: "eventTarget.keypress = eventHandlerFunction;",
        c: "eventTarget.onkeypress = eventHandlerFunction;",
        d: "eventTarget.onkeypress == eventHandlerFunction;",
      },
      correct: "c",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/variables",
        },
        {
          text: "Tyler McGinnis",
          href: "https://ui.dev/var-let-const/",
        },
      ],
    },
    {
      text: "All events on a web page have specific responses assigned to them.?",
      answers: {
        a: "True",
        b: "false",
      },
      correct: "b",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/variables",
        },
        {
          text: "Tyler McGinnis",
          href: "https://ui.dev/var-let-const/",
        },
      ],
    },
    {
      text: "What is the benefit of the .addEventListener() method?",
      answers: {
        a: "The .addEventListener() method must be paired with a .removeEventListener() method.",
        b: "The .addEventListener() method can use anonymous functions.",
        c: "The .addEventListener() method is good for large code and it can be used to add multiple event handlers to a specific event.",
      },
      correct: "c",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/variables",
        },
        {
          text: "Tyler McGinnis",
          href: "https://ui.dev/var-let-const/",
        },
      ],
    },
    {
      text: "What does `typeof` do?",
      answers: {
        a: "changes the type of a primitive value",
        b: "returns a string describing the type of a value",
        c: "determines if a value is primitive",
        d: "can tell the difference between arrays and objects",
      },
      correct: "b",
      selected: null,
      links: [
        {
          text: "javascript.info",
          href: "https://javascript.info/types#type-typeof",
        },
        {
          text: "MDN",
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof",
        },
      ],
    },
    // Add more questions here
  ],
};
