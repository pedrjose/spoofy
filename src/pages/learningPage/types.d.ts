interface Answer {
  option: string;
  rightAnswer: boolean;
}

export interface Question {
  description: string;
  answers: {
    a: Answer;
    b: Answer;
    c: Answer;
    d: Answer;
  };
}
