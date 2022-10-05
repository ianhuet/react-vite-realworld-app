import React from 'react'
import { Link } from 'react-router-dom'
import { useArticleQuery } from '../hooks'
import FavoriteArticleButton from './FavoriteArticleButton'
import { Article, types } from '../types'

interface Props {
  article: Article;
}

function ArticlePreview(props: Props) {
  const { article = {} as Article } = props

  const { data } = useArticleQuery(article)
  const articleData = data?.article ? data.article : null;

  if (!types.isArticle(articleData)) {
    return null;
  }

  const { author, body, createdAt, favorited, favoritesCount, slug, tagList, title } = articleData
  const tagSet = Array.from(new Set(tagList)).sort()

  return (
    <div className="article-preview" key={slug}>
      <div className="article-meta">
        <Link to={`/profile/${author?.username}`}>
          <img alt="avatar" src="https://api.realworld.io/images/demo-avatar.png" />
        </Link>
        <div className="info">
          <Link to={`/profile/${author?.username}`} className="author">
            {author?.username}
          </Link>
          <span className="date">{new Date(createdAt).toDateString()}</span>
        </div>
        <FavoriteArticleButton className="pull-xs-right" favorited={favorited} slug={slug}>
          &nbsp;{favoritesCount}
        </FavoriteArticleButton>
      </div>

      <Link to={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{body}</p>
        <span>Read more...</span>

        <ul className="tag-list">
          {tagSet.map((tag) => (
            <li key={`preview-${slug}-${tag}`} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  )
}

export default ArticlePreview
