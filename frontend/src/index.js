/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Staple Logic (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from 'react-redux'
import store from 'redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
let persistor=persistStore(store)
ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      </Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
