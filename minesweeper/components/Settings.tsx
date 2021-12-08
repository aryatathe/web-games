import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Close from "@mui/icons-material/Close";

import { stateObj } from "../store";

import { motion } from "framer-motion";

const CustomStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "col",
})<{ col: number }>(({ theme, col }) => ({
  position: "absolute",
  top: 0,
  width: "100%",
  borderRadius: 20,
  backgroundColor: "#0b0c10",
  padding: "0 20px",
  color: "#66fcf1",
  "& .MuiIconButton-root": {
    position: "absolute",
    top: 10,
    right: 10,
    color: "#66fcf1",
  },
  "& h3": {
    transformOrigin: "left",
  },
}));

const CustomSlider = styled(Slider)(({ theme }) => ({
  marginBottom: 30,
  color: "#45a29e",
  "& MuiSlider-rail": {},
  "& MuiSlider-track": {},
  "& MuiSlider-thumb": {},
}));

interface FuncProps {
  state: stateObj;
  dispatch: any;
}

const appear = {
  start: {
    scale: [0, 1.1, 1],
  },
};

const fadein = {
  start: {
    opacity: [0, 1],
  },
};

const Settings = (): JSX.Element => {
  const state = useSelector((state: stateObj) => state);
  const dispatch = useDispatch();

  const [tempRow, setTempRow] = React.useState<number>(state.row);
  const [tempCol, setTempCol] = React.useState<number>(state.col);
  const [tempMines, setTempMines] = React.useState<number>(state.mines);

  return !state.settings ? null : (
    <CustomStack col={state.col}>
      <motion.div
        style={{ display: "contents" }}
        animate="start"
        variants={appear}
        transition={{ duration: 0.5, delayChildren: 0, staggerChildren: 0.1 }}
      >
        <IconButton
          onClick={() => {
            dispatch({ type: "NUMROW", payload: tempRow });
            dispatch({ type: "NUMCOL", payload: tempCol });
            dispatch({ type: "NUMMINE", payload: tempMines });
            dispatch({ type: "SETTINGS" });
          }}
        >
          <Close />
        </IconButton>
        <Typography
          variant="h2"
          component={motion.h2}
          transition={{ duration: 0.5 }}
          variants={appear}
        >
          Settings
        </Typography>
        <Typography
          variant="h3"
          gutterBottom
          component={motion.h3}
          transition={{ duration: 0.4 }}
          variants={appear}
        >
          Rows: {tempRow}
        </Typography>
        <motion.div transition={{ duration: 0.4 }} variants={fadein}>
          <CustomSlider
            min={10}
            max={25}
            value={tempRow}
            onChange={(event: Event, value: number | number[]): void => {
              setTempRow(typeof value === "number" ? value : value[0]);
            }}
          />
        </motion.div>
        <Typography
          variant="h3"
          gutterBottom
          component={motion.h3}
          transition={{ duration: 0.4 }}
          variants={appear}
        >
          Columns: {tempCol}
        </Typography>
        <motion.div transition={{ duration: 0.4 }} variants={fadein}>
          <CustomSlider
            min={10}
            max={25}
            value={tempCol}
            onChange={(event: Event, value: number | number[]): void => {
              setTempCol(typeof value === "number" ? value : value[0]);
            }}
          />
        </motion.div>
        <Typography
          variant="h3"
          gutterBottom
          component={motion.h3}
          transition={{ duration: 0.4 }}
          variants={appear}
        >
          Mines: {tempMines}
        </Typography>
        <motion.div transition={{ duration: 0.4 }} variants={fadein}>
          <CustomSlider
            min={5}
            max={99}
            value={tempMines}
            onChange={(event: Event, value: number | number[]): void => {
              setTempMines(typeof value === "number" ? value : value[0]);
            }}
          />
        </motion.div>
      </motion.div>
    </CustomStack>
  );
};

export default Settings;
