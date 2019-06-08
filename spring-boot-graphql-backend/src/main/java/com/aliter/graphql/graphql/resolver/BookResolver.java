package com.aliter.graphql.graphql.resolver;

import com.aliter.graphql.db.entity.Author;
import com.aliter.graphql.db.entity.Book;
import com.aliter.graphql.service.AuthorService;
import com.coxautodev.graphql.tools.GraphQLResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookResolver implements GraphQLResolver<Book> {

    @Autowired
    private AuthorService authorService;

    public Author getAuthor(Book book) {
        return authorService.findById(book.getAuthor().getId());
    }
}
