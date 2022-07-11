package com.tericcabrel.springbootcaching.models.responses;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tericcabrel.springbootcaching.models.Product;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ProductResponse {
    private Product data;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public ProductResponse(@JsonProperty("data") Product data) {
        this.data = data;
    }
}
