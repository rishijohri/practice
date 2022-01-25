import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Sign } from './components/sign';
import reportWebVitals from './reportWebVitals';
import {Home} from './components/home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Secret } from './components/secret';
import store from './app/store';
import { Provider } from 'react-redux';
const rootElement = document.getElementById("root");
const customHistory = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter history={customHistory}>
    <Routes>
      <Route path="/" element={<App/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="sign-in" element={<Sign name="Sign In"/>}/>
      <Route path="sign-up" element={<Sign name="Sign Up"/>}/>
      <Route path="secret" element={<Secret/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (window.Cypress) {
  window.store = store
}