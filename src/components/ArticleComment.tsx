import React from 'react'
import { Link } from 'react-router-dom'
import { useArticleCommentQuery, useAuth, useDeleteCommentMutation } from '../hooks'
import { Comment, types } from '../types'

type Props = {
  comment: Comment;
};

function ArticleComment(props: Props) {
  const { comment } = props;

  const { authUser } = useAuth()
  const { mutate } = useDeleteCommentMutation()

  const { data } = useArticleCommentQuery(comment)

  const commentQuery = types.isComment(data) && data.comment as Comment;
  if (!commentQuery) {
    return null;
  }

  const { author, body, createdAt, id } = commentQuery
  const canDelete = author?.username === authUser?.username

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>

      {id && (
        <div className="card-footer">
          <Link to={`/profile/${author?.username}`} className="comment-author">
            <img alt="avatar" src="https://api.realworld.io/images/demo-avatar.png" className="comment-author-img" />
          </Link>
          &nbsp;
          <Link to={`/profile/${author?.username}`} className="comment-author">
            {author?.username}
          </Link>
          <span className="date-posted">{new Date(createdAt).toDateString()}</span>

          {canDelete && (
            <span className="mod-options">
              <i className="ion-trash-a" onClick={() => mutate({ commentId: id })} />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default ArticleComment
