package com.aliter.graphql.graphql.resolver;

import com.aliter.graphql.db.entity.Author;
import com.aliter.graphql.db.entity.Book;
import com.aliter.graphql.db.repository.AuthorRepository;
import com.aliter.graphql.db.repository.BookRepository;
import com.aliter.graphql.service.AuthorService;
import com.aliter.graphql.service.BookService;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QueryResolver implements GraphQLQueryResolver {

    @Autowired
    private BookService bookService;

    @Autowired
    private AuthorService authorService;

    public Iterable<Book> books() {
        return bookService.findAll();
    }

    public Iterable<Author> authors() {
        return authorService.findAll();
    }

    public Book book(long id) {return bookService.findById(id);}
    public long countBooks() {
        return bookService.countAll();
    }
    public long countAuthors() {
        return authorService.countAll();
    }
}