
import type { Action } from '../actions/types';
import { ADD_ANSWER, PREPARE_TEST, CHANGE_TIME_SPENT } from '../actions/test';

export type State = {
  answers: array
}

const initialState = {
  answers: []
};

export default function (state: State = initialState, action: Action): State {
  if (action.type === ADD_ANSWER) {
    return {
      ...state,
      answers: [...state.answers, action.payload]
    };
  }
  if (action.type === PREPARE_TEST) {
    return {
      ...state,
      answers: [],
      secondsSpent: 0,
      mode: action.payload.mode
    };
  }
  if (action.type === CHANGE_TIME_SPENT) {
    return {
      ...state,
      secondsSpent: action.payload.seconds
    };
  }
  return state;
}
