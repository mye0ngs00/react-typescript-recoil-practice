import React, { useState, ReactElement, FormEvent, ChangeEvent, useEffect } from 'react'
import { Auth } from '../../../agent'
import { useHistory } from 'react-router-dom'

const SettingsPage = (): ReactElement => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [bio, setBio] = useState('')
  const [readOnly, setReadOnly] = useState(false)

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value)
  }
  const onChangeBio = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const goBack = () => history.goBack()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userInfo = JSON.parse('{}')
    userInfo.username = username
    userInfo.email = email
    userInfo.image = image
    userInfo.bio = bio
    if (password !== '') userInfo.password = password
    setReadOnly(true)
    Auth.update(userInfo)
      .then(() => {
        history.replace(`/@${username}`)
      })
      .catch(() => setReadOnly(false))
  }

  useEffect(() => {
    Auth.current().then(({ data }) => {
      setUsername(data.user.username)
      setEmail(data.user.email)
      setBio(data.user.bio)
      setImage(data.user.image)
    })
  }, [])

  return (
    <div className="container page-profile-edit">
      <div className="common-form">
        <h2 className="form-title">프로필 수정</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <fieldset>
            <div className="form-row">
              <label>
                <span className="form-head">프로필 이미지</span>
                <input
                  type="text"
                  name="image"
                  placeholder="프로필 이미지 URL"
                  className="txt large block"
                  value={image || ''}
                  onChange={onChangeImage}
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span className="form-head">사용자 이름</span>
                <input
                  type="text"
                  name="username"
                  placeholder="사용자 이름"
                  className="txt large block"
                  value={username || ''}
                  onChange={onChangeUsername}
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span className="form-head">소개</span>
                <textarea
                  cols={60}
                  rows={10}
                  name="bio"
                  placeholder="소개"
                  className="txt large block"
                  value={bio || ''}
                  onChange={onChangeBio}
                  readOnly={readOnly}
                ></textarea>
              </label>
            </div>
            <div className="form-row">
              <label>
                <span className="form-head">이메일</span>
                <input
                  type="text"
                  name="email"
                  placeholder="이메일"
                  className="txt large block"
                  value={email || ''}
                  onChange={onChangeEmail}
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span className="form-head">새 비밀번호</span>
                <input
                  type="password"
                  name="password"
                  placeholder="새 비밀번호"
                  className="txt large block"
                  value={password || ''}
                  onChange={onChangePassword}
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-action">
              <button type="submit" className="btn large primary">
                수정
              </button>
              <button type="button" className="btn large" onClick={goBack}>
                취소
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default SettingsPage
