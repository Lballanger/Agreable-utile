import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./pages/App";
import store from "./store/store";
import ScrollToTop from "./hooks/useScrollTop";

import { getToken } from "./utils/tokenStorage";
import { fetchUserData } from "./slices/userSlice";

if (getToken()) {
  store.dispatch(fetchUserData());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
