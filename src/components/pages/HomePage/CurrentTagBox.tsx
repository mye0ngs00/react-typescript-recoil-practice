import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'
import { ArticlesState } from '../../../atoms'

const CurrentTagBox = (): ReactElement => {
  const { category, tag } = useRecoilValue(ArticlesState.config)
  return (
    <>
      {category === 'TAG' ? (
        <h2 className="tag-title">
          Tag <span>#{tag}</span>
        </h2>
      ) : (
        <></>
      )}
    </>
  )
}

export default CurrentTagBox
