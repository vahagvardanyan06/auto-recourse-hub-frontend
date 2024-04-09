import { IsSsrMobileContext } from "@/context/IsSsrMobileContext";
import "@/styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme/theme";
import { Provider } from "react-redux";
import store from "@/redux/store";

function App({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
          <Component {...pageProps} />
        </IsSsrMobileContext.Provider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
