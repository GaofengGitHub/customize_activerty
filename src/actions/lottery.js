import * as types from '../constants/ActionTypes';

export function downDrawTimes(drawTimes) {
  return {
    type: types.DOWN_DRAW_TIMES,
    drawTimes
  };
}
export function setDrawTimes(drawTimes) {
    return {
      type: types.SET_DRAW_TIMES,
      drawTimes
    };
  }