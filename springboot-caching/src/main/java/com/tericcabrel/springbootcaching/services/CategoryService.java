package com.tericcabrel.springbootcaching.services;

import com.tericcabrel.springbootcaching.models.Category;
import com.tericcabrel.springbootcaching.models.dtos.CreateCategoryDto;
import com.tericcabrel.springbootcaching.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category create(CreateCategoryDto createCategoryDto) {
        return categoryRepository.save(createCategoryDto.toCategory());
    }

    public List<Category> findAll() {
        return categoryRepository.findAllByIdGreaterThanOrderByIdDesc(0);
    }

    public Optional<Category> findByName(String name) {
        return categoryRepository.findByName(name);
    }
}
