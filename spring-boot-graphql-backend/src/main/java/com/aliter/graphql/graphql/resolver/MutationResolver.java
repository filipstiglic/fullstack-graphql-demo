package com.aliter.graphql.graphql.resolver;

import com.aliter.graphql.db.entity.Author;
import com.aliter.graphql.db.entity.Book;
import com.aliter.graphql.service.AuthorService;
import com.aliter.graphql.service.BookService;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MutationResolver implements GraphQLMutationResolver {

    @Autowired
    private BookService bookService;

    @Autowired
    private AuthorService authorService;


    public Author addAuthor(String firstName, String lastName) {
        return authorService.add(firstName, lastName);
    }

    public Book addBook(String title, String isbn, Integer pageCount, Long authorId) {
        return bookService.add(title, isbn, pageCount, authorId);
    }

    public boolean deleteBook(long id) {
        return bookService.deleteById(id);
    }

    public Book updateBookPageCount(long id, int pageCount) {
        return bookService.updatePageCount(id, pageCount);
    }
}
