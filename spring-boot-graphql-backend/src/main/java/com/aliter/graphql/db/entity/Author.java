package com.aliter.graphql.db.entity;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Author {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @NotEmpty
    @Column(nullable = false, length = 50)
    @Length(max = 50)
    private String firstName;

    @NotEmpty
    @Column(nullable = false, length = 50)
    @Length(max = 50)
    private String lastName;


}
