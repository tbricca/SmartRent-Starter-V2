import ReactDOM from "react-dom";
import { Platform } from "react-native";

import "./sentry";

import App from "./App";

// Prevent Android's soft keyboard from resizing the viewport when it opens, which
// breaks layouts pretty hard.
if (Platform.OS === "web") {
  const isAndroid = navigator.userAgent.toLowerCase().includes("android");

  if (isAndroid) {
    const metaViewport = document.createElement("meta");
    metaViewport.name = "viewport";
    metaViewport.content = `width=device-width, height=${window.innerHeight}, initial-scale=1.0, minimum-scale=1.0`;
    document.getElementsByTagName("head")[0].appendChild(metaViewport);
  }
}

ReactDOM.render(<App />, document.getElementById("react-root"));
