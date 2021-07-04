package com.tericcabrel.hotel.repositories;

import com.tericcabrel.hotel.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

}
