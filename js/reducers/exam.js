import type { Action } from '../actions/types';

export type State = {
  totalQuestionsCount: number
}

const initialState = {
  totalQuestionsCount: 60,
  isCorrectAnswerDisplayed: false,
  isWrongAnswerDisplayed: false,
  questionDisplayTimeout: 0,
  totalSecondsCount: 60 * 30,
  minAcceptablePercent: 80
};

export default function (state: State = initialState, action: Action): State {
  return state;
}
