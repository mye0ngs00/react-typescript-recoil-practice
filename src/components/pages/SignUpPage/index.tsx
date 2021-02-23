import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Auth } from '../../../agent'
import { AuthState } from '../../../atoms'
import WarningDimension from './WarningDimension'

const SignUpPage = (): ReactElement => {
  const history = useHistory()
  const setToken = useSetRecoilState(AuthState.token)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warnings, setWarnings] = useState({
    email: [],
    username: [],
    password: [],
  })
  const [readOnly, setReadOnly] = useState(false)

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setReadOnly(true)
    Auth.signUp({ username, email, password })
      .then(({ data }) => {
        setToken(JSON.stringify(data.user.token))
        history.goBack()
      })
      .catch(({ response }) => {
        const { status } = response
        if (status === 422) setWarnings(response.data.errors)
        setReadOnly(false)
      })
  }

  return (
    <div className="container page-join">
      <div className="common-form">
        <h2 className="form-title">회원가입</h2>
        <WarningDimension warnings={warnings} />
        <form onSubmit={handleSubmit} autoComplete="off">
          <fieldset>
            <div className="form-row">
              <label>
                <span className="form-head">사용자 이름</span>
                <input
                  type="text"
                  name="username"
                  placeholder="사용자 이름"
                  className="txt large block"
                  onChange={onChangeUsername}
                  readOnly={readOnly}
                />
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
                  onChange={onChangeEmail}
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
                  readOnly={readOnly}
                />
              </label>
            </div>
            <div className="form-action">
              <button type="submit" className="btn large primary">
                회원가입
              </button>
              <NavLink to="/" className="btn large">
                취소
              </NavLink>
            </div>
          </fieldset>
        </form>
        <div className="info-box">
          이미 계정이 있으신가요? <NavLink to="/signin">로그인</NavLink>을 해주세요.
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
