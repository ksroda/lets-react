import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Home from './views/Home/Home'
import reducer from './reducers'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Home} />
    </BrowserRouter>,
  </Provider>,
  document.getElementById('app')
)
