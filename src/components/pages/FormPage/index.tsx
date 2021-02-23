import React, { ReactElement, FormEvent, ChangeEvent, useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Articles } from '../../../agent'

interface RouteParams {
  match: {
    params: {
      slug?: string
    }
  }
}

const FormPage = ({
  match: {
    params: { slug },
  },
}: RouteParams): ReactElement => {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [tagList, setTagList] = useState([''])
  const [readOnly, setReadOnly] = useState(false)

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  const onChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }
  const onChangeTagList = (e: ChangeEvent<HTMLInputElement>) => {
    setTagList(e.target.value.trim().split(','))
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setReadOnly(true)
    if (slug) {
      const response = await Articles.update(slug, { title, description, body, tagList })
      history.push(`/article/${response.data.article.slug}`)
    } else {
      const response = await Articles.create({ title, description, body, tagList })
      history.push(`/article/${response.data.article.slug}`)
    }
  }

  useEffect(() => {
    if (slug)
      Articles.get(slug).then(({ data }) => {
        setTitle(data.article.title)
        setBody(data.article.body)
        setDescription(data.article.description)
        setTagList(data.article.tagList)
      })
  }, [slug])

  return (
    <div className="container page-form">
      <div className="common-form">
        <h2 className="form-title">{slug ? '글 수정하기' : '글 등록하기'}</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <fieldset>
            <div className="form-row">
              <label>
                <span className="form-head">제목</span>
                <input
                  type="text"
                  name="title"
                  placeholder="제목"
                  className="txt large block"
                  onChange={onChangeTitle}
                  value={title}
                  required
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span className="form-head">설명</span>
                <input
                  type="text"
                  name="description"
                  placeholder="설명"
                  className="txt large block"
                  onChange={onChangeDescription}
                  value={description}
                  required
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span className="form-head">내용</span>
                <textarea
                  cols={60}
                  rows={10}
                  name="body"
                  placeholder="내용"
                  className="txt large block"
                  onChange={onChangeBody}
                  value={body}
                  required
                  readOnly={readOnly}
                ></textarea>
              </label>
            </div>
            <div className="form-row">
              <label>
                <span className="form-head">태그</span>
                <input
                  type="text"
                  name="tagList"
                  placeholder="태그( ex. apple, banana, berry)"
                  className="txt large block"
                  value={tagList}
                  onChange={onChangeTagList}
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-action">
              <button type="submit" className="btn large primary">
                등록
              </button>
              <NavLink to="/" className="btn large">
                취소
              </NavLink>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default FormPage
