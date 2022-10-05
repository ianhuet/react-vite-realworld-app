import axios from 'axios'
import { useMutation } from 'react-query'

type Config = {
  following: boolean,
  username: string
}

function useFollowAuthorMutation(config: Config) {
  return useMutation(
    ({ following, username }: { following: boolean, username: string }) =>
      axios[following ? 'delete' : 'post'](`/profiles/${username}/follow`),
    config
  )
}

export default useFollowAuthorMutation
