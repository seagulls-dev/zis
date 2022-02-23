import * as serviceWorker from './serviceWorker'
// import 'antd/dist/antd.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import './i18n'
import { LoadingIndicator } from './components'
import App from 'App'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<LoadingIndicator />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
