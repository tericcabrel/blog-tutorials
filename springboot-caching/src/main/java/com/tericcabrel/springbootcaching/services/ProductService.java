package com.tericcabrel.springbootcaching.services;

import com.tericcabrel.springbootcaching.models.Category;
import com.tericcabrel.springbootcaching.models.Product;
import com.tericcabrel.springbootcaching.models.dtos.CreateProductDto;
import com.tericcabrel.springbootcaching.models.dtos.SearchProductDto;
import com.tericcabrel.springbootcaching.repositories.CategoryRepository;
import com.tericcabrel.springbootcaching.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProductService {
    @PersistenceContext
    private EntityManager entityManager;

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public Product create(CreateProductDto createProductDto) {
        Optional<Category> optionalCategory = categoryRepository.findById(createProductDto.getCategoryId());

        if (optionalCategory.isEmpty()) {
            throw new RuntimeException("The category not found");
        }

        Product product = createProductDto.toProduct();
        product.setCategory(optionalCategory.get());

        return productRepository.save(product);
    }

    public List<Product> findAll() throws InterruptedException {
        // Simulate server pressure and high computation
        Thread.sleep(3000);

        return productRepository.findAllByIdGreaterThanOrderByIdDesc(0);
    }

    public Optional<Product> findByName(String name) {
        return productRepository.findByName(name);
    }

    public List<Product> search(SearchProductDto searchProductDto) throws InterruptedException {
        // Simulate server pressure and high computation
        Thread.sleep(3000);

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        CriteriaQuery<Product> criteriaQuery = criteriaBuilder.createQuery(Product.class);
        Root<Product> product = criteriaQuery.from(Product.class);

        Metamodel metamodel = entityManager.getMetamodel();
        EntityType<Product> productMetaModel = metamodel.entity(Product.class);

        Join<Product, Category> joinCategory = product.join(productMetaModel.getSingularAttribute("category", Category.class));

        List<Predicate> predicateList = new ArrayList<>();

        if (searchProductDto.getName() != null) {
            predicateList.add(
                criteriaBuilder.like(product.get("name"), "%"+searchProductDto.getName().trim()+"%")
            );
        }

        if (searchProductDto.getCategory() != null) {
            predicateList.add(
                criteriaBuilder.equal(joinCategory.get("name"), searchProductDto.getCategory())
            );
        }

        if (searchProductDto.getMinPrice() > 0 && searchProductDto.getMaxPrice() > 0) {
            predicateList.add(
                criteriaBuilder.between(product.get("price"), searchProductDto.getMinPrice(), searchProductDto.getMaxPrice())
            );
        } else {
            if (searchProductDto.getMinPrice() > 0) {
                predicateList.add(
                    criteriaBuilder.gt(product.get("price"), searchProductDto.getMinPrice())
                );
            }

            if (searchProductDto.getMaxPrice() > 0) {
                predicateList.add(
                    criteriaBuilder.lt(product.get("price"), searchProductDto.getMaxPrice())
                );
            }
        }

        if (searchProductDto.getAvailable() != null) {
            predicateList.add(criteriaBuilder.equal(product.get("isAvailable"), Objects.equals(searchProductDto.getAvailable(), "yes") ? 1 : 0));
        }

        Predicate[] predicates = new Predicate[predicateList.size()];

        predicateList.toArray(predicates);

        if (!predicateList.isEmpty()) {
            criteriaQuery.where(predicates);
        }

        criteriaQuery.select(product).orderBy(criteriaBuilder.desc(product.get("createdAt")));
        // criteriaQuery.orderBy(criteriaBuilder.desc(product.get("createdAt")), criteriaBuilder.asc(product.get("price")));

        TypedQuery<Product> query = entityManager.createQuery(criteriaQuery);

        return query.getResultList();
    }

    public Optional<Product> findById(long id) {
        return productRepository.findById(id);
    }

    public Product update(Product product) {
        return productRepository.save(product);
    }
}
