import React, { useState } from 'react'
import { isNil } from 'lodash-es'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useArticlesQuery } from '../hooks'
import ArticlePreview from './ArticlePreview'
import { Article, ArticleQuery, Filter, types } from '../types';

type Props = {
  filters: Partial<Filter>;
};

const initialFilters: Filter = { author: null, favorited: null, feed: false, offset: null, tag: null }
const limit = 10

function ArticleList(props: Props) {
  const { filters = initialFilters } = props

  const [offset, setOffset] = useState(0)
  const { data, isFetching, isError, isSuccess } = useArticlesQuery({ ...filters, offset })

  useDeepCompareEffect(() => {
    if (!isNil(filters.offset)) {
      setOffset(filters.offset)
    }
  }, [filters])

  if (isFetching) return <p className="article-preview">Loading articles...</p>
  if (isError) return <p className="article-preview">Loading articles failed :(</p>  

  const articleQuery = types.isArticleQuery(data) && data as ArticleQuery;
  if (!articleQuery || !isSuccess) {
    return null;
  }

  if (articleQuery.articlesCount === 0) return <p className="article-preview">No articles are here... yet.</p>

  const pageCount = Math.ceil(articleQuery.articlesCount / limit)
  const pages = Array.from({ length: pageCount }, (_v, i) => i);

  return (
    <>
      {articleQuery.articles.map((article: Article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      {pageCount > 1 && (
        <nav>
          <ul className="pagination">
            {pages.map((i) => (
              <li className={offset === i ? 'page-item active' : 'page-item'} key={`page-${i}`}>
                <button type="button" className="page-link" onClick={() => setOffset(i)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}

export default ArticleList
