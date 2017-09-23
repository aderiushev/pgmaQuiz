
import type { Action } from './types';

export const ADD_ANSWER = 'ADD_ANSWER';
export function addAnswer(answer: boolean): Action {
  return {
    type: ADD_ANSWER,
    payload: answer,
  };
}

export const PREPARE_TEST = 'PREPARE_TEST';
export function prepareTest(mode: string): Action {
  return {
    type: PREPARE_TEST,
    payload: { mode },
  };
}

export const CHANGE_TIME_SPENT = 'CHANGE_TIME_SPENT';
export function changeTimeSpent(seconds: Number): Action {
  return {
    type: CHANGE_TIME_SPENT,
    payload: { seconds },
  };
}
