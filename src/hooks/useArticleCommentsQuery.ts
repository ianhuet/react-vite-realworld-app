import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

function useArticleCommentsQuery() {
  const { slug } = useParams()

  const articleSlug = slug || ''
  const querylUrl = `/articles/${articleSlug}/comments`

  return useQuery(querylUrl, {
    placeholderData: {
      comments: [],
    },
  })
}

export default useArticleCommentsQuery
