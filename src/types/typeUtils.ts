import { Article, ArticleQuery, Comment, Profile } from './types.d'

const isArticle = (article: Partial<Article> | null | undefined): article is Article => {
  const hasArticleBody = (result: Partial<Article>): boolean =>
    'body' in result && typeof result.body === 'string'
  const hasArticleSlug = (result: Partial<Article>): boolean =>
    'slug' in result && typeof result.slug === 'string'

  if (article === null || article === undefined) {
    return false;
  }

  if (hasArticleBody(article) && hasArticleSlug(article)) {
    return true;
  }

  return false;
};

const isArticleQuery = (articleQuery: unknown): articleQuery is ArticleQuery => {
  const hasArticlesArray = (result: Partial<ArticleQuery>): boolean =>
    'articles' in result && result.articles instanceof Array
  const hasArticlesCount = (result: Partial<ArticleQuery>): boolean =>
    'articlesCount' in result && typeof result.articlesCount === 'number'

  if (articleQuery === null || articleQuery === undefined) {
    return false;
  }

  if (hasArticlesArray(articleQuery) && hasArticlesCount(articleQuery)) {
    return true;
  }

  return false;
};

const isComment = (comment: unknown): comment is Comment => {
  const hasId = (result: Partial<Comment>): boolean =>
    'id' in result && typeof result.id === 'number'
  const hasBody = (result: Partial<Comment>): boolean =>
    'body' in result && typeof result.body === 'string'

  if (comment === null || comment === undefined) {
    return false;
  }

  if (hasId(comment) && hasBody(comment)) {
    return true;
  }

  return false;
};

const isProfile = (profile: unknown): profile is Profile => {
  const hasUsername = (result: Partial<Profile>): boolean =>
    'username' in result && typeof result.username === 'string'

  if (profile === null || profile === undefined) {
    return false;
  }

  if (hasUsername(profile)) {
    return true;
  }

  return false;
};

const typeUtils = {
  isArticle,
  isArticleQuery,
  isComment,
  isProfile,
};
export default typeUtils;
