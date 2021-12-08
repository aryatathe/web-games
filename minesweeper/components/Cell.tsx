import * as React from "react";
import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import Flag from "@mui/icons-material/Flag";
import Flare from "@mui/icons-material/Flare";
import { styled } from "@mui/material/styles";

import { stateObj } from "../store";

import { motion } from "framer-motion";

const textColors: string[] = [
  "#0b0c10", //dark(mines)
  "transparent",
  "#fcae25", //orange
  "#f070a1", //pink
  "#16ffbd", //green
  "#faf7dc", //white
  "#faed26", //yellow
  "#bee2a8", //olive
  "#b65ad9", //purple
  "#f3073f", //red
];

const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "mineValue" && prop !== "viewValue",
})<{ mineValue?: number; viewValue?: number }>(
  ({ theme, mineValue, viewValue }) => ({
    width: 24,
    height: 24,
    minWidth: 0,
    margin: 2,
    backgroundColor:
      viewValue === 1 ? (mineValue === -1 ? "#f00" : "#454647") : "#66fcf1",
    color:
      viewValue === 2
        ? "#f00 !important"
        : textColors[mineValue + 1] + " !important",
    fontWeight: 500,
    fontSize: 20,
    "&:hover": {
      backgroundColor: "#66fcf188",
    },
  })
);

interface FuncProps {
  mineValue: number;
  viewValue: number;
  onClick(): void;
  onContextMenu(event: React.MouseEvent): void;
  keyVal: string;
}

const Cell = ({
  mineValue,
  viewValue,
  onClick,
  onContextMenu,
  keyVal,
}: FuncProps): JSX.Element => {
  const state = useSelector((state: stateObj) => state);
  const dispatch = useDispatch();

  return (
    <motion.div
      key={keyVal}
      initial={{ scale: 0, rotate: -10 }}
      animate={{
        scale: viewValue === 1 ? [1, 0.9, 1] : [0, 1.1, 1],
        rotate: viewValue === 1 ? [0, 10, 0] : 0,
      }}
      transition={{ duration: 0.4 }}
    >
      <CustomButton
        mineValue={mineValue}
        viewValue={viewValue}
        disabled={viewValue === 1 || state.complete !== 0}
        onClick={viewValue === 0 ? onClick : null}
        onContextMenu={onContextMenu}
      >
        {viewValue === 0 ? (
          ""
        ) : viewValue === 1 ? (
          mineValue === -1 ? (
            <Flare />
          ) : (
            mineValue
          )
        ) : (
          <Flag />
        )}
      </CustomButton>
    </motion.div>
  );
};

export default Cell;
