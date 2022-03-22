import { Renderer } from "@nodegui/react-nodegui";
import React from "react";
import App from "./App";

process.title = "My NodeGui App";
Renderer.render(<App />);
if (import.meta.hot) {
  import.meta.hot.accept(["./App"], function () {
    Renderer.forceUpdate();
  });
}
