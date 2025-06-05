import "./index.css";
import "./i18n"; // Initialize i18next

import React from "react";
import ReactDOM from "react-dom/client";
import { useTranslation } from "react-i18next";


import App from "./App";

// Helper component to access t function for Suspense fallback
function SuspenseFallback() {
  const { t } = useTranslation();
  return <>{t('loading')}</>;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<SuspenseFallback />}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
);
