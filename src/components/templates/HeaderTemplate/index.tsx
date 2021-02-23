import React, { ReactElement } from 'react'
import HeaderMobileMenu from './HeaderMobileMenu'
import HeaderNavigator from './HeaderNavigator'
import HeaderLogoBox from './HeaderLogoBox'

const HeaderTemplate = (): ReactElement => {
  return (
    <>
      <div className="common-header">
        <div className="wrap">
          <HeaderLogoBox />
          <HeaderMobileMenu />
          <HeaderNavigator />
        </div>
      </div>
      <div className="dim" />
    </>
  )
}

export default HeaderTemplate
