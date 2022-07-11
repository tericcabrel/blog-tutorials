package com.tericcabrel.springbootcaching.repositories;

import com.tericcabrel.springbootcaching.models.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    List<Category> findAllByIdGreaterThanOrderByIdDesc(long id);

    Optional<Category> findById(long id);

    Optional<Category> findByName(String name);
}
