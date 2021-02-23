import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
)
