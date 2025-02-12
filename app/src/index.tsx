import { createRoot } from "react-dom/client";
import React from "react";

import App from "./App";

document.body.innerHTML = "<div id='app'></div>";

const root = createRoot(document.getElementById("app")!);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
