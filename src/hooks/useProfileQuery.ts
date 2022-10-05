import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

function useProfileQuery() {
  const { username } = useParams()

  const usernameQuery = username || ''
  const queryUrl = `/profiles/${usernameQuery}`

  return useQuery(queryUrl, { placeholderData: { profile: {} } })
}

export default useProfileQuery
