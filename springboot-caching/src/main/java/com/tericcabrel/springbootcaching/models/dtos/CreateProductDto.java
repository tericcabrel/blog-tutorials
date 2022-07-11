package com.tericcabrel.springbootcaching.models.dtos;

import com.tericcabrel.springbootcaching.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Accessors(chain = true)
public class CreateProductDto {
    @Positive(message = "This field is required")
    private long categoryId;

    @NotBlank(message = "This field is required")
    private String name;

    private String description;

    @Positive(message = "Must be greater than 0")
    private float price;

    private int isAvailable;

    private String categoryName;

    public Product toProduct() {
        Product product = new Product();

        product.setName(this.name)
                .setDescription(description)
                .setPrice(price)
                .setAvailable(isAvailable == 1);

        return product;
    }
}
