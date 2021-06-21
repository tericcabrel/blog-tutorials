package com.tericcabrel.hotel.services.interfaces;

import com.tericcabrel.hotel.models.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
  User create(User user);

  List<User> findAll();

  Optional<User> findById(int id);
}
