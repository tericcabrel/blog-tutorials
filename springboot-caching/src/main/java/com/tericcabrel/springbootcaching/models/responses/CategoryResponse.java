package com.tericcabrel.springbootcaching.models.responses;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tericcabrel.springbootcaching.models.Category;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CategoryResponse {
    private Category data;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public CategoryResponse(@JsonProperty("data") Category data) {
        this.data = data;
    }
}
