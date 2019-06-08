package com.aliter.graphql.service;

import com.aliter.graphql.db.entity.Author;
import com.aliter.graphql.db.repository.AuthorRepository;
import com.aliter.graphql.exception.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorService {

   @Autowired
   AuthorRepository authorRepository;

   @Transactional(readOnly = true)
   public Author findById(long id){
       return authorRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Author with given ID could not be found!",id));
   }

   @Transactional(readOnly = true)
   public List<Author> findAll(){
       return authorRepository.findAll();
   }

   @Transactional(readOnly = true)
   public long countAll(){
       return authorRepository.count();
   }

   @Transactional
   public Author add(String firstName, String lastName){
       return authorRepository.save(Author.builder().firstName(firstName).lastName(lastName).build());
   }


}
