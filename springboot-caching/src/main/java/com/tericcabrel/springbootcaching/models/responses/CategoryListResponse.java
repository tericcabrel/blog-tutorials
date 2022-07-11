package com.tericcabrel.springbootcaching.models.responses;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.tericcabrel.springbootcaching.models.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;


@Setter
@Getter
@Accessors(chain = true)
public class CategoryListResponse {
    private List<Category> data;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public CategoryListResponse(@JsonProperty("data") List<Category> data) {
        this.data = data;
    }
}
