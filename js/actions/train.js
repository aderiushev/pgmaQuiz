
import type { Action } from './types';

export const SET_TRAIN = 'SET_TRAIN';

export function setTrain(train: object): Action {
  return {
    type: SET_TRAIN,
    payload: train,
  };
}
