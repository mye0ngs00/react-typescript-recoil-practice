import React, { ReactElement, useEffect, useState } from 'react'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { AuthState } from '../../../atoms'
import { guestCategories } from './categories'
import { NavLink } from 'react-router-dom'

const HeaderNavigator = (): ReactElement => {
  const { contents } = useRecoilValueLoadable(AuthState.user)
  const [categories, setCategories] = useState(guestCategories)
  const setToken = useSetRecoilState(AuthState.token)

  const signOut = () => {
    setToken(null)
  }
  useEffect(() => {
    if (contents.username)
      import('./categories').then(({ userCategories }) => setCategories(userCategories))
    else setCategories(guestCategories)
  }, [contents])

  return (
    <ul className="nav">
      {categories.map((c) => (
        <li key={c.name}>
          <NavLink
            exact
            to={
              c.name === 'profile'
                ? `/@${contents.username}`
                : c.name === 'signout'
                ? ''
                : `/${c.name}`
            }
            onClick={c.name === 'signout' ? signOut : void 0}
          >
            <i className={c.icon}></i>
            {c.text}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default HeaderNavigator
