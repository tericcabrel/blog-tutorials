package com.tericcabrel.springbootcaching.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Accessors(chain = true)
@Table(name = "products")
@Entity
public class Product {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false, length = 200, unique = true)
    private String name;

    @Lob
    private String description;

    @Column(nullable = false)
    private float price;

    @Column
    private boolean isAvailable;

    @CreationTimestamp
    protected Date createdAt;

    @UpdateTimestamp
    protected Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference(value = "category-products")
    private Category category;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Product product = (Product) o;
        return id != null && Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
