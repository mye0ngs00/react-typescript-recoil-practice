const commonCategories = [
  {
    name: '',
    text: 'Home',
    icon: '',
  },
]

const guestCategories = [
  ...commonCategories,
  {
    name: 'signin',
    text: '로그인',
    icon: '',
  },
  {
    name: 'signup',
    text: '회원가입',
    icon: '',
  },
]

const userCategories = [
  ...commonCategories,
  {
    name: 'form',
    text: '글등록',
    icon: 'far fa-edit',
  },
  {
    name: 'profile',
    text: '프로필',
    icon: 'far fa-user',
  },
  {
    name: 'signout',
    text: '로그아웃',
    icon: '',
  },
]

export { guestCategories, userCategories }
