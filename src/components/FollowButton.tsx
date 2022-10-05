import React from 'react'
import classNames from 'classnames'

type Props = {
  disabled: boolean;
  following: boolean;
  onClick: () => void;
  username: string;
}

function FollowButton(props: Props) {
  const { disabled, onClick, following, username } = props

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={classNames('btn btn-sm action-btn', {
        'btn-outline-secondary': !following,
        'btn-secondary': following,
      })}
    >
      <i className="ion-plus-round" />
      &nbsp; {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  )
}

export default FollowButton
