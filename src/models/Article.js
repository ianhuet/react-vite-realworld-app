import Author from './Author'

class Article {
  constructor({
    author = new Author(),
    body = '',
    createdAt = '',
    description = '',
    favorited = false,
    favoritesCount = 0,
    slug = '',
    tagList = [],
    title = '',
    updatedAt = '',
  }) {
    this.author = new Author(author)
    this.body = body
    this.createdAt = new Date(createdAt).toDateString()
    this.description = description
    this.favorited = favorited
    this.favoritesCount = favoritesCount
    this.slug = slug
    this.tagList = tagList
    this.title = title
    this.updatedAt = new Date(updatedAt).toDateString()
  }
}

export default Article
