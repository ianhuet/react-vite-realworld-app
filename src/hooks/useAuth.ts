import axios from 'axios'
import { isNull } from 'lodash-es'
import { useSnapshot } from 'valtio'
import { proxyWithComputed } from 'valtio/utils'
import { User } from '../types'

function getAuthUser(): User | null {
  const jwt = window.localStorage.getItem('jwtToken')

  if (!jwt) return null

  const decodedJwt = atob(jwt).toString()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(decodedJwt.toString())
}

const state = proxyWithComputed(
  {
    authUser: getAuthUser(),
  },
  {
    isAuth: (snap) => !isNull(snap.authUser),
  }
)

const actions = {
  login: (user: User | null) => {
    state.authUser = user

    if (state.authUser) {
      window.localStorage.setItem('jwtToken', btoa(JSON.stringify(state.authUser)))

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      axios.defaults.headers.Authorization = `Token ${state.authUser.token}`
    }
  },
  logout: () => {
    state.authUser = null
    window.localStorage.removeItem('jwtToken')
  },
  checkAuth: () => {
    const authUser = getAuthUser()

    if (!authUser || isNull(authUser)) {
      actions.logout()
    }
  },
}

function useAuth() {
  const snap = useSnapshot(state)

  return {
    ...snap,
    ...actions,
  }
}

export default useAuth
