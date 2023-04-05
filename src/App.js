import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Routes from "./routes/index";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ColorModeContext } from "./components/Context/index";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateTheme } from "./store/common/CommonReducers";

function App() {
  const dispatch = useDispatch();
  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                divider: "#d3d3d3",
                border: "#d3d3d3",
                text: {
                  primary: "#000 !important",
                  secondary: "#676767 !important",
                },
                background: {
                  default: "#e6e7ee !important",
                  primary: "#f1f1f1 !important",
                  secondary: "#fff",
                  success: "#fff",
                },
              }
            : {
                border: "#143a69",
                divider: "#143a69",
                background: {
                  default: "#4d4d4d !important",
                  primary: "#4d4d4d !important",
                  secondary: "#071230 ",
                  success: "#0b1632",
                },
                text: {
                  primary: "#fff",
                  secondary: "#78819c !important",
                },
              }),
        },
      }),
    [mode]
  );

  React.useEffect(() => {
    dispatch(updateTheme(mode));
  }, [mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CookiesProvider>
      <ToastContainer />
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default () => {
  return (
      <Provider store={store}>
        <App />
      </Provider>
  );
};
