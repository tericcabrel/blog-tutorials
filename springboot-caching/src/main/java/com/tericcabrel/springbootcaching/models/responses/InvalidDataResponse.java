package com.tericcabrel.springbootcaching.models.responses;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

@Getter
@Accessors(chain = true)
public class InvalidDataResponse {
    private Map<String, Map<String, List<String>>> data;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public InvalidDataResponse(@JsonProperty("data") Map<String, Map<String, List<String>>> data) {
        this.data = data;
    }
}
