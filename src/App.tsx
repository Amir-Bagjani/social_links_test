import { useMemo } from "react";
import { LinkContextProvider } from "./context/LinkContext";
import { createTheme, useMediaQuery } from "@material-ui/core";

import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";

//font
import "./theme/fonts/css/iranfont.css";

//components
import Layout from "./components/layout/Layout";

// global style
import "./theme/styles.css";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App: React.FC = () => {
  //dark-light mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");

  const CustomTheme = useMemo(
    () =>
      createTheme({
        direction: "rtl",
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
        typography: {
          fontFamily: "IRANSans",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={CustomTheme}>
      <StylesProvider jss={jss}>
        <LinkContextProvider>
          <Layout />
        </LinkContextProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
