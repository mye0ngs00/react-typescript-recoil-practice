import React, { ReactElement } from 'react'

const ParginationButton = ({
  isActive,
  isArrow,
  onClickButton,
  label,
  imageClass,
  number,
}: MatchParams): ReactElement => {
  return (
    <li className={isActive ? 'active' : ''}>
      <a className={isActive ? 'active' : ''} onClick={onClickButton} aria-label={label}>
        {isArrow ? <span className={imageClass}></span> : number}
      </a>
    </li>
  )
}

export default ParginationButton

interface MatchParams {
  isActive: boolean
  isArrow: boolean
  onClickButton: () => void
  label: string
  imageClass?: string
  number?: number
}
