import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ArticleList, FollowProfileButton } from '../components'
import { useAuth, useProfileQuery } from '../hooks'
import { Profile as ProfileType } from '../types'

function Profile() {
  const { data } = useProfileQuery()
  const { authUser } = useAuth()
  const [filters, setFilters] = useState({ author: '', favorited: '' })

  const { bio, image, username } = data?.profile as ProfileType 
  const canUpdateProfile = authUser?.username === username

  const setAuthorFilter = useCallback(() => {
    setFilters({ author: username, favorited: '' })
  }, [username])

  useEffect(() => {
    setAuthorFilter()
  }, [username, setAuthorFilter])

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img alt="avatar" src={image} className="user-img" />
              <h4>{username}</h4>
              <p>{bio}</p>

              {canUpdateProfile ? (
                <Link className="btn btn-sm btn-outline-secondary action-btn" to="/settings">
                  <i className="ion-gear-a" /> Edit Profile Settings
                </Link>
              ) : (
                <FollowProfileButton />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    onClick={setAuthorFilter}
                    type="button"
                    className={classNames('nav-link', {
                      active: filters?.author,
                    })}
                  >
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => setFilters({ author: '', favorited: username })}
                    type="button"
                    className={classNames('nav-link', {
                      active: filters?.favorited,
                    })}
                  >
                    Favorited Articles
                  </button>
                </li>
              </ul>
            </div>
            <ArticleList filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
