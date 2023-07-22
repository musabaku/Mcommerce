// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { Provider } from 'react-redux';
// import store from "./store.js"


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <ToastContainer />
  <App />
</Provider>,
);

// ReactDOM.render(  <Provider store={store}><ToastContainer /><App /> </Provider>, document.getElementById('root'))

// const root = document.getElementById("root");

// ReactDOM.createRoot(root).render(
//   <Provider store={store}>
//     <ToastContainer />
//     <App />
//   </Provider>
// );