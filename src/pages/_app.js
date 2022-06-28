import "../styles/globals.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import SuperTokensReact from "supertokens-auth-react";
import * as SuperTokensConfig from "../config/frontendConfig";
import Session from "supertokens-auth-react/recipe/session";
import { redirectToAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import store from "../app/store";
config.autoAddCss = false

if (typeof window !== "undefined") {
  SuperTokensReact.init(SuperTokensConfig.frontendConfig());
}

function MyApp({ Component, pageProps }) {
  useEffect(
    () => {
      async function doRefresh() {
        if (pageProps.fromSupertokens === "needs-refresh") {
          if (await Session.attemptRefreshingSession()) {
            location.reload();
          } else {
            redirectToAuth();
          }
        }
      }
      doRefresh();
    },
    [pageProps.fromSupertokens]
  );

  if (pageProps.fromSupertokens === "needs-refresh") {
    // in case the frontend needs to refresh, we show nothing.
    // Alternatively, you can show a spinner.

    return null;
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
