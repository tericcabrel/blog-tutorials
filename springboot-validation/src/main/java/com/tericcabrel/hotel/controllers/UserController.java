package com.tericcabrel.hotel.controllers;

import com.tericcabrel.hotel.models.User;
import com.tericcabrel.hotel.models.dtos.RegisterUserDto;
import com.tericcabrel.hotel.services.interfaces.UserService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/user")
@RestController
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<User> registerUser(@Valid @RequestBody RegisterUserDto registerUserDto) {
    User createdUser = userService.create(registerUserDto.toUser());

    return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
  }

  @GetMapping("/all")
  public ResponseEntity<List<User>> allUsers() {
    return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
  }
}
