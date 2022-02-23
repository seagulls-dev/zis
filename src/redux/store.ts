import { applyMiddleware, compose, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import apiActionMiddleware from './middleware/apiActionMiddleware'
import classActionMiddleware from './middleware/classActionMiddleware'
import rootReducer from './rootReducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(apiActionMiddleware, reduxThunk, classActionMiddleware),
  ),
)

export default store
