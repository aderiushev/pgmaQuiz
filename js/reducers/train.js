import type { Action } from '../actions/types';
import { SET_TRAIN } from '../actions/train';

export type State = {
  totalQuestionsCount: number
}

const initialState = {
  totalQuestionsCount: 10,
  isCorrectAnswerDisplayed: true,
  isWrongAnswerDisplayed: true,
  questionDisplayTimeout: 2000
};

export default function (state: State = initialState, action: Action): State {
  if (action.type === SET_TRAIN) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}
