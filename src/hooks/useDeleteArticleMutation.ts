import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

function useDeleteArticleMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { slug } = useParams()
  const queryParam = slug || '';

  return useMutation(() => axios.delete(`/articles/${queryParam}`), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('/articles')

      navigate('/')
    },
  })
}

export default useDeleteArticleMutation
