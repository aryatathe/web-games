import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, Fragment } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { styled, ThemeProvider } from "@mui/material/styles";

import theme from "./styles";

import { stateObj } from "./store";

import PlayArea from "./components/PlayArea";
import Header from "./components/Header";
import Settings from "./components/Settings";

const CustomStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "col",
})<{ col: number }>(({ theme, col }) => ({
  position: "relative",
  width: col * 28 + 120,
  minWidth: 480,
  border: "transparent 40px solid",
  margin: "auto",
}));

const App = (): JSX.Element => {
  const state = useSelector((state: stateObj) => state);
  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch({
      type: "RESET",
    });
  }, [state.row, state.col, state.mines]);

  useEffect((): void => {
    if (state.covered === state.row * state.col - state.mines) {
      dispatch({
        type: "COMPLETE",
        payload: 1,
      });
    }
  }, [state.covered]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomStack col={state.col} direction="column" alignItems="center">
        <Header />
        <PlayArea />
        <Settings />
      </CustomStack>
    </ThemeProvider>
  );
};

export default App;
