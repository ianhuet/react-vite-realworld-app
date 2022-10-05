import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Comment } from '../types'

function useArticleCommentQuery(comment: Comment | null = null) {
  const { slug } = useParams()

  const slugQuery: string = slug || ''
  const commentId: number | string = comment?.id ? comment.id : ''
  const queryUrl = `articles/${slugQuery}/comments/${commentId}`

  return useQuery(queryUrl, { initialData: { comment }, placeholderData: {} })
}

export default useArticleCommentQuery
