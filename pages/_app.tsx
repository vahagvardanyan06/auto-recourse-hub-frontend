import { IsSsrMobileContext } from "@/context/IsSsrMobileContext";
import "@/styles/global.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme/theme";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/components/ErrorBoundary";

function App({ Component, pageProps }: any) {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<CircularProgress color="primary" />}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
              <Component {...pageProps} />
            </IsSsrMobileContext.Provider>
          </ThemeProvider>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
