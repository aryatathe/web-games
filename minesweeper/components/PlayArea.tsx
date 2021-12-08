import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { clicked } from "../logic/handleClick";
import { lossReveal } from "../logic/lossReveal";

import { stateObj, actionObj } from "../store";

import Cell from "./Cell";

const CustomStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "col",
})<{ col: number }>(({ theme, col }) => ({
  padding: col < 13 ? 200 - col * 14 : 20,
  width: "100%",
  borderRadius: "0 0 20px 20px",
  backgroundColor: "#0b0c10",
}));

interface FuncProps {
  state: stateObj;
  dispatch(arg: actionObj): void;
}

const PlayArea = (): JSX.Element => {
  const state = useSelector((state: stateObj) => state);
  const dispatch = useDispatch();

  return state.settings ? null : (
    <CustomStack col={state.col} direction="column" justifyContent="center">
      {state.mineGrid.map((x: number[], i: number) => {
        return (
          <Stack direction="row" justifyContent="center">
            {x.map((k: number, j: number) => {
              return (
                <Cell
                  mineValue={k}
                  viewValue={state.viewGrid[i][j]}
                  keyVal={`${state.row}${state.col}${i}${j}${state.mines}`}
                  onContextMenu={(event: React.MouseEvent) => {
                    event.preventDefault();
                    console.log("right-clicked");
                    if (state.flags === 0 && state.viewGrid[i][j] === 0) return;
                    let temp: number[][] = state.viewGrid;
                    temp[i][j] = temp[i][j] === 0 ? 2 : 0;
                    dispatch({
                      type: "FLAG",
                      payload:
                        temp[i][j] === 0 ? state.flags + 1 : state.flags - 1,
                    });
                    dispatch({
                      type: "VIEW",
                      payload: temp,
                    });
                  }}
                  onClick={(): void => {
                    if (state.mineGrid[i][j] < 0) {
                      console.log("lose");
                      let temp: number[][] = lossReveal(
                        state.mineGrid,
                        state.viewGrid,
                        i,
                        j,
                        state.row,
                        state.col
                      );
                      dispatch({
                        type: "VIEW",
                        payload: temp,
                      });
                      dispatch({
                        type: "COMPLETE",
                        payload: 2,
                      });
                    } else {
                      let temp: [number[][], number] = clicked(
                        state.mineGrid,
                        state.viewGrid,
                        i,
                        j,
                        state.row,
                        state.col
                      );
                      console.log("returned: " + temp[1]);
                      dispatch({
                        type: "VIEW",
                        payload: temp[0],
                      });
                      dispatch({
                        type: "COVERED",
                        payload: temp[1],
                      });
                    }
                  }}
                />
              );
            })}
          </Stack>
        );
      })}
    </CustomStack>
  );
};

export default PlayArea;
