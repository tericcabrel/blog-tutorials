package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

  @GetMapping(path = "/")
  public ResponseEntity<Map<String, String>> hello() {
    Map<String, String> response = new HashMap<>();

    response.put("message", "Hello from API!");

    return ResponseEntity.ok(response);
  }
}
