package com.aliter.graphql.db.entity;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @NotEmpty
    @Column(nullable = false, length = 100)
    @Length(max = 100)
    private String title;

    @NotEmpty
    @Column(nullable = false, length = 10)
    @Length(max = 10)
    private String isbn;

    @NotNull
    @Column(nullable = false)
    private Integer pageCount;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "author_id", nullable = false)
    private Author author;


}
