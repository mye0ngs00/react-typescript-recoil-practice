import React, { ReactElement } from 'react'

interface PropTypes {
  warnings: {
    email: Array<string>
    username: Array<string>
    password: Array<string>
  }
}
const WarningDimension = ({ warnings }: PropTypes): ReactElement => {
  return (
    <>
      {warnings.username &&
        warnings.username.map((msg, id) => {
          return <div key={id}>* [사용자 이름] {msg}</div>
        })}
      {warnings.email &&
        warnings.email.map((msg, id) => {
          return <div key={id}>* [이메일] {msg}</div>
        })}
      {warnings.password &&
        warnings.password.map((msg, id) => {
          return <div key={id}>* [비밀번호] {msg}</div>
        })}
    </>
  )
}

export default WarningDimension
