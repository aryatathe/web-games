import { createStore } from "redux";

import { newMineGrid, newViewGrid } from "./logic/newGrid";

export interface stateObj {
  row: number;
  col: number;
  mines: number;
  flags: number;
  viewGrid: number[][];
  mineGrid: number[][];
  complete: number;
  covered: number;
  settings: boolean;
}

export interface actionObj {
  type: string;
  payload?: number[][] | number;
}

const reducers = (
  state: stateObj = {
    row: 15,
    col: 15,
    mines: 20,
    flags: 20,
    viewGrid: [[]],
    mineGrid: [[]],
    complete: 0,
    covered: 0,
    settings: false,
  },
  action: actionObj
) => {
  switch (action.type) {
    case "SETTINGS":
      return { ...state, settings: !state.settings };
    case "NUMROW":
      return { ...state, row: action.payload };
    case "NUMCOL":
      return { ...state, col: action.payload };
    case "NUMMINE":
      return {
        ...state,
        mines: action.payload,
        flags: action.payload,
        complete: 0,
        covered: 0,
      };
    case "MINE":
      return { ...state, mineGrid: action.payload };
    case "FLAG":
      return { ...state, flags: action.payload };
    case "VIEW":
      return { ...state, viewGrid: action.payload };
    case "COMPLETE":
      return { ...state, complete: action.payload };
    case "RESET":
      return {
        ...state,
        complete: 0,
        covered: 0,
        flags: state.mines,
        mineGrid: newMineGrid(state.row, state.col, state.mines),
        viewGrid: newViewGrid(state.row, state.col),
      };
    case "COVERED":
      return {
        ...state,
        covered:
          state.covered +
          (typeof action.payload === "number" ? action.payload : 0),
      };
    default:
      return state;
  }
};

export const store = createStore(reducers);
