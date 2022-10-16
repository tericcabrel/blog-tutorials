package com.tericcabrel.taskman.requests;

import io.swagger.v3.oas.annotations.media.Schema;

public class ErrorResponse {
    @Schema(name = "message", defaultValue = "Description of the error here.")
    String message;
}
