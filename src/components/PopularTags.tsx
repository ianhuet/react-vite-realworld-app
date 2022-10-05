import React from 'react'
import { useQuery } from 'react-query'

type Props = {
  onTagClick: (tag: string) => void,
}

function PopularTags(props: Props) {
  const { onTagClick } = props
  const { data, isError, isFetching, isSuccess } = useQuery('/tags', { placeholderData: { tags: [] } })

  function renderTags(tags: string[]) {
    return tags.map((tag) => (
      <li key={tag}>
        <a
          href="#"
          className="tag-pill tag-default"
          onClick={(e) => {
            e.preventDefault()

            onTagClick(tag)
          }}
        >
          {tag}
        </a>
      </li>
    ))
  }

  if (isFetching) return <p>Loading tags...</p>
  if (isError) return <p>Loading tags failed :(</p>
  if (isSuccess) {
    const tagSet = Array.from<string>(new Set(data.tags)).sort()

    return (
      <div className="sidebar">
        <p>Popular Tags</p>
  
        <ul className="tag-list">
          {renderTags(tagSet)}
        </ul>
      </div>
    )
  }

  return null;
}

export default PopularTags
