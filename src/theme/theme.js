import { createTheme } from "@mui/material";
import { default as ColorPalette } from "./colors";

const theme = createTheme({
  palette: ColorPalette,
  typography: {
    fontFamily: "sans-serif",
  }
});

export default theme;