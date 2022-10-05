import classNames from 'classnames'
import React from 'react'
import { useFavoriteArticleMutation } from '../hooks'

type Props = {
  children: React.ReactNode;
  className: string;
  favorited: boolean;
  slug: string;
}

function FavoriteArticleButton(props: Props) {
  const { slug, favorited, children, className = '' } = props
  const { isLoading, mutate } = useFavoriteArticleMutation(slug)

  return (
    <button
      className={classNames(
        'btn btn-sm',
        {
          'btn-outline-primary': !favorited,
          'btn-primary': favorited,
        },
        className
      )}
      disabled={isLoading}
      onClick={() => mutate({ favorited })}
      type="button"
    >
      <i className="ion-heart" />
      {children}
    </button>
  )
}

export default FavoriteArticleButton
