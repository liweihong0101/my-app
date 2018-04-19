import React from 'react'
import ReactDOM from 'react-dom'
import Records from './components/Records'
const rootEl = document.getElementById('root')
const render = () => ReactDOM.render(
    <Records/>,
    rootEl
)

render()