package com.tericcabrel.springbootcaching.repositories;

import com.tericcabrel.springbootcaching.models.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    List<Product> findAllByIdGreaterThanOrderByIdDesc(long id);

    Optional<Product> findByName(String name);
}
