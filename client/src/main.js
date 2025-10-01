import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import config from "./config";
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPerformance from '@bugsnag/browser-performance';


Bugsnag.start({
  apiKey: 'ef72bcbee2ac5e58e27a09c83341eeb1',
  plugins: [new BugsnagPluginReact(React)],
  appVersion: `0.0.1`
})

BugsnagPerformance.start({
  apiKey: 'ef72bcbee2ac5e58e27a09c83341eeb1',
  appVersion: '0.0.1',
})

const bugsnagReact = Bugsnag.getPlugin('react')
const ErrorBoundary = bugsnagReact ? bugsnagReact.createErrorBoundary(React) : null

const ErrorScreen = ({ clearError }) =>
  <div>
    <h1>⚠️ Error ⚠️</h1>
    <p><strong>Uh oh, there was an error in the component tree!</strong></p>
    <p>This <code>FallbackComponent</code> prop can be used to show something useful to your users when such errors occur.</p>
    <button onClick={clearError}>Reset</button>
</div>

const onError = event => {
  // You can also provide an onError callback to run just on errors caught by
  // the error boundary. Maybe you want to attach some of the current state from
  // whatever model/store you're using (e.g redux)
  Bugsnag.notify(event)
  console.log('about to send this event', { event })
}




document.addEventListener("DOMContentLoaded", () => {
  let reactElement = document.getElementById("app");

  if (reactElement) {
    const root = createRoot(reactElement)

    if (config.nodeEnv === "development") {
      try {
        if (ErrorBoundary) {
          root.render(
            <ErrorBoundary FallbackComponent={ErrorScreen} onError={onError}>
              <App />
            </ErrorBoundary>
          )
        } else {
          root.render(<App />)
        }
      } catch (e) {
        console.error("Error rendering app:", e);
      }
    } else {
      if (ErrorBoundary) {
        root.render(
          <ErrorBoundary FallbackComponent={ErrorScreen} onError={onError}>
            <App />
          </ErrorBoundary>
        )
      } else {
        root.render(<App />)
      }
    }
  }
});
