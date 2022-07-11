package com.tericcabrel.springbootcaching.controllers;

import com.tericcabrel.springbootcaching.models.Category;
import com.tericcabrel.springbootcaching.models.dtos.CreateCategoryDto;
import com.tericcabrel.springbootcaching.models.responses.CategoryListResponse;
import com.tericcabrel.springbootcaching.models.responses.CategoryResponse;
import com.tericcabrel.springbootcaching.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@Valid @RequestBody CreateCategoryDto createCategoryDto) {
        Category category = categoryService.create(createCategoryDto);

        return ResponseEntity.ok(new CategoryResponse(category));
    }

    @GetMapping
    public ResponseEntity<CategoryListResponse> getAll() {
        List<Category> categories = categoryService.findAll();

        return ResponseEntity.ok(new CategoryListResponse(categories));
    }
}
