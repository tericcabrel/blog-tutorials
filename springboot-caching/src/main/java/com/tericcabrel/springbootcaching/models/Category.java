package com.tericcabrel.springbootcaching.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@JsonIgnoreProperties(value = { "products" })
@Getter
@Setter
@ToString
@Table(name = "categories")
@Entity
public class Category {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String name;

    @CreationTimestamp
    protected Date createdAt;

    @UpdateTimestamp
    protected Date updatedAt;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference(value = "category-products")
    @ToString.Exclude
    private Set<Product> products;

    public Category() {
        products = new HashSet<>();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Category category = (Category) o;
        return id != null && Objects.equals(id, category.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
