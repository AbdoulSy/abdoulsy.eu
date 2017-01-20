/* jshint esversion: 6 */
import React from "react";
import {render} from "react-dom";
import 'rxjs';
import {Provider, connect} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";

console.clear();

const STATIC = 'STATIC';
const MOVE = 'MOVE';


const stay = () => ({ type: STATIC });
const move = () => ({ type: MOVE });


const moveEpic = action$ =>
  action$.ofType(MOVE)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: STATIC });



const movementReducer = (state = { willMove: false }, action) => {
  switch (action.type) {
    case MOVE:
      return { willMove: true };
    case STATIC:
      return { willMove: false };
    default:
      return state;
  }
};

// components/App.js


let App = ({ willMove, move }) => (
  <div>
    <h1>will move: {willMove.toString()}</h1>
    <button onClick={move}>Move</button>
  </div>
);

App = connect(
  ({ willMove }) => ({ willMove }),
  {move}
)(App);

// redux/configureStore.js

const epicMiddleware = createEpicMiddleware(moveEpic);

const store = createStore(movementReducer,
  applyMiddleware(epicMiddleware)
);

// index.js

render(
  <div>
  <Provider store={store}>
    <App />
  </Provider>
  </div>,
  document.getElementById('root')
);
