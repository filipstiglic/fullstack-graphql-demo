import gql from "graphql-tag";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Long type */
  Long: any;
};

export type Author = {
  __typename?: "Author";
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
};

export type Book = {
  __typename?: "Book";
  author?: Maybe<Author>;
  id: Scalars["ID"];
  isbn: Scalars["String"];
  pageCount?: Maybe<Scalars["Int"]>;
  title: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addAuthor: Author;
  addBook: Book;
  deleteBook?: Maybe<Scalars["Boolean"]>;
  updateBookPageCount: Book;
};

export type MutationAddAuthorArgs = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type MutationAddBookArgs = {
  author: Scalars["ID"];
  isbn: Scalars["String"];
  pageCount?: Maybe<Scalars["Int"]>;
  title: Scalars["String"];
};

export type MutationDeleteBookArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateBookPageCountArgs = {
  id: Scalars["ID"];
  pageCount: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  authors: Array<Maybe<Author>>;
  book?: Maybe<Book>;
  books: Array<Maybe<Book>>;
  countAuthors: Scalars["Long"];
  countBooks: Scalars["Long"];
};

export type QueryBookArgs = {
  id?: Maybe<Scalars["ID"]>;
};
