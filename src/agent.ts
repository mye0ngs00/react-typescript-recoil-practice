import axios, { AxiosInstance, AxiosResponse } from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.get['Access-Control-Allow-Headers'] = '*'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'

const useAxios = (): AxiosInstance => {
  const axiosInstance = axios.create()
  axiosInstance.interceptors.request.use((config) => {
    const { token } = sessionStorage
    if (token) config.headers.common['Authorization'] = `Token ${token}`
    return config
  })
  axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => {
      const { response } = err
      if (response.status === 401) alert('로그인이 필요한 서비스입니다.')
      if (response.status === 422) {
        let msg = ''
        Object.keys(response.data.errors).forEach((key) => {
          msg = msg + key + ': ' + response.data.errors[key] + '\n'
        })
        alert(msg)
      }
      return Promise.reject(err)
    },
  )
  return axiosInstance
}
const requests = {
  get: (url: string) => useAxios().get(url),
  post: (url: string, body: string | undefined) => useAxios().post(url, body),
  put: (url: string, body: string) => useAxios().put(url, body),
  delete: (url: string) => useAxios().delete(url),
}

const DEFAULT_LIMIT = 10
const PROFILE_LIMIT = 3
const getOffset = (limit: number, page: number) => limit * (page - 1)

export const Auth = {
  signIn: (user: LoginTypes): Promise<AxiosResponse> => {
    return requests.post('/users/login', JSON.stringify({ user }))
  },
  signUp: (user: RegisterTypes): Promise<AxiosResponse> => {
    return requests.post('/users', JSON.stringify({ user }))
  },
  update: (user: UpdateUserTypes): Promise<AxiosResponse> => {
    return requests.put('/user', JSON.stringify({ user }))
  },
  current: (): Promise<AxiosResponse> => {
    return requests.get('/user')
  },
}

export const Articles = {
  create: (article: ArticleTypes): Promise<AxiosResponse> => {
    return requests.post('/articles', JSON.stringify({ article }))
  },
  get: (slug: string): Promise<AxiosResponse> => {
    return requests.get(`/articles/${slug}`)
  },
  delete: (slug: string): Promise<AxiosResponse> => {
    return requests.delete(`/articles/${slug}`)
  },
  update: (slug: string, article: ArticleTypes): Promise<AxiosResponse> => {
    return requests.put(`/articles/${slug}`, JSON.stringify({ article }))
  },
  filterByTag: (tag: string, page: number): Promise<AxiosResponse> => {
    const offset = getOffset(DEFAULT_LIMIT, page)
    return requests.get(`/articles?limit=${DEFAULT_LIMIT}&offset=${offset}&tag=${tag}`)
  },
  filterByAuthor: (author: string, page: number): Promise<AxiosResponse> => {
    const offset = getOffset(PROFILE_LIMIT, page)
    return requests.get(`/articles?limit=${PROFILE_LIMIT}&offset=${offset}&author=${author}`)
  },
  filterByFavorite: (user: string, page: number): Promise<AxiosResponse> => {
    const offset = getOffset(PROFILE_LIMIT, page)
    return requests.get(`/articles?limit=${PROFILE_LIMIT}&offset=${offset}&favorited=${user}`)
  },
  getAll: (page: number): Promise<AxiosResponse> => {
    const offset = getOffset(DEFAULT_LIMIT, page)
    return requests.get(`/articles?limit=${DEFAULT_LIMIT}&offset=${offset}`)
  },
  getFeeds: (page: number): Promise<AxiosResponse> => {
    const offset = getOffset(DEFAULT_LIMIT, page)
    return requests.get(`/articles/feed?limit=${DEFAULT_LIMIT}&offset=${offset}`)
  },
  favorite: (slug: string): Promise<AxiosResponse> => {
    return requests.post(`/articles/${slug}/favorite`, undefined)
  },
  unfavorite: (slug: string): Promise<AxiosResponse> => {
    return requests.delete(`/articles/${slug}/favorite`)
  },
}

export const Profile = {
  get: (username: string): Promise<AxiosResponse> => {
    return requests.get(`/profiles/${username}`)
  },
  follow: (username: string): Promise<AxiosResponse> => {
    return requests.post(`/profiles/${username}/follow`, undefined)
  },
  unfollow: (username: string): Promise<AxiosResponse> => {
    return requests.delete(`/profiles/${username}/follow`)
  },
}

export const Comments = {
  get: (slug: string): Promise<AxiosResponse> => {
    return requests.get(`/articles/${slug}/comments`)
  },
  delete: (slug: string, id: number): Promise<AxiosResponse> => {
    return requests.delete(`/articles/${slug}/comments/${id}`)
  },
  create: ({ slug, comment }: CommentTypes): Promise<AxiosResponse> => {
    return requests.post(`/articles/${slug}/comments`, JSON.stringify({ comment }))
  },
}
export const Tags = {
  getAll: (): Promise<AxiosResponse> => requests.get(`/tags`),
}

/* interfaces */
interface CommentTypes {
  slug: string
  comment: {
    body: string
  }
}
interface UpdateUserTypes {
  email?: string
  bio?: string
  image?: string
  password?: string
  username?: string
}
interface LoginTypes {
  email: string
  password: string
}
interface RegisterTypes {
  username: string
  email: string
  password: string
}
interface ArticleTypes {
  title?: string
  description?: string
  body?: string
  tagList?: Array<string>
}
