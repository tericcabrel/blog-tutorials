package com.tericcabrel.springbootcaching.models.dtos;

import com.tericcabrel.springbootcaching.models.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Accessors(chain = true)
public class CreateCategoryDto {
    @NotBlank(message = "This field is required")
    private String name;

    public Category toCategory() {
        Category category = new Category();

        category.setName(this.name);

        return category;
    }
}
