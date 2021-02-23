import { atom, selector, selectorFamily } from 'recoil'
import { Auth } from './agent'

export const MOVE_TO_PAGE_CONFIG = {
  category: '',
  page: 1,
  tag: '',
  username: '', // author | favorite
}
export const ArticlesState = {
  getter: atom({
    key: 'articles',
    default: [],
  }),
  config: atom({
    key: 'articlesConfig',
    default: MOVE_TO_PAGE_CONFIG,
  }),
  filteredConfig: selectorFamily({
    key: 'filteredArticles',
    get: (filter) => ({ get }) => {
      const data: ConfigTypes = get(ArticlesState.config)
      switch (filter) {
        case 'category':
          return data.category
        case 'page':
          return data.page
        case 'tag':
          return data.tag
        case 'username':
          return data.username
        default:
          return data
      }
    },
  }),
}
export const AuthState = {
  token: atom({
    key: 'token',
    default: sessionStorage.getItem('token'),
  }),
  user: selector({
    key: 'user',
    get: async ({ get }) => {
      const accessToken = get(AuthState.token)
      if (accessToken) {
        sessionStorage.setItem('token', accessToken)
        const { data } = await Auth.current()
        return data.user
      }
      sessionStorage.clear()
      return { username: null }
    },
  }),
}

interface ConfigTypes {
  category: string
  page: number
  tag: string
  username: string
}
