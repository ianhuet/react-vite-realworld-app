import React from 'react'
import { Link } from 'react-router-dom'
import { useArticleCommentsQuery, useAuth } from '../hooks'
import ArticleComment from './ArticleComment'
import ArticleCommentForm from './ArticleCommentForm'
import { Comment, types } from '../types'

function ArticleComments() {
  const { isAuth } = useAuth()
  const { data } = useArticleCommentsQuery()

  if (!isAuth) {
    return (
      <p>
        <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link> to add comments on this article.
      </p>
    )
  }

  let comments = types.isComment(data) && data.comments as Comment[];
  if (!comments) {
    comments = [];
  }

  return (
    <>
      <ArticleCommentForm />

      {comments.map((comment) => (
        <ArticleComment key={comment.id} comment={comment} />
      ))}
    </>
  )
}

export default ArticleComments
