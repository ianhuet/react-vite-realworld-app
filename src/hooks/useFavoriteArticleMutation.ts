import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'
import axios from 'axios'
import useAuth from './useAuth'
import { Article, types } from '../types'

function useFavoriteArticleMutation(slug: string) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuth } = useAuth()
  const queryKey = `/articles/${slug}`

  return useMutation(
    ({ favorited }: { favorited: boolean }) =>
      axios[favorited ? 'delete' : 'post'](`/articles/${slug}/favorite`),
    {
      onMutate: async () => {
        const previousArticle = queryClient.getQueryData(queryKey)

        if (isAuth) {
          await queryClient.cancelQueries(queryKey)

          queryClient.setQueryData(queryKey, ({ article }: { article: Partial<Article> }) => {
            if (types.isArticle(article)) {
              const currentArticle = article 
              const count = currentArticle.favoritesCount

              return {
                article: {
                  ...currentArticle,
                  favorited: !currentArticle.favorited,
                  favoritesCount: currentArticle.favorited ? count - 1 : count + 1,
                },
              }  
            }
          })
        } else {
          navigate('/login')
        }

        return { previousArticle }
      },
      onError: (_err, _, context) => {
        if (context !== undefined) {
          queryClient.setQueryData(queryKey, context.previousArticle)
        }
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(queryKey)
      },
    }
  )
}

export default useFavoriteArticleMutation
