import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SWRConfig } from "swr";
import { Toaster } from "sonner";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <SWRConfig value={{ fetcher: fetcher }}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);
