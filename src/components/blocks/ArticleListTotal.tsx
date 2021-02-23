import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'
import { ArticlesState } from '../../atoms'

const ArticleListTotal = (): ReactElement => {
  const page = useRecoilValue(ArticlesState.filteredConfig('page'))
  return <p className="article-list-total">{page} / ∞</p>
}

export default ArticleListTotal
