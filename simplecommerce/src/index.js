import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import {createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import 'bootstrap/dist/css/bootstrap.min.css';  //dari node_modules

import App from "./components/app";
import reducers from "./reducers/index.js"

const STORE=createStore(reducers,applyMiddleware(thunk))

ReactDOM.render(<Provider store={STORE}><App/></Provider> , document.getElementById('root'))