import React, { ReactElement } from 'react'
import ArticleItem from './ArticleItem'
import { useRecoilValue } from 'recoil'
import { ArticlesState } from '../../../atoms'

interface Author {
  username: string
  bio: string
  image: string
  following: boolean
}
interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: Array<string>
  createdAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

const ArticleList = (): ReactElement => {
  const articles = useRecoilValue(ArticlesState.getter)

  return (
    <ul className="article-list">
      {articles.length ? (
        articles.map((article: Article) => (
          <ArticleItem
            key={article.slug}
            slug={article.slug}
            title={article.title}
            description={article.description}
            tagList={article.tagList}
            like={article.favoritesCount}
            imgSrc={article.author.image}
            name={article.author.username}
            favorited={article.favorited}
            date={article.createdAt}
          />
        ))
      ) : (
        //FEED X or NEED SIGN IN
        <li>...</li>
      )}
    </ul>
  )
}
export default ArticleList
