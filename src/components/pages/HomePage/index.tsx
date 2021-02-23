import React, { ReactElement, useEffect } from 'react'
import SideTab from './SideTab'
import TopBanner from './TopBanner'
import Navigator from '../../blocks/Navigator'
import Parginator from '../../blocks/Parginator'
import ArticleList from '../../blocks/ArticleList'
import ArticleListTotal from '../../blocks/ArticleListTotal'
import CurrentTagBox from './CurrentTagBox'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ArticlesState, MOVE_TO_PAGE_CONFIG } from '../../../atoms'

const HomePage = (): ReactElement => {
  const setConfig = useSetRecoilState(ArticlesState.config)
  const category = useRecoilValue(ArticlesState.filteredConfig('category'))
  useEffect(() => {
    if (category === '') {
      setConfig({
        ...MOVE_TO_PAGE_CONFIG,
        category: 'GLOBAL_ARTICLES',
      })
    }
  }, [category])

  return (
    <div className="page-main">
      <TopBanner />
      <div className="container">
        <div className="body">
          <CurrentTagBox />
          <Navigator />
          <ArticleListTotal />
          <ArticleList />
          <Parginator />
        </div>
        <SideTab />
      </div>
    </div>
  )
}

export default HomePage
