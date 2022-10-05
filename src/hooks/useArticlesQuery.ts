import { omit } from 'lodash-es'
import { useQuery } from 'react-query'
import { Filter } from '../types'

function useArticlesQuery(filters: Filter) {
  const filterFeed = filters?.feed ? '/feed' : ''
  const queryUrl = `/articles${filterFeed}`

  return useQuery([queryUrl, { limit: 10, ...omit(filters, ['feed']) }], {
    keepPreviousData: true,
    placeholderData: {
      articles: [],
      articlesCount: null,
    }
  })
}

export default useArticlesQuery
