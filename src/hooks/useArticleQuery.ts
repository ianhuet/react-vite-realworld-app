import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Article } from '../types'

function useArticleQuery(article: Article | undefined = undefined) {
  const { slug } = useParams()

  const queryParam = article?.slug || slug || '';
  const queryUrl = `/articles/${queryParam}`

  return useQuery(queryUrl, {
    enabled: !!slug || !!article?.slug,
    initialData: article ? { article } : undefined,
    placeholderData: { article: {} },
  })
}

export default useArticleQuery
