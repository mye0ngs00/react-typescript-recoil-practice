import React, { ReactElement } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Articles } from '../../../agent'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ArticlesState, MOVE_TO_PAGE_CONFIG } from '../../../atoms'
import { useState } from 'react'

interface ArticleProps {
  title: string
  slug: string
  description: string
  like: number
  imgSrc: string
  name: string
  date: string
  tagList: Array<string>
  favorited: boolean
}

const ArticleItem = ({
  title,
  slug,
  description,
  like,
  imgSrc,
  name,
  date,
  tagList,
  favorited,
}: ArticleProps): ReactElement => {
  const setConfig = useSetRecoilState(ArticlesState.config)
  const history = useHistory()
  const tag = useRecoilValue(ArticlesState.filteredConfig('tag'))
  const [isFavorited, setFavorited] = useState(favorited)
  const [numOfLike, setNumOfLike] = useState(like)

  const handleTag = (item: string) => {
    setConfig({
      ...MOVE_TO_PAGE_CONFIG,
      category: 'TAG',
      tag: item,
    })
    history.push('/')
  }
  const ToggleFavoriteArticle = async () => {
    if (isFavorited) {
      await Articles.unfavorite(slug)
      setFavorited(false)
      setNumOfLike(numOfLike - 1)
    } else {
      await Articles.favorite(slug)
      setFavorited(true)
      setNumOfLike(numOfLike + 1)
    }
  }

  return (
    <li className="article-item">
      <p className="title">
        <NavLink to={'/article/' + slug}>{title}</NavLink>
      </p>

      <p className="desc">{description}</p>

      <div className="info">
        <div className="author-info">
          <NavLink className="link" to={'/@' + name}>
            <div className="img">
              <img src={imgSrc} alt="" />
            </div>
            <p className="name">{name}</p>
          </NavLink>
          <p className="date">{date}</p>
        </div>

        <ul className="tag-list small">
          {tagList.map((item) => (
            <li key={item} onClick={() => handleTag(item)}>
              <a className={tag === item ? 'selected' : ''}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className={isFavorited ? 'btn-like favorited' : 'btn-like'}
        onClick={ToggleFavoriteArticle}
      >
        <i className="fas fa-heart"></i>
        <span className="txt">좋아요</span>
        <span className="count">{numOfLike}</span>
      </button>
    </li>
  )
}

export default ArticleItem
