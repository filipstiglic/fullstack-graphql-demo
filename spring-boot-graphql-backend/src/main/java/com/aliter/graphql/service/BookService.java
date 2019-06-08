package com.aliter.graphql.service;

import com.aliter.graphql.db.entity.Book;
import com.aliter.graphql.db.repository.BookRepository;
import com.aliter.graphql.exception.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
public class BookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    AuthorService authorService;


    @Transactional(readOnly = true)
    public Book findById(long id){
        return bookRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Book with given ID could not be found!",id));

    }

    @Transactional(readOnly = true)
    public List<Book> findAll(){
        return bookRepository.findAll();
    }

    @Transactional(readOnly = true)
    public long countAll(){
        return bookRepository.count();
    }

    @Transactional
    public Book add(String title, String isbn, int pageCount, Long authorId){

        return bookRepository.save(Book.builder()
                .author(authorService.findById(authorId))
                .title(title)
                .isbn(isbn)
                .pageCount(pageCount).build());
    }

    @Transactional
    public Book updatePageCount(long id, int pageCount){
        Book book = findById(id);
        book.setPageCount(pageCount);
        return bookRepository.save(book);
    }

    @Transactional
    public boolean deleteById(long id){
        bookRepository.deleteById(id);
        return true;
    }



}
