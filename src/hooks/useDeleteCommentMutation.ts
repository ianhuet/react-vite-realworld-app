import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

function useDeleteCommentMutation() {
  const queryClient = useQueryClient()

  const { slug } = useParams()
  const queryParam = slug || '';
  const queryKey = `/articles/${queryParam}/comments`

  return useMutation(
    ({ commentId }: { commentId: number }) => axios.delete(`/articles/${queryParam}/comments/${commentId}`),
    {
      onMutate: async ({ commentId }) => {
        const previousComments = queryClient.getQueryData(queryKey)

        await queryClient.cancelQueries(queryKey)

        queryClient.setQueryData(queryKey, ({ comments }) => ({
          comments: comments.filter((comment) => comment.id !== commentId),
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

export default useDeleteCommentMutation
