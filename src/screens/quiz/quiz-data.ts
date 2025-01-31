const questions = [
  {
    type: "SINGLE_SELECT",
    question: "this is a single select question?",
    options: ["option 1", "option 2", "option 3", "option 4"],
    answer: "option 1",
  },
  {
    type: "MULTI_SELECT",
    question: "this is a multi select question?",
    options: ["option 1", "option 2", "option 3", "option 4"],
    answer: ["option 1", "option 2"],
  },
  {
    type: "TRUE_FALSE",
    question: "this is a true/false question?",
    options: ["True", "False"],
    answer: "True",
  },
  {
    type: "ORDERING",
    question: "this is a ordering question?",
    options: ["option 1", "option 2", "option 3", "option 4"],
    answer: ["option 2", "option 4", "option 3", "option 1"],
  },
];

export { questions };
