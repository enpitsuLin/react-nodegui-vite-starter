import { Renderer } from "@nodegui/react-nodegui";
import React from "react";
import App from "./App";

process.title = "My NodeGui App";
Renderer.render(<App />);
// This is for hot reloading (this will be stripped off in production by webpack)
if (import.meta.hot) {
  import.meta.hot.accept(["./app"], function () {
    Renderer.forceUpdate();
  });
}
