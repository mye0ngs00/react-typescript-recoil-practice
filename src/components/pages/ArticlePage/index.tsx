import React, { ReactElement, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { ArticlesState, AuthState, MOVE_TO_PAGE_CONFIG } from '../../../atoms'
import { NavLink, useHistory } from 'react-router-dom'
import { Articles } from '../../../agent'
import CommentBlock from './CommentBlock'

interface RouteParams {
  match: {
    params: {
      slug: string
    }
  }
}
const ArticlePage = ({
  match: {
    params: { slug },
  },
}: RouteParams): ReactElement => {
  const history = useHistory()
  const { contents: userInfo } = useRecoilValueLoadable(AuthState.user)
  const [config, setConfig] = useRecoilState(ArticlesState.config)
  const [article, setArticle] = useState({
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [''],
    createdAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  })
  const handleDeleteArticle = async () => {
    await Articles.delete(slug)
    history.goBack()
  }
  const ToggleFavoriteArticle = async () => {
    if (article.favorited) {
      const response = await Articles.unfavorite(slug)
      setArticle(response.data.article)
    } else {
      const response = await Articles.favorite(slug)
      setArticle(response.data.article)
    }
  }
  useEffect(() => {
    Articles.get(slug).then(({ data }) => setArticle(data.article))
  }, [slug])

  return (
    <div className="page-article">
      <div className="article-header">
        <div className="wrap">
          <h2 className="subject">{article.title}</h2>
          <p className="desc">{article.description}</p>
          <div className="info">
            <div className="author-info">
              <NavLink className="link" to={`/@${article.author.username}`}>
                <div className="img">
                  <img src={`${article.author.image}`} alt="" />
                </div>
                <p className="name">{article.author.username}</p>
              </NavLink>
              <p className="date">{article.createdAt}</p>
            </div>
            <button
              type="button"
              className={article.favorited ? 'btn-like favorited' : 'btn-like'}
              onClick={ToggleFavoriteArticle}
            >
              <i className="fas fa-heart"></i>
              <span className="txt">좋아요</span>
              <span className="count">{article.favoritesCount}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="article-body">
          <div className="body">{article.body}</div>

          <ul className="tag-list">
            {article.tagList.map((tag: string, id: number) => (
              <li key={id}>
                <a>{tag}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="page-foot">
          {userInfo.username === article.author.username && (
            <>
              <NavLink to={`/editor/${slug}`} type="button" className="btn">
                수정
              </NavLink>
              <button type="button" className="btn" onClick={handleDeleteArticle}>
                삭제
              </button>
            </>
          )}
          <NavLink to="/" type="button" className="btn">
            목록
          </NavLink>
        </div>
        <CommentBlock slug={slug} />
      </div>
    </div>
  )
}

export default ArticlePage
