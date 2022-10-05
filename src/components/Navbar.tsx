import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks'

function Navbar() {
  const { isAuth, authUser } = useAuth()

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink to="/" className={({ isActive }) => isActive ? "navbar-brand active" : "navbar-brand"} end>
          conduit
        </NavLink>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} end>
              Home
            </NavLink>
          </li>

          {isAuth && (
            <>
              <li className="nav-item">
                <NavLink to="/editor" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                  <i className="ion-compose" />
                  &nbsp;New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/settings" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/@${authUser?.username}`} className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                  <img
                    alt="avatar"
                    src="https://api.realworld.io/images/demo-avatar.png"
                    style={{ width: 24, height: 24, marginRight: 4, borderRadius: '50%' }}
                  />
                  {authUser?.username}
                </NavLink>
              </li>
            </>
          )}

          {!isAuth && (
            <>
              <li className="nav-item">
                <NavLink to="/register" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                  Sign up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                  Sign in
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
