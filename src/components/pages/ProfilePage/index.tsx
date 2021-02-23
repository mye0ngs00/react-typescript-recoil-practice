import React, { ReactElement, useEffect, useState } from 'react'
import ProfileInfoBlock from './ProfileInfoBlock'
import { Profile } from '../../../agent'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ArticlesState, MOVE_TO_PAGE_CONFIG } from '../../../atoms'
import ArticleList from '../../blocks/ArticleList'
import Navigator from '../../blocks/Navigator'
import Parginator from '../../blocks/Parginator'

interface RouteParams {
  match: {
    params: {
      username: string
    }
  }
}
const ProfilePage = ({
  match: {
    params: { username },
  },
}: RouteParams): ReactElement => {
  const setConfig = useSetRecoilState(ArticlesState.config)
  const category = useRecoilValue(ArticlesState.filteredConfig('category'))
  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    image: '',
    following: false,
  })
  useEffect(() => {
    Profile.get(username).then(({ data }) => setProfile(data.profile))
    setConfig({
      ...MOVE_TO_PAGE_CONFIG,
      category: 'PROFILE_ARTICLES',
      username,
    })
  }, [])

  return (
    <div className="page-profile">
      <ProfileInfoBlock profile={profile} />
      <div className="container">
        <Navigator />
        <ArticleList />
        <Parginator />
      </div>
    </div>
  )
}

export default ProfilePage
