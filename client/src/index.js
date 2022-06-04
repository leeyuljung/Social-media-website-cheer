import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import ApolloProvider from "./ApolloProvider";
import "./index.css";
import "react-vertical-timeline-component/style.min.css";
import "react-loading-skeleton/dist/skeleton.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>{ApolloProvider}</React.StrictMode>);

reportWebVitals();
