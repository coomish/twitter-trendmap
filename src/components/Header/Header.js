import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Twitter Trendmap for Germany</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Trendmap
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Background
    </Link>
  </div>
)

export default Header
