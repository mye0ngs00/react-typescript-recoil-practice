import React, { ReactElement, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HeaderTemplate from './components/templates/HeaderTemplate'
import FooterTemplate from './components/templates/FooterTemplate'

import ProfilePage from './components/pages/ProfilePage'
import FormPage from './components/pages/FormPage'
import HomePage from './components/pages/HomePage'
import SignUpPage from './components/pages/SignUpPage'
import SignInPage from './components/pages/SignInPage'
import NotFoundPage from './components/pages/NotFoundPage'
import ArticlePage from './components/pages/ArticlePage'
import SettingsPage from './components/pages/SettingsPage'
import { Articles } from './agent'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ArticlesState, AuthState } from './atoms'

const Router = (): ReactElement => {
  const config = useRecoilValue(ArticlesState.config)
  const token = useRecoilValue(AuthState.token)
  const setArticles = useSetRecoilState(ArticlesState.getter)
  useEffect(() => {
    const { category, page, tag, username } = config
    switch (category) {
      case 'GLOBAL_ARTICLES':
        Articles.getAll(page).then(({ data }) => setArticles(data.articles))
        break
      case 'TAG':
        Articles.filterByTag(tag, page).then(({ data }) => setArticles(data.articles))
        break
      case 'MY_FEED':
        Articles.getFeeds(page)
          .then(({ data }) => setArticles(data.articles))
          .catch(() => setArticles([]))
        break
      case 'PROFILE_ARTICLES':
        Articles.filterByAuthor(username, page).then(({ data }) => setArticles(data.articles))
        break
      case 'FAVORITE_ARTICLES':
        Articles.filterByFavorite(username, page).then(({ data }) => setArticles(data.articles))
        break
      default:
        break
    }
  }, [config, token])

  return (
    <BrowserRouter>
      <HeaderTemplate />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/form" component={FormPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/@:username" component={ProfilePage} />
        <Route path="/@:username/favorites" components={null} />
        <Route path="/article/:slug" component={ArticlePage} />
        <Route path="/editor/:slug" component={FormPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <FooterTemplate />
    </BrowserRouter>
  )
}

export default Router
