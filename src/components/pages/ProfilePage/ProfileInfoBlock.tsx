import React, { ReactElement, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilValueLoadable } from 'recoil'
import { Profile } from '../../../agent'
import { AuthState } from '../../../atoms'

interface ProfileParams {
  profile: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}
const ProfileInfoBlock = ({ profile }: ProfileParams): ReactElement => {
  const [isFollowing, setFollowing] = useState(false)
  const { contents: userInfo } = useRecoilValueLoadable(AuthState.user)
  const ToggleFollow = async () => {
    if (isFollowing) {
      await Profile.unfollow(profile.username)
      setFollowing(false)
    } else {
      await Profile.follow(profile.username)
      setFollowing(true)
    }
  }
  useEffect(() => {
    setFollowing(profile.following)
  }, [profile])

  return (
    <div className="profile-info">
      <NavLink to={`/@${profile.username}`}>
        <div className="img">
          <img src={profile.image} alt="" />
        </div>
      </NavLink>
      <h2 className="username">
        <NavLink to={`/@${profile.username}`}>{profile.username}</NavLink>
      </h2>
      <p className="bio">{profile.bio}</p>
      <div className="action">
        <button type="button" className="btn light" onClick={ToggleFollow}>
          {isFollowing ? `Unfollow ${profile.username}` : `Follow ${profile.username}`}
        </button>
        {profile.username === userInfo.username && (
          <NavLink to="/settings" type="button" className="btn light">
            프로필 수정
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default ProfileInfoBlock
