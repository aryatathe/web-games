import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Mali",
    h1: {
      fontSize: 48,
      fontWeight: 700,
      textAlign: "center",
      lineHeight: 1.7,
    },
    h2: {
      fontSize: 36,
      fontWeight: 700,
      textAlign: "center",
      lineHeight: 1.7,
      marginBottom: 30,
    },
    h3: {
      fontSize: 24,
      fontWeight: 300,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#1f2833",
        },
      },
    },
  },
});

export default theme;
