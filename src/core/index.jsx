import React from 'react'
import ReactDOM from 'react-dom'

import logo from '../assets/img.png'

import styles from './index.less'

ReactDOM.render(
  <div className={styles.ex}>
    <img src={logo} />
  </div>,
  document.getElementById('root')
)
