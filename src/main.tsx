import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from "./App";
import "./index.css";

const cognitoConfig = {
  authority: "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_TZrBM1Ne3",
  client_id: "181un761aovrlh2grt4rrodffb",

  redirect_uri: "https://d3ff6qg3cb4uo2.cloudfront.net",

  response_type: "code",
  scope: "openid email phone",
};





ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider
    {...cognitoConfig}
    onSigninCallback={() => {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }}
  >
    <App />
  </AuthProvider>
);

