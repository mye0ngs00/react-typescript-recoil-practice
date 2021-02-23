import React, { ReactElement } from 'react'

const HeaderMenu = (): ReactElement => {
  return (
    <div className="btn-wrap">
      <button type="button" className="btn-menu">
        <i className="fas fa-bars"></i> <span>메뉴</span>
      </button>
    </div>
  )
}

export default HeaderMenu
