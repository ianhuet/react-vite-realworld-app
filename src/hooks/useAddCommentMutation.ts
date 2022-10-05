import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

function useAddCommentMutation() {
  const { slug } = useParams()
  const queryClient = useQueryClient()

  const queryParam = slug || '';
  const queryKey = `/articles/${queryParam}/comments`

  return useMutation(
    (payload) => axios.post(`/articles/${queryParam}/comments`, payload),
    {
      onMutate: async ({ comment }: { comment: string }) => {
        const previousComments = queryClient.getQueryData(queryKey)
        await queryClient.cancelQueries(queryKey)

        queryClient.setQueryData(queryKey, ({ comments }) => ({
          comments: [...comments, comment],
        }))

        return { previousComments }
      },
      onError: (_err, _, context) => {
        if (context !== undefined) {
          queryClient.setQueryData(queryKey, context.previousComments)
        }
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(queryKey)
      },
    }
  )
}

export default useAddCommentMutation
