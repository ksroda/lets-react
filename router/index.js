import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './views/Home/Home'

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Home} />
  </BrowserRouter>,
  document.getElementById('app') // eslint-disable-line
)
