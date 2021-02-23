import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import LOGO from '../../../assets/icons/logo.png'
import { ArticlesState, MOVE_TO_PAGE_CONFIG } from '../../../atoms'

const HeaderLogoBox = (): ReactElement => {
  const setConfig = useSetRecoilState(ArticlesState.config)
  const handleConfig = () => {
    setConfig({
      ...MOVE_TO_PAGE_CONFIG,
      category: 'GLOBAL_ARTICLES',
    })
  }
  return (
    <h1 className="logo">
      <NavLink exact={true} to="/" onClick={handleConfig}>
        <img src={LOGO} width="35rem" />
        <i style={{ color: '#FF7F00' }}>mye0ngs00</i>
      </NavLink>
    </h1>
  )
}

export default HeaderLogoBox
