import { createStore } from 'redux';
import { reducer } from './reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';


export const store = createStore(reducer, devToolsEnhancer());

// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

// // export const store = createStore(reducers);

// export const store = createStore(reducers, composeWithDevTools(
//     applyMiddleware(...middleware)
// ));