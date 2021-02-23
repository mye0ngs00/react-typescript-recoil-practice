import React, { ReactElement, FormEvent, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Comments } from '../../../agent'

interface CommentParams {
  author: {
    bio: string | null
    following: boolean
    image: string
    username: string
  }
  body: string
  createdAt: string
  id: number
  updatedAt: string
}
interface MatchParams {
  slug: string
}
const CommentBlock = ({ slug }: MatchParams): ReactElement => {
  const [body, setBody] = useState('')
  const [comments, setComments] = useState([])
  const [readOnly, setReadOnly] = useState(false)

  useEffect(() => {
    useComment()
  }, [])
  const useComment = async () => {
    const response = await Comments.get(slug)
    setComments(response.data.comments)
    setReadOnly(false)
    setBody('')
  }
  const handleDeleteComment = (id: number) => {
    Comments.delete(slug, id).then((e) => {
      useComment()
    })
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setReadOnly(true)
    await Comments.create({
      slug,
      comment: {
        body,
      },
    })
    useComment()
  }
  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setBody(e.target.value)
  }

  return (
    <>
      <h3 className="comment-title">댓글</h3>
      <form className="comment-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="comment-txt">
          <textarea
            rows={10}
            cols={40}
            placeholder="댓글을 입력하세요.."
            name="comment"
            value={body}
            onChange={onChangeComment}
            required
            readOnly={readOnly}
          ></textarea>
        </div>
        <div className="action">
          <button type="submit" className="btn light">
            등록
          </button>
        </div>
      </form>

      <ul className="comment-list">
        {comments.length ? (
          comments.map((item: CommentParams) => (
            <li key={item.id}>
              <NavLink className="img" to={`/@${item.author.username}`}>
                <img src={item.author.image} alt="" />
              </NavLink>
              <div className="wrap">
                <div className="info">
                  <NavLink className="name" to={`/@${item.author.username}`}>
                    {item.author.username}
                  </NavLink>
                  <span className="date">{item.createdAt}</span>
                </div>
                <button type="button" className="del" onClick={() => handleDeleteComment(item.id)}>
                  <i className="far fa-trash-alt"></i>
                  <span className="hide">삭제</span>
                </button>
                <div className="content">{item.body}</div>
              </div>
            </li>
          ))
        ) : (
          <li className="no-item">등록된 댓글이 없습니다.</li>
        )}
      </ul>
    </>
  )
}

export default CommentBlock
