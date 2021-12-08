import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import { stateObj } from "../store";

import Flag from "@mui/icons-material/Flag";

import { motion } from "framer-motion";

const CustomStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "col",
})<{ col: number }>(({ theme, col }) => ({
  width: "100%",
  padding: "0 20px",
  borderRadius: "20px 20px 0 0",
  backgroundColor: "#0b0c10",
  color: "#66fcf1",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1f2833",
  color: "#c5c6c7",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#1f283388",
  },
  "& .MuiTouchRipple-root": {
    color: "#45a29e",
  },
}));

interface FuncProps {
  state: stateObj;
  dispatch: any;
}

const appear = {
  none: {},
  start: {
    scale: [0, 1.1, 1],
  },
};

const Header = (): JSX.Element => {
  const state = useSelector((state: stateObj) => state);
  const dispatch = useDispatch();

  return state.settings ? null : (
    <CustomStack direction="column" col={state.col}>
      <Typography
        variant="h1"
        component={motion.h1}
        initial={{ scale: 0 }}
        animate="start"
        transition={{ duration: 0.5 }}
        variants={appear}
      >
        Minesweeper
      </Typography>
      <Stack
        component={motion.div}
        animate="start"
        transition={{ duration: 0.1, delayChildren: 0, staggerChildren: 0.1 }}
        variants={appear}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <motion.div
          initial={{ scale: 0 }}
          transition={{ duration: 0.5 }}
          variants={appear}
        >
          <CustomButton
            onClick={(): void => {
              dispatch({
                type: "RESET",
              });
            }}
          >
            Reset
          </CustomButton>
        </motion.div>
        <Typography
          variant="h3"
          component={motion.h3}
          initial={{ scale: 0 }}
          transition={{ duration: 0.5 }}
          variants={appear}
        >
          {state.complete === 0 ? (
            <>
              {state.flags}
              <Flag />
              {"   remaining"}
            </>
          ) : state.complete === 1 ? (
            "You Win!"
          ) : (
            "You Lose!"
          )}
        </Typography>
        <motion.div
          initial={{ scale: 0 }}
          transition={{ duration: 0.5 }}
          variants={appear}
        >
          <CustomButton
            onClick={(): void => {
              dispatch({
                type: "SETTINGS",
              });
            }}
          >
            Settings
          </CustomButton>
        </motion.div>
      </Stack>
    </CustomStack>
  );
};

export default Header;
