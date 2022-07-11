package com.tericcabrel.springbootcaching.models.responses;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
public class GenericResponse {
    private Map<String, Object> data;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public GenericResponse(@JsonProperty("data") Map<String, Object> data) {
        this.data = data;
    }
}
