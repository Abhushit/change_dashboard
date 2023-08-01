import { ThemeProvider } from "@mui/material";
import Routing from "./Routing";
import theme from "./theme/theme";
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routing />
    </ThemeProvider>
  );
}

export default App;
