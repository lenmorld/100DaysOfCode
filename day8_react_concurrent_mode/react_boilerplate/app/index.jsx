import React from "react";
import ReactDOM from "react-dom";

// import App from "./AppBasicFetch";
import App from "./AppWithSuspense";

// ReactDOM.render(<App />, document.getElementById("app"));

const rootElem = document.getElementById("app");

// Concurrent Mode's createRoot API
const root = ReactDOM.createRoot(rootElem);
root.render(<App />);
