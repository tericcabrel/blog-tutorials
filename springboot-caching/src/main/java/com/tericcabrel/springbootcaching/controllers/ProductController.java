package com.tericcabrel.springbootcaching.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tericcabrel.springbootcaching.models.CacheData;
import com.tericcabrel.springbootcaching.models.Product;
import com.tericcabrel.springbootcaching.models.dtos.CreateProductDto;
import com.tericcabrel.springbootcaching.models.dtos.SearchProductDto;
import com.tericcabrel.springbootcaching.models.responses.ProductListResponse;
import com.tericcabrel.springbootcaching.models.responses.ProductResponse;
import com.tericcabrel.springbootcaching.repositories.CacheDataRepository;
import com.tericcabrel.springbootcaching.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    private final CacheDataRepository cacheDataRepository;

    private final ObjectMapper objectMapper;

    public ProductController(ProductService productService, CacheDataRepository cacheDataRepository) {
        this.productService = productService;
        this.cacheDataRepository = cacheDataRepository;
        this.objectMapper = new ObjectMapper();
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody CreateProductDto createProductDto) {
        Product product = productService.create(createProductDto);

        return ResponseEntity.ok(new ProductResponse(product));
    }

    @GetMapping
    public ResponseEntity<ProductListResponse> getAll() throws InterruptedException, JsonProcessingException {
        Optional<CacheData> optionalCacheData = cacheDataRepository.findById("allProducts");

        // Cache hit
        if (optionalCacheData.isPresent()) {
            String productAsString = optionalCacheData.get().getValue();

            TypeReference<List<Product>> mapType = new TypeReference<List<Product>>() {};
            List<Product> productList = objectMapper.readValue(productAsString, mapType);

            return ResponseEntity.ok(new ProductListResponse(productList));
        }

        // Cache miss
        List<Product> productList = productService.findAll();
        String productsAsJsonString = objectMapper.writeValueAsString(productList);
        CacheData cacheData = new CacheData("allProducts", productsAsJsonString);

        cacheDataRepository.save(cacheData);

        return ResponseEntity.ok(new ProductListResponse(productList));
    }

    @GetMapping("/search")
    public ResponseEntity<ProductListResponse> search(@Valid SearchProductDto searchProductDto) throws InterruptedException, JsonProcessingException {
        String cacheKey = searchProductDto.buildCacheKey("searchProducts");

        Optional<CacheData> optionalCacheData = cacheDataRepository.findById(cacheKey);

        // Cache hit
        if (optionalCacheData.isPresent()) {
            String productAsString = optionalCacheData.get().getValue();

            TypeReference<List<Product>> mapType = new TypeReference<List<Product>>() {};
            List<Product> productList = objectMapper.readValue(productAsString, mapType);

            return ResponseEntity.ok(new ProductListResponse(productList));
        }

        List<Product> productList = productService.search(searchProductDto);

        String productsAsJsonString = objectMapper.writeValueAsString(productList);
        CacheData cacheData = new CacheData(cacheKey, productsAsJsonString);

        cacheDataRepository.save(cacheData);

        cacheDataRepository.deleteById("allProducts");

        return ResponseEntity.ok(new ProductListResponse(productList));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@PathVariable long id, @Valid @RequestBody float price) {
        Optional<Product> optionalProduct = productService.findById(id);

        if (optionalProduct.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Product productToUpdate = optionalProduct.get();
        productToUpdate.setPrice(price);

        Product productUpdated = productService.update(productToUpdate);

        // Invalidate the cache
        String productCategory = productUpdated.getCategory().getName();

        List<String> cacheKeys = cacheDataRepository.findByIdContainingIgnoreCase(productCategory)
                .stream()
                .map((CacheData::getKey))
                .toList();

        cacheDataRepository.deleteAllById(cacheKeys);

        return ResponseEntity.ok(new ProductResponse(productUpdated));
    }
}
