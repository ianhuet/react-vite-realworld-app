export interface Article {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
}

export interface ArticleQuery {
  articles: Article[],
  articlesCount: number,
}

export interface Auth {
  email: string;
  password: string;
  username: string?
}

export interface Author {
  username: string;
}

export interface Comment {
  author: Author;
  body: string;
  createdAt: Date;
  id: number
}

export interface Filter {
  author: string | null;
  favorited: string | null;
  feed: boolean;
  offset: number | null;
  tag: string | null;
}

export interface Profile {
  bio: string;
  image: string;
  username: string;
}

export interface User {
  articles: number[];
  bio: string;
  comments: [];
  email: string;
  favorites: number[]
  following: boolean;
  id: number;
  image: string;
  token: string;
  username: string;
}
