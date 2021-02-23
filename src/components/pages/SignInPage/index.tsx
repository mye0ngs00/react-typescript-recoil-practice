import React, { FormEvent, ReactElement, useState, ChangeEvent } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Auth } from '../../../agent'
import { ArticlesState, MOVE_TO_PAGE_CONFIG, AuthState } from '../../../atoms'

const SignInPage = (): ReactElement => {
  const history = useHistory()
  const setToken = useSetRecoilState(AuthState.token)
  const setConfig = useSetRecoilState(ArticlesState.config)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [readOnly, setReadOnly] = useState(false)

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setReadOnly(true)
    Auth.signIn({ email, password })
      .then(({ data }) => {
        setToken(JSON.stringify(data.user.token))
        setConfig({
          ...MOVE_TO_PAGE_CONFIG,
          category: 'GLOBAL_ARTICLES',
        })
        history.push('/')
      })
      .catch(() => setReadOnly(false))
  }

  return (
    <div className="container page-login">
      <div className="common-form">
        <h2 className="form-title">로그인</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <fieldset>
            <legend>로그인</legend>
            <div className="form-row">
              <label>
                <span className="form-head">이메일</span>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일"
                  className="txt large block"
                  onChange={onChangeEmail}
                  required
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span className="form-head">비밀번호</span>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  className="txt large block"
                  onChange={onChangePassword}
                  required
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-action">
              <button type="submit" className="btn large primary">
                로그인
              </button>
            </div>
          </fieldset>
        </form>
        <div className="info-box">
          처음 오셨나요? <NavLink to="/signup">회원가입</NavLink>을 해주세요.
        </div>
      </div>
    </div>
  )
}

export default SignInPage
